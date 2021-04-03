--
-- Table structure for table module
--
CREATE TABLE module (
                            moduleid SERIAL PRIMARY KEY,
                            modulename varchar(100) NOT NULL,
                            deviceid_Device int NOT NULL,
                            containername varchar(45)  NOT NULL,
                            moduletype varchar(45)  NOT NULL,
                            i2caddress varchar(45)  NULL,
                            FOREIGN KEY (deviceid_Device) REFERENCES "device" (deviceid)

);

CREATE TABLE sensor (
                        sensorid SERIAL PRIMARY KEY,
                        moduleid_Module int NOT NULL,
                        sensorname varchar(100) NOT NULL,
                        measurementname varchar(100) NOT NULL,
                        extraconfig varchar(100),
                        FOREIGN KEY (moduleid_Module) REFERENCES "module" (moduleid)

);

ALTER TABLE device ADD COLUMN externalid varchar(100);
-- ALTER TABLE device ADD COLUMN devicename varchar(100);
