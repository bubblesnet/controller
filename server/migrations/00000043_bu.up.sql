ALTER TABLE station ADD COLUMN station_type int NULL default 1;
UPDATE station set station_type=2 where stationid=2;
