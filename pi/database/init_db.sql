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

CREATE OR REPLACE FUNCTION public."InitializeSite"()
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE
AS $BODY$DECLARE

    new_userid int := -1;
    new_siteid int := -1;
    new_stationid int := -1;
    new_devicetypeid int := -1;
    new_deviceid int := -1;
BEGIN
    INSERT INTO public.user (firstname,lastname,email,passwordhash,username,created) VALUES ('first', 'last', 'email@email.com',
                                                                                             '$2a$08$vhiCCf5Sscfptmoxr8J1dO8jlNvG2UNLkC5WID1CR4NY.582JJ4ku', 'admin', now())
    RETURNING userid INTO new_userid;
    INSERT INTO site (sitename,userid_user) VALUES ('Initial site', new_userid) RETURNING siteid INTO new_siteid;
    INSERT INTO station (siteid_site,controller_hostname,controller_api_port,current_stage,tamper_xmove,tamper_ymove,tamper_zmove
                        ,humidifier,humidity_sensor_internal,humidity_sensor_external,heater
                        ,thermometer_top,thermometer_middle,thermometer_bottom,thermometer_external
                        ,thermometer_water,water_pump,air_pump,light_sensor_internal
                        ,station_door_sensor,outer_door_sensor,movement_sensor,pressure_sensors
                        ,root_ph_sensor,enclosure_type,water_level_sensor,tub_depth,tub_volume
                        ,intake_fan,exhaust_fan,heat_lamp,heating_pad,light_bloom
                        ,light_vegetative,light_germinate)
    VALUES ( new_siteid, '192.168.21.208', 3005, 'idle', .5,.5,.5,
             false, false, false, false,
             false, false, false, false,
             false, false, false, false,
             false, false, false, false,
             false, 'CABINET', false, 10,10,
             false, false, false, false, false,
             false, false
           ) RETURNING stationid INTO new_stationid;

    INSERT INTO devicetype (devicetypename, manufacturer ) VALUES ('emulator', 'Raspberry Pi') RETURNING devicetypeid INTO new_devicetypeid;

    INSERT INTO device ( created, devicename, devicetypeid_devicetype, stationid_station, userid_user,
                         log_level,picamera, usbcamera) VALUES (now(), 'first device', new_devicetypeid, new_stationid, new_userid
                                                               ,'warn,error,info,silly,debug,fatal',false,false  )   RETURNING deviceid INTO new_deviceid;
    RETURN 0;
END;
$BODY$;

SELECT public."InitializeSite"();