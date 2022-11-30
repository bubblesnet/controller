CREATE TABLE seed
(
    seedid SERIAL PRIMARY KEY,
    seedbreed VARCHAR(1024) NOT NULL,
    seed_url VARCHAR(1024) NULL,
    source VARCHAR(1024) NOT NULL
);

CREATE TABLE crop
(
    cropid SERIAL PRIMARY KEY,
    stationid_Station  INT  NOT NULL,
    startdatetime_millis  BIGINT NOT NULL,
    FOREIGN KEY (stationid_Station) REFERENCES "station" (stationid)
);

CREATE TABLE plant
(
    plantid SERIAL PRIMARY KEY,
    seedid_Seed  INT  NOT NULL,
    cropid_Crop  INT  NOT NULL,
    FOREIGN KEY (cropid_Crop) REFERENCES "crop" (cropid),
    FOREIGN KEY (seedid_seed) REFERENCES "seed" (seedid)
);

