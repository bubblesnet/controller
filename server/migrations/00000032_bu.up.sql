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

CREATE TABLE additive (
    additiveid SERIAL PRIMARY KEY,
    manufacturer_name VARCHAR(255) NOT NULL,
    additive_name VARCHAR(255) NOT NULL,
    spec_url VARCHAR(1024) NULL,
    is_pgr BOOL NOT NULL default False
);

CREATE TABLE dispenser
(
    dispenserid SERIAL PRIMARY KEY,
    stationid_Station  INT  NOT NULL,
    deviceid_Device  INT  NOT NULL,
    dispenser_name   VARCHAR(255) NOT NULL,
    currently_loaded_additiveid INT NULL,
    index           INT      NOT NULL,
    bcm_pin_number  INT      NOT NULL,
    onoff           BOOL NOT NULL default false,
    FOREIGN KEY (currently_loaded_additiveid) REFERENCES "additive" (additiveid),
    FOREIGN KEY (stationid_Station) REFERENCES "station" (stationid),
    FOREIGN KEY (deviceid_Device) REFERENCES "device" (deviceid)
);








