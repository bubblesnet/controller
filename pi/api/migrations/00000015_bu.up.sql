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

ALTER TABLE sensor DROP CONSTRAINT sensor_moduleid_module_fkey;
ALTER TABLE sensor ADD FOREIGN KEY (moduleid_module) REFERENCES module(moduleid) ON DELETE CASCADE;
ALTER TABLE module DROP CONSTRAINT module_deviceid_device_fkey;
ALTER TABLE module ADD FOREIGN KEY (deviceid_device) REFERENCES device(deviceid) ON DELETE CASCADE;
ALTER TABLE outlet DROP CONSTRAINT outlet_deviceid_device_fkey;
ALTER TABLE outlet ADD FOREIGN KEY (deviceid_device) REFERENCES device(deviceid) ON DELETE SET NULL;
ALTER TABLE outlet DROP CONSTRAINT outlet_stationid_station_fkey;
ALTER TABLE outlet ADD FOREIGN KEY (stationid_station) REFERENCES station(stationid) ON DELETE SET NULL;
ALTER TABLE device DROP CONSTRAINT device_stationid_station_fkey;
ALTER TABLE device ADD FOREIGN KEY (stationid_station) REFERENCES station(stationid) ON DELETE SET NULL;
ALTER TABLE station DROP CONSTRAINT station_siteid_site_fkey;
ALTER TABLE station ADD FOREIGN KEY (siteid_site) REFERENCES site(siteid) ON DELETE CASCADE;

DROP TABLE strip;
DROP TABLE location;
DROP TABLE faq;
