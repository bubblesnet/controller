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
AS $BODY$
    DECLARE

    new_userid int := -1;
    new_siteid int := -1;
    new_stationid int := -1;
    new_devicetypeid int := -1;
    new_deviceid int := -1;
    new_moduleid int := -1;
    new_sensorid int := -1;
    new_outletid int := -1;

        heater bool := true;
        humidifier bool := true;
        blooming_light bool := true;
        intake_fan bool := true;
        exhaust_fan bool := true;
        water_pump bool := true;
        water_heather bool := true;
        air_pump bool := true;

    humidity_sensor_internal bool := true;
    humidity_sensor_external bool := true;

        thermometer_top bool := true;
        thermometer_middle bool := true;
        thermometer_bottom bool := true;
        thermometer_external bool := true;
        thermometer_water bool := true;

    light_sensor_internal  bool := true;
    light_sensor_external  bool := true;
        station_door_sensor bool := true;
        outer_door_sensor bool := true;
        movement_sensor bool := true;
        pressure_sensors bool := true;
        root_ph_sensor bool := true;
        enclosure_type varchar(255) := 'CABINET';
        water_level_sensor bool := true;
        heat_lamp bool := true;
        heating_pad bool := true;
        light_bloom bool := true;
        light_vegetative bool := true;
        light_germinate bool := true;
        tub_depth float := 10.0;
        tub_volume float := 18.0;

        my_userid integer := 90000009;
        my_internal_device integer := 70000008;
        my_external_device integer := 70000005;
        my_ipaddress varchar(255) := '192.168.21.204';
        my_api_port integer := 3005;
        my_stage varchar(255) := 'idle';

        xmove float := 0.5;
        ymove float := 0.5;
        zmove float := 0.5;

    BEGIN

    ALTER SEQUENCE public.user_userid_seq RESTART WITH 90000009;
    INSERT INTO public.user (firstname,lastname,email,passwordhash,username,created) VALUES ('first', 'last', 'email@email.com',
      '$2a$08$vhiCCf5Sscfptmoxr8J1dO8jlNvG2UNLkC5WID1CR4NY.582JJ4ku', 'admin', now()) RETURNING userid INTO new_userid;
--    SELECT * FROM public.user;

    ALTER SEQUENCE displaysettings_displaysettingsid_seq RESTART WITH 1;
    INSERT INTO displaysettings (userid_user) VALUES (new_userid);
--    SELECT * FROM displaysettings JOIN public.user on userid_user=userid;

    ALTER SEQUENCE site_siteid_seq RESTART WITH 1;
    INSERT INTO site (sitename,userid_user) VALUES ('Initial site', new_userid) RETURNING siteid INTO new_siteid;
--    SELECT * FROM site s JOIN public.user u on s.userid_user=userid JOIN displaysettings d on d.userid_user = userid;

    ALTER SEQUENCE cabinet_cabinetid_seq RESTART WITH 1;
    INSERT INTO station (siteid_site,controller_hostname,controller_api_port,current_stage,tamper_xmove,tamper_ymove,tamper_zmove
                        ,humidifier,humidity_sensor_internal,humidity_sensor_external,heater
                        ,thermometer_top,thermometer_middle,thermometer_bottom,thermometer_external
                        ,thermometer_water,water_pump,air_pump,light_sensor_internal,light_sensor_external
                        ,station_door_sensor,outer_door_sensor,movement_sensor,pressure_sensors
                        ,root_ph_sensor,enclosure_type,water_level_sensor,tub_depth,tub_volume
                        ,intake_fan,exhaust_fan,heat_lamp,heating_pad,light_bloom
                        ,light_vegetative,light_germinate)
    VALUES ( new_siteid, '', 0, my_stage, xmove,ymove,zmove,
             humidifier, humidity_sensor_internal, humidity_sensor_external, heater,
             thermometer_top, thermometer_middle, thermometer_bottom, thermometer_external,
             thermometer_water, water_pump, air_pump, light_sensor_internal,light_sensor_external,
             station_door_sensor, outer_door_sensor, movement_sensor, pressure_sensors,
             root_ph_sensor, enclosure_type, water_level_sensor, tub_depth,tub_volume,
             intake_fan, exhaust_fan, heat_lamp, heating_pad, light_bloom,
             light_vegetative, light_germinate
           ) RETURNING stationid INTO new_stationid;

--    SELECT * FROM station t JOIN site s ON t.siteid_site = siteid
--        JOIN public.user u on s.userid_user=userid
--        JOIN displaysettings d on d.userid_user = userid;

    ALTER SEQUENCE automationsettings_automationsettingsid_seq RESTART WITH 1;
    INSERT INTO automationsettings (stationid_station, current_lighting_schedule, light_on_start_hour, target_temperature, temperature_min,
                                    temperature_max, humidity_min, humidity_max, target_humidity, humidity_target_range_low, humidity_target_range_high, current_light_type,
                                    target_water_temperature, water_temperature_min, water_temperature_max, stage_name, hours_of_light) VALUES
                                (new_stationid, '24 off',       0, 77, 20, 90, 0, 90, 61, 75, 85, 'none', 0, 0, 85, 'idle', 0),
                                (new_stationid, '18 on/6 off',  11, 75, 20, 90, 20, 90, 61, 75, 85, 'Grow Light Germinate', 0, 0, 85, 'germinate', 18),
                                (new_stationid, '12 on/12 off', 11, 75, 20, 90, 20, 90, 61, 75, 85, 'Grow Light Bloom', 0, 0, 75, 'bloom', 12),
                                (new_stationid, '24 off',       0, 0, 20, 90, 0, 90, 0, 75, 85, 'none', 0, 0, 75, 'seedling', 0),
                                (new_stationid, '12 on/12 off', 14, 78, 20, 90, 20, 90, 68, 75, 100, 'Grow Light Veg', 0, 0, 75, 'vegetative', 12),
                                (new_stationid, '24 off',       0, 0, 20, 90, 0, 90, 0, 0, 85, 'none', 0, 0, 75, 'dry', 0),
                                (new_stationid, '24 off',       0, 0, 20, 90, 0, 90, 0, 0, 85, 'none', 0, 0, 75, 'cure', 0),
                                (new_stationid, '24 off',       0, 0, 20, 90, 0, 90, 0, 0, 85, 'none', 0, 0, 75, 'harvest', 0);

    ALTER SEQUENCE devicetype_devicetypeid_seq RESTART WITH 1;
    INSERT INTO devicetype (devicetypename, manufacturer ) VALUES ('emulator', 'Raspberry Pi') RETURNING devicetypeid INTO new_devicetypeid;

    -- DEVICE 70000005
    ALTER SEQUENCE device_deviceid_seq RESTART WITH 70000005;
    INSERT INTO device ( created, devicename, devicetypeid_devicetype, stationid_station, userid_user,
                         log_level,picamera, usbcamera) VALUES ( now(), 'external device', new_devicetypeid, new_stationid, new_userid
                                                               ,'warn,error,info,silly,debug,fatal',false,false  )   RETURNING deviceid INTO new_deviceid;

    ALTER SEQUENCE module_moduleid_seq RESTART WITH 1;
    INSERT INTO module (module_name, deviceid_device, container_name, module_type, i2caddress, protocol)
    VALUES ('Temp/Humidity/Pressure sensor',new_deviceid,'sense-python','bme280','0x76', 'i2c') RETURNING moduleid into new_moduleid;

    ALTER SEQUENCE sensor_sensorid_seq RESTART WITH 1;
    INSERT INTO sensor (sensor_name, moduleid_module, measurement_name)
    VALUES
        ('temperature_sensor',new_moduleid,'temp_air_external') ,
        ('humidity_sensor',new_moduleid,'humidity_external'),
        ('pressure_sensor',new_moduleid,'pressure_external');

    INSERT INTO module (module_name, deviceid_device, container_name, module_type, i2caddress, protocol)
    VALUES ('Light Sensor',new_deviceid,'sense-python','bh1750','0x23', 'i2c') RETURNING moduleid into new_moduleid;

    INSERT INTO sensor (sensor_name, moduleid_module, measurement_name) VALUES ('light_sensor',new_moduleid,'light_internal') RETURNING sensorid into new_sensorid;
    -- END DEVICE 70000005

    -- DEVICE 70000008
    ALTER SEQUENCE device_deviceid_seq RESTART WITH 70000008;
    INSERT INTO device ( created, devicename, devicetypeid_devicetype, stationid_station, userid_user,
                         log_level,picamera, usbcamera) VALUES ( now(), 'first device', new_devicetypeid, new_stationid, new_userid
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

    INSERT INTO module (module_name, deviceid_device, container_name, module_type, i2caddress, protocol)
    VALUES ('AtoD Converter',new_deviceid,'sense-go','ads1115','0x48', 'i2c') RETURNING moduleid into new_moduleid;
    INSERT INTO sensor (sensor_name, moduleid_module, measurement_name) VALUES ('water_level_sensor',new_moduleid,'water_level') RETURNING sensorid into new_sensorid;

    INSERT INTO module (module_name, deviceid_device, container_name, module_type, i2caddress, protocol)
    VALUES ('AtoD Converter',new_deviceid,'sense-go','ads1115','0x49', 'i2c') RETURNING moduleid into new_moduleid;

    INSERT INTO module (module_name, deviceid_device, container_name, module_type, i2caddress, protocol)
    VALUES ('Accelerometer/Tilt-detector',new_deviceid,'sense-go','adxl345','0x53', 'i2c') RETURNING moduleid into new_moduleid;
    INSERT INTO sensor (sensor_name, moduleid_module, measurement_name) VALUES ('tamper_sensor',new_moduleid,'tamper') RETURNING sensorid into new_sensorid;

    INSERT INTO module (module_name, deviceid_device, container_name, module_type, i2caddress, protocol)
    VALUES ('pH Sensor',new_deviceid,'sense-go','ezoph','0x63', 'i2c') RETURNING moduleid into new_moduleid;
    INSERT INTO sensor (sensor_name, moduleid_module, measurement_name) VALUES ('ph_sensor',new_moduleid,'ph') RETURNING sensorid into new_sensorid;

    INSERT INTO module (module_name, deviceid_device, container_name, module_type, i2caddress, protocol)
    VALUES ('DS18B20',new_deviceid,'sense-go','hcsr04','0x47', 'one-wire') RETURNING moduleid into new_moduleid;
    INSERT INTO sensor (sensor_name, moduleid_module, measurement_name) VALUES ('thermometer_water',new_moduleid,'temp_water') RETURNING sensorid into new_sensorid;

    ALTER SEQUENCE outlet_outletid_seq RESTART WITH 1;
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
    -- END DEVICE 70000008

    RETURN 0;
END;
$BODY$;

SELECT public."InitializeSite"();