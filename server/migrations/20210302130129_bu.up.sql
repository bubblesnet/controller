ALTER TABLE cabinet ADD COLUMN height_sensor bool DEFAULT false;
ALTER TABLE cabinet ADD COLUMN automatic_control bool DEFAULT true;
ALTER TABLE device ADD COLUMN cabinetid_cabinet int NULL;
ALTER TABLE device ADD FOREIGN KEY (cabinetid_Cabinet) REFERENCES "cabinet" (cabinetid);
ALTER TABLE device ADD COLUMN log_level varchar(255) DEFAULT 'warn,error,info,silly,debug,fatal';