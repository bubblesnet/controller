update station set voc_sensor=true;
update station set co2_sensor=true;

CREATE OR REPLACE FUNCTION public."InitializeVOCCO2Sensors"()
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE
AS $BODY$

DECLARE
    new_moduleid int := -1;
BEGIN

INSERT INTO module (module_name, deviceid_device, container_name, module_type, i2caddress, protocol)
VALUES ('CO2/VOC sensor',70000008,'sense-go','ccs811','0x5a', 'i2c') RETURNING moduleid into new_moduleid;

INSERT INTO sensor (sensor_name, moduleid_module, measurement_name)
VALUES
    ('voc_sensor',new_moduleid,'voc') ,
    ('co2_sensor',new_moduleid,'co2');

RETURN 0;

END;
$BODY$;

SELECT public."InitializeVOCCO2Sensors"();