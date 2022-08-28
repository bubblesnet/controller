#!/bin/bash

#
# Copyright (c) John Rodley 2022.
# SPDX-FileCopyrightText:  John Rodley 2022.
# SPDX-License-Identifier: MIT
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this
# software and associated documentation files (the "Software"), to deal in the
# Software without restriction, including without limitation the rights to use, copy,
# modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
# and to permit persons to whom the Software is furnished to do so, subject to the
# following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
# INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
# PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
# HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
# CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
# OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
#

DB_INITIALIZED="NO"

if [ -f "/$POSTGRESQL_SHARED_DIRECTORY/initialized" ]
then
  echo "/$POSTGRESQL_SHARED_DIRECTORY/initialized already exists"
  DB_INITIALIZED="YES"
else
  echo "/$POSTGRESQL_SHARED_DIRECTORY/initialized doesn't exist - database will be dropped/rebuilt"
fi

if [ ! -d "/$POSTGRESQL_SHARED_DIRECTORY/migrations" ]
then
  mkdir -p "/$POSTGRESQL_SHARED_DIRECTORY/migrations"
  cp /go/migrations/* "/$POSTGRESQL_SHARED_DIRECTORY/migrations"
  echo "migrations directory didn't already exist, filled from container"
else
  echo "migrations directory already exists"
fi

if [ ! -d "/$POSTGRESQL_SHARED_DIRECTORY/conf" ]
then
  mkdir -p "/$POSTGRESQL_SHARED_DIRECTORY/conf"
  cp /go/conf/* "/$POSTGRESQL_SHARED_DIRECTORY/conf"
else
  echo "conf directory already exists"
fi

if [ ! -d "/$POSTGRESQL_SHARED_DIRECTORY/var/lib/postgresql/11/main" ]
then
  echo "making shared directory"
  # if the data directory doesn't exist, make it
  mkdir -p "/$POSTGRESQL_SHARED_DIRECTORY/var/lib/postgresql/11/main"
  # cp -r /var/lib/postgresql/11/main/* /data/var/lib/postgresql/11/main

  chmod 700 "/$POSTGRESQL_SHARED_DIRECTORY/var/lib/postgresql/11/main"
  chown -R "$POSTGRESQL_UNIX_USER" "/$POSTGRESQL_SHARED_DIRECTORY/var/lib/postgresql/*"
  chgrp -R "$POSTGRESQL_UNIX_USER" "/$POSTGRESQL_SHARED_DIRECTORY/var/lib/postgresql/*"
else
  echo "not making shared directory"
fi

if [ ! -d "/$POSTGRESQL_SHARED_DIRECTORY/var/lib/postgresql/11/main" ]
then
  echo config.json exists, not copying new one over to data
else
  echo Copying config.json over to data
  cp /go/config.json "/$POSTGRESQL_SHARED_DIRECTORY/config.json"
fi

export PGPASSWORD=$POSTGRESQL_POSTGRES_PASSWORD

# terminate all connections
if [ "$DB_INITIALIZED" = "YES" ]
then
  echo "Database already exists, don't drop/recreate"
else
  echo "Database doesn't already exist, drop/recreate"
  echo "terminate all connections doesn't work yet - skipping"
  sudo PGPASSWORD="$POSTGRESQL_POSTGRES_PASSWORD" psql -h "$POSTGRESQL_HOST" -p 5432 -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$POSTGRESQL_APPLICATION_DBNAME' AND pid <> pg_backend_pid();" "user='$POSTGRESQL_POSTGRES_USER' dbname=$POSTGRESQL_SYSTEM_DBNAME password='$POSTGRESQL_POSTGRES_PASSWORD'"
#  create database
  echo Drop database
  sudo psql -h "$POSTGRESQL_HOST" -p 5432 -c "DROP DATABASE IF EXISTS $ICEBREAKER_DB_NAME" "user=$POSTGRESQL_POSTGRES_USER dbname=$POSTGRESQL_SYSTEM_DBNAME password='$POSTGRESQL_POSTGRES_PASSWORD'"
  echo Create database
  sudo PGPASSWORD="$ICEBREAKER_POSTGRES_PASSWORD" psql -h "$POSTGRESQL_HOST" -p 5432 -c "CREATE DATABASE $POSTGRESQL_APPLICATION_DBNAME" "user=$POSTGRESQL_POSTGRES_USER dbname=$POSTGRESQL_SYSTEM_DBNAME password='$POSTGRESQL_POSTGRES_PASSWORD'"
fi

echo "Always run migrations from /$POSTGRESQL_SHARED_DIRECTORY/migrations"
ls -l "/$POSTGRESQL_SHARED_DIRECTORY/migrations/*_bu.up.sql"
/go/migrate -verbose -source "file:///$POSTGRESQL_SHARED_DIRECTORY/migrations -database postgres://$POSTGRESQL_POSTGRES_USER:$POSTGRESQL_POSTGRES_PASSWORD@$POSTGRESQL_HOST:5432/$POSTGRESQL_DBNAME?sslmode=disable" up

# echo "Update ClamAV database"
# sudo freshclam

if [ "$DB_INITIALIZED" = "YES" ]
then
  echo "Database already exists, don't import known projects"
else
  echo "Database doesn't already exist, importing known projects"
  cd /go/bin || exit
  echo Marking database as initialized
  date > "/$POSTGRESQL_SHARED_DIRECTORY/initialized"
fi

echo "Starting API"
cd /go/server || exit

# Start the first process
node src/api-server.js &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
