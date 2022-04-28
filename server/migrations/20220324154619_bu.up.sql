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

CREATE TABLE automationsettings
(
    automationsettingsid SERIAL PRIMARY KEY,
    stationid_Station    int NOT NULL,
    current_stage   varchar(255) NOT NULL default 'idle',
    current_lighting_schedule  varchar(255) NOT NULL default '24 off',
    light_on_start_hour int NOT NULL default 0,
    target_temperature float NOT NULL default 75.5,
    temperature_min float NOT NULL default 20.0,
    temperature_max float NOT NULL default 90.0,
    humidity_min float NOT NULL default 0.0,
    humidity_max float NOT NULL default 90.0,
    target_humidity float NOT NULL default 70.0,
    humidity_target_range_low float NOT NULL default 75.0,
    humidity_target_range_high float NOT NULL default 85.0,
    current_light_type varchar(255) NOT NULL default 'Grow Light Veg',
    FOREIGN KEY (stationid_Station) REFERENCES "station" (stationid)
)
