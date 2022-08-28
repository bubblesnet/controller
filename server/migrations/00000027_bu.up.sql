update device set picamera=true, picamera_resolutionx=2592, picamera_resolutiony=1944 where deviceid = 70000008;
update sensor set measurement_name='light_external' where sensor_name='light_sensor' AND
        moduleid_module in (select moduleid from module where deviceid_device=70000005);