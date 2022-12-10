ALTER TABLE device DROP COLUMN latest_picture_filename;
ALTER TABLE device DROP COLUMN latest_picture_datetimemillis;

ALTER TABLE sensor DROP COLUMN latest_calibration_datetimemillis;

DROP TABLE growlog;
