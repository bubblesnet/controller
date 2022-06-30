/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

ALTER TABLE cabinet RENAME TO station;

ALTER TABLE station RENAME COLUMN cabinetid TO stationid;
ALTER TABLE station RENAME CONSTRAINT cabinet_pkey TO station_pkey;
ALTER TABLE station RENAME CONSTRAINT cabinet_userid_user_fkey TO station_userid_user_fkey;

ALTER TABLE device RENAME COLUMN cabinetid_cabinet TO stationid_station;
ALTER TABLE device RENAME CONSTRAINT device_cabinetid_cabinet_fkey TO device_stationid_station_fkey;
ALTER TABLE outlet RENAME COLUMN cabinetid_cabinet TO stationid_station;
ALTER TABLE outlet RENAME CONSTRAINT outlet_cabinetid_cabinet_fkey TO outlet_stationid_station_fkey;

CREATE TABLE site
(
    siteid          SERIAL PRIMARY KEY,
    sitename              varchar(255) NOT NULL
);

ALTER TABLE station add column siteid_site INT NULL;
ALTER TABLE station ADD FOREIGN KEY (siteid_site) REFERENCES site(siteid);
ALTER TABLE station RENAME COLUMN cabinet_door_sensor TO station_door_sensor;
