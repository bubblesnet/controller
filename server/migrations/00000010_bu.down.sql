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

ALTER TABLE station RENAME COLUMN station_door_sensor TO cabinet_door_sensor;
ALTER TABLE station DROP CONSTRAINT siteid_site;
ALTER TABLE station DROP column siteid_site;
DROP TABLE site;
ALTER TABLE outlet RENAME CONSTRAINT outlet_stationid_station_fkey TO outlet_cabinetid_cabinet_fkey;
ALTER TABLE outlet RENAME COLUMN stationid_station TO cabinetid_cabinet;
ALTER TABLE device RENAME CONSTRAINT device_stationid_station_fkey TO device_cabinetid_cabinet_fkey;
ALTER TABLE device RENAME COLUMN stationid_station TO cabinetid_cabinet;
ALTER TABLE station RENAME CONSTRAINT station_userid_user_fkey TO cabinet_userid_user_fkey;
ALTER TABLE station RENAME CONSTRAINT station_pkey TO cabinet_pkey;
ALTER TABLE station RENAME COLUMN stationid TO cabinetid;
ALTER TABLE station RENAME TO cabinet;
