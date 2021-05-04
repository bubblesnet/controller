ALTER TABLE station RENAME COLUMN station_door_sensor TO cabinet_door_sensor;
ALTER TABLE station DROP CONSTRAINT siteid_site;
ALTER TABLE station DROP column siteid_site;
DROP TABLE site;
ALTER TABLE outlet RENAME CONSTRAINT outlet_stationid_station_fkey TO outlet_cabinetid_cabinet_fkey;
ALTER TABLE outlet RENAME COLUMN stationid_station TO cabinetid_cabinet;
ALTER TABLE device RENAME CONSTRAINT device_stationid_station_fkey TO device_cabinetid_cabinet_fkey;
ALTER TABLE device RENAME COLUMN stationid_station TO cabinetid_cabinet;
ALTER TABLE station RENAME CONSTRAINT station_userid_user_fkey TO cabinet_userid_user_fkey;
ALTER TABLE station RENAME CONSTRAINT station_pkey TO cabinet_pkey;
ALTER TABLE station RENAME COLUMN stationid TO cabinetid;
ALTER TABLE station RENAME TO cabinet;