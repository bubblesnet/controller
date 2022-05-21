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

export POSTGRES_HOST=database
export POSTGRES_PORT=5432
export DATABASE_NAME=bubbles
export DATABASE_USER=postgres
export DATABASE_PASSWORD=postgres

if [ $NODE_ENV = "production" ]
then
#  echo "Re-init database automatically in $NODE_ENV even though we shouldnt do that"
  echo "Cant re-init database automatically in $NODE_ENV"
  exit 0;
elif [ $NODE_ENV = "development" ]
then
  if [ $INIT_DB = "TRUE" ]
  then
    echo "Skipping INIT_DB in environment $NODE_ENV because INIT_DB env var is set to {$INIT_DB}"
  else
    echo "Skipping INIT_DB in environment $NODE_ENV because INIT_DB env var is set to {$INIT_DB} must be TRUE to init"
    exit 0;
  fi
elif [ $NODE_ENV = "CI" ]
then
  echo "initializing DB because environment is $NODE_ENV"
elif [ $NODE_ENV = "test" ]
then
  echo "initializing DB because environment is $NODE_ENV"
else
  echo "Skipping INIT_DB because NODE_ENV has invalid value $NODE_ENV"
  exit 0;
fi

# sudo -u postgres psql
# ALTER USER postgres PASSWORD 'postgres';
sudo -u postgres psql -c "ALTER USER $DATABASE_USER PASSWORD '$DATABASE_PASSWORD';"

# create database

sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -c "DROP DATABASE IF EXISTS $DATABASE_NAME" "user=$DATABASE_USER dbname=postgres password=$DATABASE_PASSWORD"

sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -c "CREATE DATABASE $DATABASE_NAME" "user=$DATABASE_USER dbname=postgres password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20201105104957_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20201105133628_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210205154039_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210211101505_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210226211054_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210227212026_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210302130129_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210305151120_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210312202057_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210331183354_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210401151451_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210408094508_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210415164803_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210509114508_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20210512122951_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20220307183422_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20220315223802_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20220324154619_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20220325135908_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20220328155726_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20220328175326_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20220329154913_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20220402154014_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"
sudo -u postgres psql -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f migrations/20220502195721_bu.up.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"

echo 'Creating template database rows'
sudo -u postgres psql -a -h $POSTGRES_HOST -p $POSTGRES_PORT -a -q -f init_db.sql  "user=$DATABASE_USER dbname=$DATABASE_NAME password=$DATABASE_PASSWORD"

echo 'Done'