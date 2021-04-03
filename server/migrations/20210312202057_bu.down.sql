ALTER TABLE device DROP COLUMN picamera;
ALTER TABLE device DROP COLUMN picamera_resolutionx;
ALTER TABLE device DROP COLUMN picamera_resolutiony;
ALTER TABLE device DROP COLUMN usbcamera;

ALTER TABLE cabinet ADD COLUMN camera_picamera bool DEFAULT false;
ALTER TABLE cabinet ADD COLUMN camera_resolutionx int NULL;
ALTER TABLE cabinet ADD COLUMN camera_resolutiony int NULL;