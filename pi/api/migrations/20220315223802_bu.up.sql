CREATE TABLE displaysettings
(
    displaysettingsid  SERIAL PRIMARY KEY,
    userid_User        int          NOT NULL,
    units              varchar(255) NOT NULL DEFAULT 'METRIC',
    language           varchar(255) NOT NULL DEFAULT 'en-us',
    theme              varchar(255) NOT NULL DEFAULT '',
    current_font       varchar(255) NOT NULL DEFAULT 'Aclonica',
    light_units        varchar(255) NOT NULL DEFAULT 'lux',
    tub_volume_units   varchar(255) NOT NULL DEFAULT 'gallons',
    tub_depth_units    varchar(255) NOT NULL DEFAULT 'inches',
    plant_height_units varchar(255) NOT NULL DEFAULT 'inches',
    humidity_units     varchar(255) NOT NULL DEFAULT '%',
    temperature_units  varchar(255) NOT NULL DEFAULT 'F',
    pressure_units     varchar(255) NOT NULL DEFAULT 'hPa',
    FOREIGN KEY (userid_User) REFERENCES "user" (userid)
);
