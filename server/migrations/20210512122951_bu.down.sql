
CREATE TABLE faq (
                     faqid SERIAL PRIMARY KEY,
                     displayorder int DEFAULT NULL,
                     question varchar(256) DEFAULT NULL,
                     answer varchar(2048) DEFAULT NULL
);

--
-- Table structure for table location
--
CREATE TABLE location (
                          locationid SERIAL PRIMARY KEY,
                          userid_User int NOT NULL,
                          deviceid_Device int NOT NULL,
                          eventdatemillis bigint NOT NULL,
                          accuracy float8 NOT NULL,
                          altitude float8 NOT NULL,
                          bearing float8 NOT NULL,
                          latitude float8 NOT NULL,
                          longitude float8 NOT NULL,
                          provider varchar(45) NOT NULL,
                          speed float8 NOT NULL,
                          hasAccuracy int NOT NULL,
                          hasAltitude int NOT NULL,
                          hasBearing int NOT NULL,
                          hasSpeed int NOT NULL,
                          gpstime bigint NOT NULL,
                          filename varchar(256) NOT NULL,
                          FOREIGN KEY (userid_User) REFERENCES "user" (userid),
                          FOREIGN KEY (deviceid_Device) REFERENCES device (deviceid)
);

CREATE TABLE strip (
                       stripid SERIAL PRIMARY KEY,
                       userid_User int NOT NULL,
                       deviceid_Device int NOT NULL,
                       startdatemillis bigint NOT NULL,
                       enddatemillis bigint NOT NULL,
                       createdatemillis bigint NOT NULL,
                       supersededby_stripid int DEFAULT NULL,
                       filename varchar(100) NOT NULL,
                       startdate timestamp DEFAULT NULL,
                       enddate timestamp DEFAULT NULL
);

ALTER TABLE station DROP CONSTRAINT station_siteid_site_fkey;
ALTER TABLE station ADD FOREIGN KEY (siteid_site) REFERENCES site(siteid);
ALTER TABLE device DROP CONSTRAINT device_stationid_station_fkey;
ALTER TABLE device ADD FOREIGN KEY (stationid_station) REFERENCES station(stationid);
ALTER TABLE outlet DROP CONSTRAINT outlet_stationid_station_fkey;
ALTER TABLE outlet ADD FOREIGN KEY (stationid_station) REFERENCES station(stationid);
ALTER TABLE outlet DROP CONSTRAINT outlet_deviceid_device_fkey;
ALTER TABLE outlet ADD FOREIGN KEY (deviceid_device) REFERENCES device(deviceid);
ALTER TABLE module DROP CONSTRAINT module_deviceid_device_fkey;
ALTER TABLE module ADD FOREIGN KEY (deviceid_device) REFERENCES device(deviceid);
ALTER TABLE sensor DROP CONSTRAINT sensor_moduleid_module_fkey;
ALTER TABLE sensor ADD FOREIGN KEY (moduleid_module) REFERENCES module(moduleid);



