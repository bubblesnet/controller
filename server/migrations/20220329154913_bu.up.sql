ALTER TABLE station ADD COLUMN current_stage varchar(255) NOT NULL DEFAULT 'idle';
ALTER TABLE automationsettings ADD COLUMN stage_name varchar(255) NOT NULL DEFAULT 'idle';
ALTER TABLE automationsettings DROP COLUMN current_stage;
