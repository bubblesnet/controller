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

CREATE TABLE growlog
(
    growlogid SERIAL PRIMARY KEY,
    userid_user int NOT NULL,
    stationid_Station    int NULL,
    deviceid_Device    int NULL,
    entry_datetimemillis BIGINT NOT NULL,
    chemical_added VARCHAR(255) NULL,
    chemical_added_amount INT NULL,
    chemical_added_units VARCHAR(255),
    action varchar(255) NULL,
    freeform_text text NULL,
    seedid_seed int NULL,
    seed_name VARCHAR(255) NULL,
    FOREIGN KEY (userid_User) REFERENCES "user" (userid),
    FOREIGN KEY (stationid_Station) REFERENCES "station" (stationid)
);


ALTER TABLE device ADD COLUMN latest_picture_filename VARCHAR(255) NULL;
ALTER TABLE device ADD COLUMN latest_picture_datetimemillis BIGINT NULL;

ALTER TABLE sensor ADD COLUMN latest_calibration_datetimemillis BIGINT NULL;
