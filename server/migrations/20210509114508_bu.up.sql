ALTER TABLE event ADD COLUMN value_name VARCHAR(100);
ALTER TABLE event ADD COLUMN siteid_site int;
ALTER TABLE event ADD COLUMN stationid_station int;
ALTER TABLE event ADD FOREIGN KEY (siteid_site) REFERENCES site(siteid);
ALTER TABLE event ADD FOREIGN KEY (stationid_station) REFERENCES station(stationid);
ALTER TABLE station ADD COLUMN light_sensor_external bool default False;