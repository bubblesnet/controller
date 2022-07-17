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

if [ -f "$POSTGRESQL_SHARED_DIRECTORY/initialized" ]
then
  echo "$POSTGRESQL_SHARED_DIRECTORY/initialized already exists"
  DB_INITIALIZED="YES"
else
  echo "$POSTGRESQL_SHARED_DIRECTORY/initialized doesn't exist - database will be dropped/rebuilt"
fi

echo "Copying fresh migrations into shared directory"
mkdir -p "$POSTGRESQL_SHARED_DIRECTORY/migrations"
cp /go/migrations/* "$POSTGRESQL_SHARED_DIRECTORY/migrations"

if [ ! -d "$POSTGRESQL_SHARED_DIRECTORY/conf" ]
then
  mkdir -p "$POSTGRESQL_SHARED_DIRECTORY/conf"
else
  echo "conf directory already exists"
fi
cp /go/conf/postgresql.conf "$POSTGRESQL_SHARED_DIRECTORY/conf"
cp /go/conf/pg_hba.conf "$POSTGRESQL_SHARED_DIRECTORY/conf"

export PGPASSWORD=$POSTGRESQL_POSTGRES_PASSWORD

# terminate all connections
if [ "$DB_INITIALIZED" = "YES" ]
then
  echo "Database already exists, don't drop/recreate"
else
  echo "Database doesn't already exist, drop/recreate"
  echo "terminate all connections doesn't work yet - skipping"
  sudo PGPASSWORD="$POSTGRESQL_POSTGRES_PASSWORD" psql -h "$POSTGRESQL_HOST" -p 5432 -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$POSTGRESQL_APPLICATION_DBNAME' AND pid <> pg_backend_pid();" "user='$POSTGRESQL_POSTGRES_USER' dbname=$POSTGRESQL_APPLICATION_DBNAME password='$POSTGRESQL_POSTGRES_PASSWORD'"
#  create database
  echo Drop database
  sudo psql -h "$POSTGRESQL_HOST" -p 5432 -c "DROP DATABASE IF EXISTS $POSTGRESQL_SYSTEM_DBNAME" "user=$POSTGRESQL_POSTGRES_USER dbname=$POSTGRESQL_SYSTEM_DBNAME password='$POSTGRESQL_POSTGRES_PASSWORD'"
  echo Create database
  sudo PGPASSWORD="$POSTGRESQL_POSTGRES_PASSWORD" psql -h "$POSTGRESQL_HOST" -p 5432 -c "CREATE DATABASE $POSTGRESQL_APPLICATION_DBNAME" "user=$POSTGRESQL_POSTGRES_USER dbname=$POSTGRESQL_SYSTEM_DBNAME password='$POSTGRESQL_POSTGRES_PASSWORD'"
fi

echo "Always run migrations from $POSTGRESQL_SHARED_DIRECTORY/migrations - this will create all the tables"
ls -l "$POSTGRESQL_SHARED_DIRECTORY/migrations/*_ca.up.sql"
/migrate -verbose -source "file://$POSTGRESQL_SHARED_DIRECTORY/migrations" -database "postgres://$POSTGRESQL_POSTGRES_USER:$POSTGRESQL_POSTGRES_PASSWORD@$POSTGRESQL_HOST:5432/$POSTGRESQL_APPLICATION_DBNAME?sslmode=disable" up

# echo "Update ClamAV database"
# sudo freshclam

if [ "$DB_INITIALIZED" = "YES" ]
then
  echo "Database already exists"
else
  echo "Database didn't already exist, set initialized flag"
  echo Marking database as initialized
  date > "$POSTGRESQL_SHARED_DIRECTORY/initialized"
fi

echo Turning coral dev board fan on
sudo echo "disabled" > /sys/devices/virtual/thermal/thermal_zone0/mode
sudo echo 8600 > /sys/devices/platform/gpio_fan/hwmon/hwmon0/fan1_target

echo "Starting API"
cd /server || exit

# Start the first process
node src/api-server.js

