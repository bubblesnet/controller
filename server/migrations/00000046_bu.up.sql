
INSERT INTO automationsettings (stationid_station, current_lighting_schedule, light_on_start_hour, target_temperature, temperature_min,
                                temperature_max, humidity_min, humidity_max, target_humidity, humidity_target_range_low, humidity_target_range_high, current_light_type,
                                target_water_temperature, water_temperature_min, water_temperature_max, stage_name, hours_of_light) VALUES
                                                                                                                                        (2, '24 off',       0, 77, 20, 90, 0, 90, 61, 75, 85, 'none', 0, 0, 85, 'idle', 0),
                                                                                                                                        (2, '24 off',  11, 75, 20, 90, 20, 90, 61, 75, 85, 'none', 0, 0, 85, 'colonize', 18),
                                                                                                                                        (2, '24 off', 11, 75, 20, 90, 20, 90, 61, 75, 85, 'none', 0, 0, 75, 'bloom', 12);

INSERT INTO automationsettings (stationid_station, current_lighting_schedule, light_on_start_hour, target_temperature, temperature_min,
                                temperature_max, humidity_min, humidity_max, target_humidity, humidity_target_range_low, humidity_target_range_high, current_light_type,
                                target_water_temperature, water_temperature_min, water_temperature_max, stage_name, hours_of_light) VALUES
                                                                                                                                        (3, '24 off',       0, 77, 20, 90, 0, 90, 61, 75, 85, 'none', 0, 0, 85, 'idle', 0),
                                                                                                                                        (3, '24 off',  11, 75, 20, 90, 20, 90, 61, 75, 85, 'none', 0, 0, 85, 'colonize', 18),
                                                                                                                                        (3, '24 off', 11, 75, 20, 90, 20, 90, 61, 75, 85, 'none', 0, 0, 75, 'bloom', 12);
