CREATE OR REPLACE FUNCTION public."InitializeWaterTemp"()
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE
AS $BODY$

DECLARE
    new_moduleid int := -1;
    new_sensorid int := -1;
    new_deviceid int := 70000008;

BEGIN

    INSERT INTO module (module_name, deviceid_device, container_name, module_type, i2caddress, protocol)
    VALUES ('DS18B20', new_deviceid ,'sense-go','DS18B20','0x00','one-wire') RETURNING moduleid into new_moduleid;

    INSERT INTO sensor (sensor_name, moduleid_module, measurement_name)
    VALUES
        ('thermometer_water',new_moduleid,'temp_water') RETURNING sensorid into new_sensorid;

    RETURN 0;
END;
$BODY$;

SELECT public."InitializeWaterTemp"();
