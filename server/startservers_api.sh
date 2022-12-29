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

cp usb/usb.rules /etc/udev/rules.d/usb.rules
cp usb/scripts/* /usr/src/scripts
chmod +x /usr/src/scripts/*.sh

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

# if [ ! -d "$POSTGRESQL_SHARED_DIRECTORY/conf" ]
# then
#   mkdir -p "$POSTGRESQL_SHARED_DIRECTORY/conf"
# else
#   echo "conf directory already exists"
# fi
# cp /go/conf/postgresql.conf "$POSTGRESQL_SHARED_DIRECTORY/conf"
# cp /go/conf/pg_hba.conf "$POSTGRESQL_SHARED_DIRECTORY/conf"

export PGPASSWORD=$POSTGRESQL_POSTGRES_PASSWORD

# terminate all connections
if [ "$DB_INITIALIZED" = "YES" ]
then
  echo "Database already exists, don't drop/recreate"
else
  echo "Database doesn't already exist, drop/recreate"
  echo "terminate all connections doesn't work yet - skipping"
#  sudo PGPASSWORD="$POSTGRESQL_POSTGRES_PASSWORD" psql -h "$POSTGRESQL_HOST" -p 5432 -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$POSTGRESQL_APPLICATION_DBNAME' AND pid <> pg_backend_pid();" "user='$POSTGRESQL_POSTGRES_USER' dbname=$POSTGRESQL_APPLICATION_DBNAME password='$POSTGRESQL_POSTGRES_PASSWORD'"
#  create database
  echo Drop database
  sudo psql -h "$POSTGRESQL_HOST" -p 5432 -c "DROP DATABASE IF EXISTS $POSTGRESQL_SYSTEM_DBNAME" "user=$POSTGRESQL_POSTGRES_USER dbname='$POSTGRESQL_SYSTEM_DBNAME' password='$POSTGRESQL_POSTGRES_PASSWORD'"
  echo Create database
  sudo PGPASSWORD="$POSTGRESQL_POSTGRES_PASSWORD" psql -h "$POSTGRESQL_HOST" -p 5432 -c "CREATE DATABASE $POSTGRESQL_APPLICATION_DBNAME" "user=$POSTGRESQL_POSTGRES_USER dbname='$POSTGRESQL_SYSTEM_DBNAME' password='$POSTGRESQL_POSTGRES_PASSWORD'"
  exit_status=$?
  if [ $exit_status != 0 ]
  then
    echo "Database create failed $exit_status, sleep and restart as database may be starting-up"
    sleep "$SLEEP_ON_EXIT_FOR_DEBUGGING"
    exit $exit_status
  else
    echo "Database create succeeded $exit_status"
  fi

fi

echo "Always run migrations from $POSTGRESQL_SHARED_DIRECTORY/migrations - this will create all the tables"
ls -l "$POSTGRESQL_SHARED_DIRECTORY/migrations/*_bu.up.sql"
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

now=$(date +"%Y.%m.%d_%H.%M.%S")

if [ -b "/dev/sda1" ]
then
  echo Mounting /dev/sda1 into /mnt/backups
  sudo mkdir -p /mnt/backups
  sudo mount -t exfat -o rw /dev/sda1 /mnt/backups
  sudo mkdir -p /mnt/backups/database
  sudo mkdir -p /mnt/backups/pictures
  sudo mkdir -p /mnt/backups/logs/api/${now}
  sudo mkdir -p /mnt/backups/logs/queue/${now}
  sudo mkdir -p /mnt/backups/logs/ui/${now}
  sudo mkdir -p /mnt/backups/logs/websocket/${now}
  sudo mkdir -p $POSTGRESQL_SHARED_DIRECTORY/logs/queue/${now}
  sudo mkdir -p $POSTGRESQL_SHARED_DIRECTORY/logs/ui/${now}
  sudo mkdir -p $POSTGRESQL_SHARED_DIRECTORY/logs/websocket/${now}

  echo Moving logs to backup
  sudo mv /server/src/bubblesnet.log /mnt/backups/logs/api/${now}
  sudo mv $LOGS_SHARED_DIRECTORY/logs/queue /mnt/backups/logs/queue/${now}
  sudo mv $LOGS_SHARED_DIRECTORY/logs/ui /mnt/backups/logs/ui/${now}
  sudo mv $LOGS_SHARED_DIRECTORY/logs/websocket /mnt/backups/logs/websocket/${now}

  echo Moving pictures to backup drive
  sudo mv /server/src/public/*.jpg /mnt/backups/pictures

  echo Backing database "$POSTGRESQL_APPLICATION_DBNAME" up to mounted backup drive
  echo "****************************************"
  echo "****                                ****"
  echo "****                                ****"
  echo "**** DATABASE BACKING UP NOW        ****"

  echo *:*:*:*:$POSTGRESQL_POSTGRES_PASSWORD > ~/.pgpass
  export PGPASSFILE=~/.pgpass
  chmod 600 ~/.pgpass
  mkdir /mnt/backups/database/${now}
  sudo pg_dump --no-password -h "$POSTGRESQL_HOST" -p 5432 -U postgres "$POSTGRESQL_APPLICATION_DBNAME" > /mnt/backups/database/${now}/"$POSTGRESQL_APPLICATION_DBNAME".bak 2>> /mnt/backups/database/${now}/dbname.bak.log
  echo "****                               *****"
  echo "****************************************"
  cat /mnt/backups/database/${now}/dbname.bak.log

else
  echo "/dev/sda1 doesn't exist, not mounting"
  echo "****************************************"
  echo "****************************************"
  echo "****                                ****"
  echo "**** DB BACKUPS NOT SAVED!          ****"
  echo "**** LOGS AND PICTURES NOT SAVED !! ****"
  echo "****                                ****"
  echo "****************************************"
  echo "****************************************"
  echo "****************************************"
  echo "****************************************"
fi

if [ "$BALENA_DEVICE_TYPE" = "coral" ]
then
  echo Turning coral dev board fan on
  sudo echo "disabled" > /sys/devices/virtual/thermal/thermal_zone0/mode
  sudo echo 8600 > /sys/devices/platform/gpio_fan/hwmon/hwmon0/fan1_target
fi

echo Setting timezone
sudo ln -sf /usr/share/zoneinfo/US/Eastern /etc/localtime

echo "Starting API"
cd /server || exit

# Start the first process
node src/api-server.js &

# Wait for any process to exit
wait -n

exit_status=$?

if [ -b "/dev/sda1" ]
then
  echo Moving API logs to mounted storage
  mv /server/src/*.log /mnt/backups/logs/api/${now}
  echo Umounting mounted storage
  sudo umount /dev/sda1
fi

echo Executing sleep "$SLEEP_ON_EXIT_FOR_DEBUGGING"
sleep "$SLEEP_ON_EXIT_FOR_DEBUGGING"

echo Exiting with exit status $exit_status

exit $exit_status
