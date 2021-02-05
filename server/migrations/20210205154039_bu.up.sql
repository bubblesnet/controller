--
-- Table structure for table devicetype
--
CREATE TABLE module (
                            moduleid SERIAL PRIMARY KEY,
                            modulename varchar(100) NOT NULL,
                            deviceid_Device int DEFAULT NOT NULL,
                            containername varchar(45) DEFAULT NOT NULL,
                            moduletype varchar(45) DEFAULT NOT NULL,
                            i2caddress varchar(45) DEFAULT NULL,
                            FOREIGN KEY (deviceid_Device) REFERENCES "device" (deviceid)

);

CREATE TABLE sensor (
                        sensorid SERIAL PRIMARY KEY,
                        moduleid_Module SERIAL PRIMARY KEY,
                        sensorname varchar(100) NOT NULL,
                        measurementname varchar(100) NOT NULL,
                        extraconfig varchar(100),
                        FOREIGN KEY (moduleid_Module) REFERENCES "module" (moduleid)

)
