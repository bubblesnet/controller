ALTER TABLE STATION ADD COLUMN water_dispenser bool default False;
ALTER TABLE STATION ADD COLUMN phup_dispenser bool default False;
ALTER TABLE STATION ADD COLUMN phdown_dispenser bool default False;

ALTER TABLE DISPENSER ADD COLUMN milliliters_per_millisecond float not null default 0.0;
UPDATE DISPENSER SET milliliters_per_millisecond = 0.0026 where milliliters_per_millisecond = 0.0;