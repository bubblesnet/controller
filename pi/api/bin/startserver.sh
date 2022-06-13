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

if [ -f "/postgresql_shared/initialized" ]
then
  echo "/postgresql_shared/initialized already exists"
  DB_INITIALIZED="YES"
else
  echo "/postgresql_shared/initialized doesn't exist - database will be dropped/rebuilt"
fi

if [ ! -d "/postgresql_shared/migrations" ]
then
  mkdir -p /postgresql_shared/migrations
  cp /go/migrations/* /postgresql_shared/migrations
  echo "migrations directory didn't already exist, filled from container"
else
  echo "migrations directory already exists"
fi

if [ ! -d "/postgresql_shared/bin" ]
then
  mkdir -p /postgresql_shared/bin
  cp /go/bin/init_db.sh /postgresql_shared/bin/init_db.sh
  chmod +x /postgresql_shared/bin/init_db.sh
  cp /go/bin/init_db.sql /postgresql_shared/bin/init_db.sql
else
  echo "bin directory already exists"
fi

if [ ! -d "/postgresql_shared/conf" ]
then
  mkdir -p /postgresql_shared/conf
  cp /go/conf/* /postgresql_shared/conf
else
  echo "conf directory already exists"
fi

if [ ! -d "/data/var/lib/postgresql/11/main" ]
then
  echo "making shared directory"
  # if the data directory doesn't exist, make it
  mkdir -p /data/var/lib/postgresql/11/main
  # cp -r /var/lib/postgresql/11/main/* /data/var/lib/postgresql/11/main

  chmod 700 /data/var/lib/postgresql/11/main
  chown -R postgres /data/var/lib/postgresql/*
  chgrp -R postgres /data/var/lib/postgresql/*
else
  echo "not making shared directory"
fi

if [ ! -d "/data/var/lib/postgresql/11/main" ]
then
  echo config.json exists, not copying new one over to data
else
  echo Copying config.json over to data
  cp /go/config.json /data/config.json
fi

export PGPASSWORD=$ICEBREAKER_POSTGRES_PASSWORD

# terminate all connections
if [ "$DB_INITIALIZED" = "YES" ]
then
  echo "Database already exists, don't drop/recreate"
else
  echo "Database doesn't already exist, drop/recreate"
  echo "terminate all connections doesn't work yet - skipping"
  sudo PGPASSWORD=$ICEBREAKER_POSTGRES_PASSWORD psql -h $ICEBREAKER_DB_HOST -p 5432 -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$ICEBREAKER_DB_NAME' AND pid <> pg_backend_pid();" "user='$ICEBREAKER_POSTGRES_USER' dbname=postgres password='$ICEBREAKER_POSTGRES_PASSWORD'"
#  create database
  echo Drop database
  sudo psql -h $ICEBREAKER_DB_HOST -p 5432 -c "DROP DATABASE IF EXISTS $ICEBREAKER_DB_NAME" "user=$ICEBREAKER_POSTGRES_USER dbname=postgres password='$ICEBREAKER_POSTGRES_PASSWORD'"
  echo Create database
  sudo PGPASSWORD=$ICEBREAKER_POSTGRES_PASSWORD psql -h $ICEBREAKER_DB_HOST -p 5432 -c "CREATE DATABASE $ICEBREAKER_DB_NAME" "user=$ICEBREAKER_POSTGRES_USER dbname=postgres password='$ICEBREAKER_POSTGRES_PASSWORD'"
  echo Create tables
  sudo PGPASSWORD=$ICEBREAKER_POSTGRES_PASSWORD psql -h $ICEBREAKER_DB_HOST -U $ICEBREAKER_POSTGRES_USER -d $ICEBREAKER_DB_NAME -a -f bin/create_tables.sql
fi

echo "Always run migrations from /postgresql_shared/migrations"
ls -l /postgresql_shared/migrations/*_ca.up.sql
/go/migrate -verbose -source file:///postgresql_shared/migrations -database postgres://postgres:$POSTGRESQL_PASSWORD@$POSTGRESQL_HOST:5432/$POSTGRESQL_DBNAME?sslmode=disable up

# echo "Update ClamAV database"
# sudo freshclam

if [ "$DB_INITIALIZED" = "YES" ]
then
  echo "Database already exists, don't import known projects"
else
  echo "Database doesn't already exist, importing known projects"
  cd /go/bin
  echo Marking database as initialized
  date > /postgresql_shared/initialized
fi

echo "Starting API"
cd /go/server

# Start the first process
node src/api-server.js &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
