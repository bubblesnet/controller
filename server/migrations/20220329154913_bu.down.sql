ALTER TABLE station DROP COLUMN;
ALTER TABLE automationsettings DROP COLUMN stage_name;
ALTER TABLE automationsettings ADD COLUMN current_stage VARCHAR(255) NOT NULL DEFAULT '';