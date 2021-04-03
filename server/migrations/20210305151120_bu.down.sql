ALTER TABLE sensor RENAME COLUMN sensor_name to sensorname;
ALTER TABLE sensor RENAME COLUMN measurement_name to measurementname;

ALTER TABLE module RENAME COLUMN module_name to modulename;
ALTER TABLE module RENAME COLUMN container_name to containername;
ALTER TABLE module RENAME COLUMN module_type to moduletype;