ALTER TABLE device ADD COLUMN picamera bool DEFAULT false;
ALTER TABLE device ADD COLUMN picamera_resolutionx int DEFAULT 0;
ALTER TABLE device ADD COLUMN picamera_resolutiony int DEFAULT 0;
ALTER TABLE device ADD COLUMN usbcamera bool DEFAULT false;

ALTER TABLE cabinet DROP COLUMN camera_picamera;
ALTER TABLE cabinet DROP COLUMN camera_resolutionx;
ALTER TABLE cabinet DROP COLUMN camera_resolutiony;

