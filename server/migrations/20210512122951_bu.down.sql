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


CREATE TABLE faq (
                     faqid SERIAL PRIMARY KEY,
                     displayorder int DEFAULT NULL,
                     question varchar(256) DEFAULT NULL,
                     answer varchar(2048) DEFAULT NULL
);

--
-- Table structure for table location
--
CREATE TABLE location (
                          locationid SERIAL PRIMARY KEY,
                          userid_User int NOT NULL,
                          deviceid_Device int NOT NULL,
                          eventdatemillis bigint NOT NULL,
                          accuracy float8 NOT NULL,
                          altitude float8 NOT NULL,
                          bearing float8 NOT NULL,
                          latitude float8 NOT NULL,
                          longitude float8 NOT NULL,
                          provider varchar(45) NOT NULL,
                          speed float8 NOT NULL,
                          hasAccuracy int NOT NULL,
                          hasAltitude int NOT NULL,
                          hasBearing int NOT NULL,
                          hasSpeed int NOT NULL,
                          gpstime bigint NOT NULL,
                          filename varchar(256) NOT NULL,
                          FOREIGN KEY (userid_User) REFERENCES "user" (userid),
                          FOREIGN KEY (deviceid_Device) REFERENCES device (deviceid)
);

CREATE TABLE strip (
                       stripid SERIAL PRIMARY KEY,
                       userid_User int NOT NULL,
                       deviceid_Device int NOT NULL,
                       startdatemillis bigint NOT NULL,
                       enddatemillis bigint NOT NULL,
                       createdatemillis bigint NOT NULL,
                       supersededby_stripid int DEFAULT NULL,
                       filename varchar(100) NOT NULL,
                       startdate timestamp DEFAULT NULL,
                       enddate timestamp DEFAULT NULL
);

ALTER TABLE station DROP CONSTRAINT station_siteid_site_fkey;
ALTER TABLE station ADD FOREIGN KEY (siteid_site) REFERENCES site(siteid);
ALTER TABLE device DROP CONSTRAINT device_stationid_station_fkey;
ALTER TABLE device ADD FOREIGN KEY (stationid_station) REFERENCES station(stationid);
ALTER TABLE outlet DROP CONSTRAINT outlet_stationid_station_fkey;
ALTER TABLE outlet ADD FOREIGN KEY (stationid_station) REFERENCES station(stationid);
ALTER TABLE outlet DROP CONSTRAINT outlet_deviceid_device_fkey;
ALTER TABLE outlet ADD FOREIGN KEY (deviceid_device) REFERENCES device(deviceid);
ALTER TABLE module DROP CONSTRAINT module_deviceid_device_fkey;
ALTER TABLE module ADD FOREIGN KEY (deviceid_device) REFERENCES device(deviceid);
ALTER TABLE sensor DROP CONSTRAINT sensor_moduleid_module_fkey;
ALTER TABLE sensor ADD FOREIGN KEY (moduleid_module) REFERENCES module(moduleid);



