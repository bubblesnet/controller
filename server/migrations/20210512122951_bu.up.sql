ALTER TABLE sensor DROP CONSTRAINT sensor_moduleid_module_fkey;
ALTER TABLE sensor ADD FOREIGN KEY (moduleid_module) REFERENCES module(moduleid) ON DELETE CASCADE;
ALTER TABLE module DROP CONSTRAINT module_deviceid_device_fkey;
ALTER TABLE module ADD FOREIGN KEY (deviceid_device) REFERENCES device(deviceid) ON DELETE CASCADE;
ALTER TABLE outlet DROP CONSTRAINT outlet_deviceid_device_fkey;
ALTER TABLE outlet ADD FOREIGN KEY (deviceid_device) REFERENCES device(deviceid) ON DELETE SET NULL;
ALTER TABLE outlet DROP CONSTRAINT outlet_stationid_station_fkey;
ALTER TABLE outlet ADD FOREIGN KEY (stationid_station) REFERENCES station(stationid) ON DELETE SET NULL;
ALTER TABLE device DROP CONSTRAINT device_stationid_station_fkey;
ALTER TABLE device ADD FOREIGN KEY (stationid_station) REFERENCES station(stationid) ON DELETE SET NULL;
ALTER TABLE station DROP CONSTRAINT station_siteid_site_fkey;
ALTER TABLE station ADD FOREIGN KEY (siteid_site) REFERENCES site(siteid) ON DELETE CASCADE;

DROP TABLE strip;
DROP TABLE location;
DROP TABLE faq;
