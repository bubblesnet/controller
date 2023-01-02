
update contact set firstname='' where firstname is null;
ALTER TABLE contact ALTER COLUMN firstname SET DEFAULT '';
ALTER TABLE contact ALTER COLUMN firstname SET NOT NULL;

update contact set lastname='' where lastname is null;
ALTER TABLE contact ALTER COLUMN lastname SET DEFAULT '';
ALTER TABLE contact ALTER COLUMN lastname SET NOT NULL;

update contact set email='' where email is null;
ALTER TABLE contact ALTER COLUMN email SET DEFAULT '';
ALTER TABLE contact ALTER COLUMN email SET NOT NULL;

update contact set subject='' where subject is null;
ALTER TABLE contact ALTER COLUMN subject SET DEFAULT '';
ALTER TABLE contact ALTER COLUMN subject SET NOT NULL;

update contact set contactmessage='' where contactmessage is null;
ALTER TABLE contact ALTER COLUMN contactmessage SET DEFAULT '';
ALTER TABLE contact ALTER COLUMN contactmessage SET NOT NULL;

update device set picamera=false where picamera is null;
ALTER TABLE device ALTER COLUMN picamera SET DEFAULT false;
ALTER TABLE device ALTER COLUMN picamera SET NOT NULL;

update device set picamera_resolutionx=1024 where picamera_resolutionx is null;
ALTER TABLE device ALTER COLUMN picamera_resolutionx SET DEFAULT 1024;
ALTER TABLE device ALTER COLUMN picamera_resolutionx SET NOT NULL;

update device set picamera_resolutiony=1024 where picamera_resolutiony is null;
ALTER TABLE device ALTER COLUMN picamera_resolutiony SET DEFAULT 1024;
ALTER TABLE device ALTER COLUMN picamera_resolutiony SET NOT NULL;

update device set usbcamera=false where usbcamera is null;
ALTER TABLE device ALTER COLUMN usbcamera SET DEFAULT false;
ALTER TABLE device ALTER COLUMN usbcamera SET NOT NULL;

update devicetype set manufacturer='' where manufacturer is null;
ALTER TABLE devicetype ALTER COLUMN manufacturer SET DEFAULT '';
ALTER TABLE devicetype ALTER COLUMN manufacturer SET NOT NULL;

update devicetype set useragent='' where useragent is null;
ALTER TABLE devicetype ALTER COLUMN useragent SET DEFAULT '';
ALTER TABLE devicetype ALTER COLUMN useragent SET NOT NULL;

update devicetype set device='' where device is null;
ALTER TABLE devicetype ALTER COLUMN device SET DEFAULT '';
ALTER TABLE devicetype ALTER COLUMN device SET NOT NULL;

update devicetype set product='' where product is null;
ALTER TABLE devicetype ALTER COLUMN product SET DEFAULT '';
ALTER TABLE devicetype ALTER COLUMN product SET NOT NULL;

update devicetype set brand='' where brand is null;
ALTER TABLE devicetype ALTER COLUMN brand SET DEFAULT '';
ALTER TABLE devicetype ALTER COLUMN brand SET NOT NULL;

update devicetype set display='' where display is null;
ALTER TABLE devicetype ALTER COLUMN display SET DEFAULT '';
ALTER TABLE devicetype ALTER COLUMN display SET NOT NULL;

update devicetype set fingerprint='' where fingerprint is null;
ALTER TABLE devicetype ALTER COLUMN fingerprint SET DEFAULT '';
ALTER TABLE devicetype ALTER COLUMN fingerprint SET NOT NULL;

update devicetype set board='' where board is null;
ALTER TABLE devicetype ALTER COLUMN board SET DEFAULT '';
ALTER TABLE devicetype ALTER COLUMN board SET NOT NULL;

update devicetype set hardware='' where hardware is null;
ALTER TABLE devicetype ALTER COLUMN hardware SET DEFAULT '';
ALTER TABLE devicetype ALTER COLUMN hardware SET NOT NULL;

update module set protocol='' where protocol is null;
ALTER TABLE module ALTER COLUMN protocol SET DEFAULT '';
ALTER TABLE module ALTER COLUMN protocol SET NOT NULL;

update public.user set timezone=-5.0 where timezone is null;
ALTER TABLE public.user ALTER COLUMN timezone SET DEFAULT -5.0;

ALTER TABLE public.user RENAME COLUMN timezone TO timezone_offset;
ALTER TABLE public.user ADD COLUMN timezone VARCHAR(255) NOT NULL DEFAULT 'America/New_York';

