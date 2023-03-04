
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

CREATE OR REPLACE FUNCTION public."InitializeExperiment3a"()
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE
AS $BODY$
DECLARE

    existing_userid int := 90000009;
    existing_siteid int := 1;
    new_stationid int := 3;
    new_station_type int := 2;
    new_devicetypeid int := 0;

    new_deviceid int := -1;
    new_moduleid int := -1;
    new_sensorid int := -1;
    new_outletid int := -1;
    new_station_name varchar(255) := 'Experimental 3a';
    time_between_pictures_in_seconds int := 120;
    time_between_sensor_polling_in_seconds int := 30;

    heater bool := true;
    humidifier bool := true;
    blooming_light bool := false;
    intake_fan bool := true;
    exhaust_fan bool := false;
    water_pump bool := false;
    water_heater bool := false;
    air_pump bool := false;

    humidity_sensor_internal bool := true;
    humidity_sensor_external bool := false;

    thermometer_top bool := false;
    thermometer_middle bool := true;
    thermometer_bottom bool := false;
    thermometer_external bool := false;
    thermometer_water bool := false;

    light_sensor_internal  bool := true;
    light_sensor_external  bool := false;
    station_door_sensor bool := true;
    outer_door_sensor bool := false;
    movement_sensor bool := false;
    pressure_sensors bool := true;
    root_ph_sensor bool := false;
    enclosure_type varchar(255) := 'CABINET';
    water_level_sensor bool := false;
    heat_lamp bool := false;
    heating_pad bool := true;
    light_bloom bool := false;
    light_vegetative bool := false;
    light_germinate bool := false;
    tub_depth float := 10.0;
    tub_volume float := 18.0;

    co2_sensor bool := true;
    voc_sensor bool := true;

    my_stage varchar(255) := 'idle';

    xmove float := 0.5;
    ymove float := 0.5;
    zmove float := 0.5;

BEGIN

    ALTER SEQUENCE cabinet_cabinetid_seq RESTART WITH 3;
    INSERT INTO station (siteid_site,controller_hostname,controller_api_port,current_stage,tamper_xmove,tamper_ymove,tamper_zmove
                        ,humidifier,humidity_sensor_internal,humidity_sensor_external,heater
                        ,thermometer_top,thermometer_middle,thermometer_bottom,thermometer_external
                        ,thermometer_water,water_pump,air_pump,light_sensor_internal,light_sensor_external
                        ,station_door_sensor,outer_door_sensor,movement_sensor,pressure_sensors
                        ,root_ph_sensor,enclosure_type,water_level_sensor,tub_depth,tub_volume
                        ,intake_fan,exhaust_fan,heat_lamp,heating_pad,light_bloom
                        ,light_vegetative,light_germinate, co2_sensor, voc_sensor, water_heater, station_name,
                         time_between_pictures_in_seconds,time_between_sensor_polling_in_seconds)
    VALUES ( existing_siteid, '', 0, my_stage, xmove,ymove,zmove,
             humidifier, humidity_sensor_internal, humidity_sensor_external, heater,
             thermometer_top, thermometer_middle, thermometer_bottom, thermometer_external,
             thermometer_water, water_pump, air_pump, light_sensor_internal,light_sensor_external,
             station_door_sensor, outer_door_sensor, movement_sensor, pressure_sensors,
             root_ph_sensor, enclosure_type, water_level_sensor, tub_depth,tub_volume,
             intake_fan, exhaust_fan, heat_lamp, heating_pad, light_bloom,
             light_vegetative, light_germinate, co2_sensor, voc_sensor, water_heater, new_station_name,
            time_between_pictures_in_seconds,time_between_sensor_polling_in_seconds
           ) RETURNING stationid INTO new_stationid;


    ALTER SEQUENCE devicetype_devicetypeid_seq RESTART WITH 2;
    INSERT INTO devicetype (devicetypename, manufacturer ) VALUES ('emulator', 'Raspberry Pi 3A+') RETURNING devicetypeid INTO new_devicetypeid;

    -- DEVICE 60000007
    ALTER SEQUENCE device_deviceid_seq RESTART WITH 60000007;
    INSERT INTO device ( created, devicename, devicetypeid_devicetype, stationid_station, userid_user,
                         log_level,picamera, usbcamera) VALUES ( now(), 'experimental device', new_devicetypeid, new_stationid, existing_userid
                                                               ,'warn,error,info,silly,debug,fatal',false,false  )   RETURNING deviceid INTO new_deviceid;

    INSERT INTO module (module_name, deviceid_device, container_name, module_type, i2caddress, protocol)
    VALUES ('Temp/Humidity/Pressure sensor',new_deviceid,'sense-python','bme280','0x76', 'i2c') RETURNING moduleid into new_moduleid;

    INSERT INTO sensor (sensor_name, moduleid_module, measurement_name)
    VALUES
        ('temperature_sensor',new_moduleid,'temp_air_middle'),
        ('humidity_sensor',new_moduleid,'humidity_internal'),
        ('pressure_sensor',new_moduleid,'pressure_internal');

    INSERT INTO module (module_name, deviceid_device, container_name, module_type, i2caddress, protocol)
    VALUES ('Light Sensor',new_deviceid,'sense-python','bh1750','0x23', 'i2c') RETURNING moduleid into new_moduleid;
    INSERT INTO sensor (sensor_name, moduleid_module, measurement_name) VALUES ('light_sensor',new_moduleid,'light_internal') RETURNING sensorid into new_sensorid;

    INSERT INTO outlet (stationid_station, deviceid_device, name, index, bcm_pin_number, onoff)
    VALUES
        ( 1, new_deviceid, 'intakeFan', 0, 17, false) ,
        ( 1, new_deviceid, 'waterPump', 1, 27, false) ,
        ( 1, new_deviceid, 'lightBloom', 2, 22, false) ,
        ( 1, new_deviceid, 'heater', 3, 16, false) ,
        ( 1, new_deviceid, 'airPump', 4, 12, false) ,
        ( 1, new_deviceid, 'exhaustFan', 5, 19, false) ,
        ( 1, new_deviceid, 'humidifier', 6, 26, false) ,
        ( 1, new_deviceid, 'waterHeater', 7, 13, false) ;
    -- END DEVICE 60000006

    RETURN 0;
END;
$BODY$;

SELECT public."InitializeExperiment3a"();
