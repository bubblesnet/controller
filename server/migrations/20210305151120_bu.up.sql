ALTER TABLE sensor RENAME COLUMN sensorname to sensor_name;
ALTER TABLE sensor RENAME COLUMN measurementname to measurement_name;

ALTER TABLE module RENAME COLUMN modulename to module_name;
ALTER TABLE module RENAME COLUMN containername to container_name;
ALTER TABLE module RENAME COLUMN moduletype to module_type;