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

CREATE TABLE displaysettings
(
    displaysettingsid  SERIAL PRIMARY KEY,
    userid_User        int          NOT NULL,
    units              varchar(255) NOT NULL DEFAULT 'METRIC',
    language           varchar(255) NOT NULL DEFAULT 'en-us',
    theme              varchar(255) NOT NULL DEFAULT '',
    current_font       varchar(255) NOT NULL DEFAULT 'Aclonica',
    light_units        varchar(255) NOT NULL DEFAULT 'lux',
    tub_volume_units   varchar(255) NOT NULL DEFAULT 'gallons',
    tub_depth_units    varchar(255) NOT NULL DEFAULT 'inches',
    plant_height_units varchar(255) NOT NULL DEFAULT 'inches',
    humidity_units     varchar(255) NOT NULL DEFAULT '%',
    temperature_units  varchar(255) NOT NULL DEFAULT 'F',
    pressure_units     varchar(255) NOT NULL DEFAULT 'hPa',
    FOREIGN KEY (userid_User) REFERENCES "user" (userid)
);
