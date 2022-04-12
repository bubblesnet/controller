ALTER TABLE cabinet RENAME TO station;

ALTER TABLE station RENAME COLUMN cabinetid TO stationid;
ALTER TABLE station RENAME CONSTRAINT cabinet_pkey TO station_pkey;
ALTER TABLE station RENAME CONSTRAINT cabinet_userid_user_fkey TO station_userid_user_fkey;

ALTER TABLE device RENAME COLUMN cabinetid_cabinet TO stationid_station;
ALTER TABLE device RENAME CONSTRAINT device_cabinetid_cabinet_fkey TO device_stationid_station_fkey;
ALTER TABLE outlet RENAME COLUMN cabinetid_cabinet TO stationid_station;
ALTER TABLE outlet RENAME CONSTRAINT outlet_cabinetid_cabinet_fkey TO outlet_stationid_station_fkey;

CREATE TABLE site
(
    siteid          SERIAL PRIMARY KEY,
    sitename              varchar(255) NOT NULL
);

ALTER TABLE station add column siteid_site INT NULL;
ALTER TABLE station ADD FOREIGN KEY (siteid_site) REFERENCES site(siteid);
ALTER TABLE station RENAME COLUMN cabinet_door_sensor TO station_door_sensor;
