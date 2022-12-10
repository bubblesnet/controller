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

SELECT sitename as site_name, siteid_site as siteid, station_name, location, stationid, current_stage, stage, light_on_hour, tamper_xmove, tamper_ymove, tamper_zmove,
       time_between_pictures_in_seconds, time_between_sensor_polling_in_seconds, humidifier, humidity_sensor_internal,
       humidity_sensor_external, heater, water_heater, thermometer_top, thermometer_middle, thermometer_bottom, thermometer_external,
       thermometer_water, water_pump, air_pump, light_sensor_internal, light_sensor_external, station_door_sensor, outer_door_sensor, movement_sensor,
       pressure_sensors, root_ph_sensor, enclosure_type, water_level_sensor, tub_depth, tub_volume, intake_fan, exhaust_fan,
       heat_lamp, heating_pad, light_bloom, light_vegetative, light_germinate, height_sensor, automatic_control,
       coalesce(
               (
                   SELECT array_to_json(array_agg(row_to_json(x)))
                   FROM (
                            SELECT c.stationid AS stationid,
                                   d.deviceid  AS deviceid,
                                   d.picamera,
                                   d.picamera_resolutionx,
                                   d.picamera_resolutiony,
                                   coalesce((
                                                SELECT array_to_json(array_agg(row_to_json(y)))
                                                FROM (
                                                         SELECT moduleid,
                                                                module_name,
                                                                container_name,
                                                                module_type,
                                                                i2caddress as address,
                                                                protocol,
                                                                coalesce((
                                                                             SELECT array_to_json(array_agg(row_to_json(y)))
                                                                             FROM (
                                                                                      SELECT sensorid, sensor_name, measurement_name, extraconfig
                                                                                      from sensor s
                                                                                      where s.moduleid_module = n.moduleid
                                                                                  ) y)
                                                                    ,
                                                                         '[]') as included_sensors
                                                         from module n
                                                         where n.deviceid_device = d.deviceid
                                                     ) y)
                                       , '[]') as modules,
                                   coalesce((
                                                SELECT array_to_json(array_agg(row_to_json(o)))
                                                FROM (
                                                         SELECT outletid,

                                                                name,
                                                                index,
                                                                bcm_pin_number,
                                                                onoff
                                                         from outlet o
                                                         where o.deviceid_device = d.deviceid
                                                     ) o)
                                       , '[]') as ac_outlets,
                                coalesce((
                                             SELECT array_to_json(array_agg(row_to_json(r)))
                                             FROM (
                                                      SELECT automationsettingsid,
                                                        current_stage,
    current_lighting_schedule,
    light_on_start_hour,
    target_temperature,
    temperature_min,
    temperature_max,
    humidity_min,
    humidity_max,
    target_humidity,
    humidity_target_range_low,
    humidity_target_range_high,
    current_light_type
                                                      from automationsettings r
                                                      where r.stationid_Station = c.stationid
                                                  ) r)
                                    , '[]') as automation_settings


                            FROM station z
                                     JOIN device d ON (d.stationid_Station = c.stationid)
                            WHERE z.stationid = d.stationid_Station
                        ) x
               ),
               '[]'
           ) AS attached_devices
FROM public.user u
         JOIN site i ON i.userid_user = u.userid
         JOIN station c ON c.siteid_site=i.siteid
WHERE i.siteid = ${siteid}`
