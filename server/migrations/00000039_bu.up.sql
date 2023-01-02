
update station set water_heater=false where water_heater is null;
ALTER TABLE station ALTER COLUMN water_heater SET DEFAULT false;
ALTER TABLE station ALTER COLUMN water_heater SET NOT NULL;

update station set light_sensor_external=false where light_sensor_external is null;
ALTER TABLE station ALTER COLUMN light_sensor_external SET DEFAULT false;
ALTER TABLE station ALTER COLUMN light_sensor_external SET NOT NULL;

update station set automatic_control=false where automatic_control is null;
ALTER TABLE station ALTER COLUMN automatic_control SET DEFAULT false;
ALTER TABLE station ALTER COLUMN automatic_control SET NOT NULL;

update station set height_sensor=false where height_sensor is null;
ALTER TABLE station ALTER COLUMN height_sensor SET DEFAULT false;
ALTER TABLE station ALTER COLUMN height_sensor SET NOT NULL;

update station set light_germinate=false where light_germinate is null;
ALTER TABLE station ALTER COLUMN light_germinate SET DEFAULT false;
ALTER TABLE station ALTER COLUMN light_germinate SET NOT NULL;

update station set light_vegetative=false where light_vegetative is null;
ALTER TABLE station ALTER COLUMN light_vegetative SET DEFAULT false;
ALTER TABLE station ALTER COLUMN light_vegetative SET NOT NULL;

update station set light_bloom=false where light_bloom is null;
ALTER TABLE station ALTER COLUMN light_bloom SET DEFAULT false;
ALTER TABLE station ALTER COLUMN light_bloom SET NOT NULL;

update station set heating_pad=false where heating_pad is null;
ALTER TABLE station ALTER COLUMN heating_pad SET DEFAULT false;
ALTER TABLE station ALTER COLUMN heating_pad SET NOT NULL;

update station set heat_lamp=false where heat_lamp is null;
ALTER TABLE station ALTER COLUMN heat_lamp SET DEFAULT false;
ALTER TABLE station ALTER COLUMN heat_lamp SET NOT NULL;

update station set exhaust_fan=false where exhaust_fan is null;
ALTER TABLE station ALTER COLUMN exhaust_fan SET DEFAULT false;
ALTER TABLE station ALTER COLUMN exhaust_fan SET NOT NULL;

update station set intake_fan=false where intake_fan is null;
ALTER TABLE station ALTER COLUMN intake_fan SET DEFAULT false;
ALTER TABLE station ALTER COLUMN intake_fan SET NOT NULL;

update station set water_level_sensor=false where water_level_sensor is null;
ALTER TABLE station ALTER COLUMN water_level_sensor SET DEFAULT false;
ALTER TABLE station ALTER COLUMN water_level_sensor SET NOT NULL;

update station set root_ph_sensor=false where root_ph_sensor is null;
ALTER TABLE station ALTER COLUMN root_ph_sensor SET DEFAULT false;
ALTER TABLE station ALTER COLUMN root_ph_sensor SET NOT NULL;

update station set pressure_sensors=false where pressure_sensors is null;
ALTER TABLE station ALTER COLUMN pressure_sensors SET DEFAULT false;
ALTER TABLE station ALTER COLUMN pressure_sensors SET NOT NULL;

update station set movement_sensor=false where movement_sensor is null;
ALTER TABLE station ALTER COLUMN movement_sensor SET DEFAULT false;
ALTER TABLE station ALTER COLUMN movement_sensor SET NOT NULL;

update station set outer_door_sensor=false where outer_door_sensor is null;
ALTER TABLE station ALTER COLUMN outer_door_sensor SET DEFAULT false;
ALTER TABLE station ALTER COLUMN outer_door_sensor SET NOT NULL;

update station set station_door_sensor=false where station_door_sensor is null;
ALTER TABLE station ALTER COLUMN station_door_sensor SET DEFAULT false;
ALTER TABLE station ALTER COLUMN station_door_sensor SET NOT NULL;

update station set light_sensor_internal=false where light_sensor_internal is null;
ALTER TABLE station ALTER COLUMN light_sensor_internal SET DEFAULT false;
ALTER TABLE station ALTER COLUMN light_sensor_internal SET NOT NULL;

update station set air_pump=false where air_pump is null;
ALTER TABLE station ALTER COLUMN air_pump SET DEFAULT false;
ALTER TABLE station ALTER COLUMN air_pump SET NOT NULL;

update station set water_pump=false where water_pump is null;
ALTER TABLE station ALTER COLUMN water_pump SET DEFAULT false;
ALTER TABLE station ALTER COLUMN water_pump SET NOT NULL;

update station set thermometer_water=false where thermometer_water is null;
ALTER TABLE station ALTER COLUMN thermometer_water SET DEFAULT false;
ALTER TABLE station ALTER COLUMN thermometer_water SET NOT NULL;

update station set thermometer_bottom=false where thermometer_bottom is null;
ALTER TABLE station ALTER COLUMN thermometer_bottom SET DEFAULT false;
ALTER TABLE station ALTER COLUMN thermometer_bottom SET NOT NULL;

update station set thermometer_middle=false where thermometer_middle is null;
ALTER TABLE station ALTER COLUMN thermometer_middle SET DEFAULT false;
ALTER TABLE station ALTER COLUMN thermometer_middle SET NOT NULL;

update station set thermometer_top=false where thermometer_top is null;
ALTER TABLE station ALTER COLUMN thermometer_top SET DEFAULT false;
ALTER TABLE station ALTER COLUMN thermometer_top SET NOT NULL;

update station set thermometer_external=false where thermometer_external is null;
ALTER TABLE station ALTER COLUMN thermometer_external SET DEFAULT false;
ALTER TABLE station ALTER COLUMN thermometer_external SET NOT NULL;

update station set heater=false where heater is null;
ALTER TABLE station ALTER COLUMN heater SET DEFAULT false;
ALTER TABLE station ALTER COLUMN heater SET NOT NULL;

update station set humidity_sensor_internal=false where humidity_sensor_internal is null;
ALTER TABLE station ALTER COLUMN water_heater SET DEFAULT false;
ALTER TABLE station ALTER COLUMN water_heater SET NOT NULL;

update station set humidity_sensor_external=false where humidity_sensor_external is null;
ALTER TABLE station ALTER COLUMN humidity_sensor_internal SET DEFAULT false;
ALTER TABLE station ALTER COLUMN humidity_sensor_internal SET NOT NULL;

update station set humidifier=false where humidifier is null;
ALTER TABLE station ALTER COLUMN humidifier SET DEFAULT false;
ALTER TABLE station ALTER COLUMN humidifier SET NOT NULL;

update station set ec_sensor=false where ec_sensor is null;
ALTER TABLE station ALTER COLUMN ec_sensor SET DEFAULT false;
ALTER TABLE station ALTER COLUMN ec_sensor SET NOT NULL;

update station set voc_sensor=false where voc_sensor is null;
ALTER TABLE station ALTER COLUMN voc_sensor SET DEFAULT false;
ALTER TABLE station ALTER COLUMN voc_sensor SET NOT NULL;

update station set water_dispenser=false where water_dispenser is null;
ALTER TABLE station ALTER COLUMN water_dispenser SET DEFAULT false;
ALTER TABLE station ALTER COLUMN water_dispenser SET NOT NULL;

update station set phup_dispenser=false where phup_dispenser is null;
ALTER TABLE station ALTER COLUMN phup_dispenser SET DEFAULT false;
ALTER TABLE station ALTER COLUMN phup_dispenser SET NOT NULL;

update station set phdown_dispenser=false where phdown_dispenser is null;
ALTER TABLE station ALTER COLUMN phdown_dispenser SET DEFAULT false;
ALTER TABLE station ALTER COLUMN phdown_dispenser SET NOT NULL;

update station set tamper_xmove=1000000.0 where tamper_xmove is null;
ALTER TABLE station ALTER COLUMN tamper_xmove SET DEFAULT 1000000.0;
ALTER TABLE station ALTER COLUMN tamper_xmove SET NOT NULL;

update station set tamper_ymove=1000000.0 where tamper_ymove is null;
ALTER TABLE station ALTER COLUMN tamper_ymove SET DEFAULT 1000000.0;
ALTER TABLE station ALTER COLUMN tamper_ymove SET NOT NULL;

update station set tamper_zmove=1000000.0 where tamper_zmove is null;
ALTER TABLE station ALTER COLUMN tamper_zmove SET DEFAULT 1000000.0;
ALTER TABLE station ALTER COLUMN tamper_zmove SET NOT NULL;

