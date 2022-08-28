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
