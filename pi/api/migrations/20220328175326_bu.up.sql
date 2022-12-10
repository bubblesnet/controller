ALTER TABLE automationsettings ADD COLUMN target_water_temperature float NOT NULL default 68.1;
ALTER TABLE automationsettings ADD COLUMN water_temperature_min float NOT NULL default 50.0;
ALTER TABLE automationsettings ADD COLUMN water_temperature_max float NOT NULL default 75.0;