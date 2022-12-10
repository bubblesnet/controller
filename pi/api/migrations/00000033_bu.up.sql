update station set voc_sensor=true;
update station set co2_sensor=true;

CREATE OR REPLACE FUNCTION public."InitializeDispensers"()
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE
AS $BODY$

DECLARE
    new_additiveid int := -1;
    deviceid int := 70000008;
    stationid int := 1;
    additive_name varchar(255);
BEGIN
    DELETE FROM dispenser;
    DELETE FROM additive;

    ALTER SEQUENCE dispenser_dispenserid_seq RESTART WITH 1;
    ALTER SEQUENCE additive_additiveid_seq RESTART WITH 1;

    additive_name := 'Tap Water';
    INSERT INTO additive (manufacturer_name, additive_name, spec_url, is_pgr) VALUES ( 'Town of Scituate', additive_name, '', false ) RETURNING additiveid into new_additiveid;
    INSERT INTO dispenser (deviceid_Device, stationid_Station, dispenser_name, currently_loaded_additiveid, index, bcm_pin_number, onoff) VALUES(deviceid, stationid, additive_name, new_additiveid, 0, 25, false);

    additive_name = 'pH Up';
    INSERT INTO additive (manufacturer_name, additive_name, spec_url, is_pgr) VALUES ( 'General Hydroponics', 'pH Up', 'https://generalhydroponics.com/products/ph-up-liquid/', false ) RETURNING additiveid into new_additiveid;
    INSERT INTO dispenser (deviceid_Device, stationid_Station, dispenser_name, currently_loaded_additiveid, index, bcm_pin_number, onoff) VALUES (deviceid, stationid, additive_name, new_additiveid, 1, 5, false);

    additive_name = 'pH Down';
    INSERT INTO additive (manufacturer_name, additive_name, spec_url, is_pgr) VALUES ( 'General Hydroponics', additive_name, 'https://generalhydroponics.com/products/ph-down-liquid/', false ) RETURNING additiveid into new_additiveid;
    INSERT INTO dispenser (deviceid_Device, stationid_Station, dispenser_name, currently_loaded_additiveid, index, bcm_pin_number, onoff) VALUES ( deviceid, stationid, additive_name, new_additiveid, 2, 6, false);

    additive_name := 'FloraGro';
    INSERT INTO additive (manufacturer_name, additive_name, spec_url, is_pgr) VALUES ( 'General Hydroponics', additive_name, 'https://generalhydroponics.com/products/flora-series/floragro/', false ) RETURNING additiveid into new_additiveid;
    INSERT INTO dispenser (deviceid_Device, stationid_Station, dispenser_name, currently_loaded_additiveid, index, bcm_pin_number, onoff) VALUES(deviceid, stationid, additive_name, new_additiveid, 3, 9, false);

    additive_name := 'FloraMicro';
    INSERT INTO additive (manufacturer_name, additive_name, spec_url, is_pgr) VALUES ( 'General Hydroponics', additive_name, 'https://generalhydroponics.com/products/flora-series/floramicro/', false ) RETURNING additiveid into new_additiveid;
    INSERT INTO dispenser (deviceid_Device, stationid_Station, dispenser_name, currently_loaded_additiveid, index, bcm_pin_number, onoff) VALUES(deviceid, stationid, additive_name, new_additiveid, 4, 10, false);

    additive_name = 'FloraBloom';
    INSERT INTO additive (manufacturer_name, additive_name, spec_url, is_pgr) VALUES ( 'General Hydroponics', additive_name, 'https://generalhydroponics.com/products/flora-series/florabloom/', false ) RETURNING additiveid into new_additiveid;
    INSERT INTO dispenser (deviceid_Device, stationid_Station, dispenser_name, currently_loaded_additiveid, index, bcm_pin_number, onoff) VALUES(deviceid, stationid, additive_name, new_additiveid, 5, 11, false);

    additive_name = 'RapidStart';
    INSERT INTO additive (manufacturer_name, additive_name, spec_url, is_pgr) VALUES ( 'General Hydroponics', additive_name, 'https://generalhydroponics.com/products/rapidstart/', false ) RETURNING additiveid into new_additiveid;
    INSERT INTO dispenser (deviceid_Device, stationid_Station, dispenser_name, currently_loaded_additiveid, index, bcm_pin_number, onoff) VALUES(deviceid, stationid, additive_name, new_additiveid, 6, 7, false);

    additive_name = 'Liquid KoolBloom';
    INSERT INTO additive (manufacturer_name, additive_name, spec_url, is_pgr) VALUES ( 'General Hydroponics', additive_name, 'https://generalhydroponics.com/products/liquid-koolbloom/', false ) RETURNING additiveid into new_additiveid;
    INSERT INTO dispenser (deviceid_Device, stationid_Station, dispenser_name, currently_loaded_additiveid, index, bcm_pin_number, onoff) VALUES (deviceid, stationid, additive_name, new_additiveid, 7, 8, false);

    additive_name = 'Floralicious Plus';
    INSERT INTO additive (manufacturer_name, additive_name, spec_url, is_pgr) VALUES ( 'General Hydroponics', additive_name, 'https://generalhydroponics.com/products/floralicious-plus/', false ) RETURNING additiveid into new_additiveid;
    INSERT INTO dispenser (deviceid_Device, stationid_Station, dispenser_name, currently_loaded_additiveid, index, bcm_pin_number, onoff) VALUES (deviceid, stationid, additive_name, new_additiveid, 8, 14, false);


    RETURN 0;

END;

$BODY$;

SELECT public."InitializeDispensers"();