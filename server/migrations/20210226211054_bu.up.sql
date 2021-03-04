

CREATE TABLE cabinet
(
    cabinetid                              SERIAL PRIMARY KEY,
    userid_User                            int          NOT NULL,
    controller_hostname                    varchar(255) NULL,
    controller_api_port                    integer      NULL,
    stage                                  varchar(80)  NULL,
    light_on_hour                          integer      NULL,

    tamper_xmove                           float8      DEFAULT NULL,
    tamper_ymove                           float8      DEFAULT NULL,
    tamper_zmove                           float8      DEFAULT NULL,

    time_between_pictures_in_seconds       integer      NULL,

    camera_picamera                        boolean,
    camera_resolutionX                     integer      NULL,
    camera_resolutionY                     integer      NULL,

    time_between_sensor_polling_in_seconds integer,

    humidifier                             boolean,
    humidity_sensor_internal               boolean,
    humidity_sensor_external               boolean,
    heater                                 boolean,
    thermometer_top                        boolean,
    thermometer_middle                     boolean,
    thermometer_bottom                     boolean,
    thermometer_external                   boolean,
    thermometer_water                      boolean,
    water_pump                             boolean,
    air_pump                               boolean,
    light_sensor_internal                  boolean,
    cabinet_door_sensor                    boolean,
    outer_door_sensor                      boolean,
    movement_sensor                        boolean,
    pressure_sensors                       boolean,
    root_ph_sensor                         boolean,
    enclosure_type                         varchar(80) default 'CABINET',
    water_level_sensor                     boolean,
    tub_depth                              float8      DEFAULT NULL,
    tub_volume                             float8      DEFAULT NULL,
    intake_fan                             boolean,
    exhaust_fan                            boolean,
    heat_lamp                              boolean,
    heating_pad                            boolean,
    light_bloom                            boolean,
    light_vegetative                       boolean,
    light_germinate                        boolean,

    FOREIGN KEY (userid_User) REFERENCES "user" (userid)

);



CREATE TABLE outlet
(
    outletid          SERIAL PRIMARY KEY,
    cabinetid_Cabinet int          NOT NULL,
    deviceid_Device   int          NOT NULL,
    name              varchar(255) NOT NULL,
    index             integer      NOT NULL,
    bcm_pin_number    integer      NOT NULL,
    onoff             bool,
    FOREIGN KEY (cabinetid_Cabinet) REFERENCES "cabinet" (cabinetid),
    FOREIGN KEY (deviceid_Device) REFERENCES "device" (deviceid)
);


