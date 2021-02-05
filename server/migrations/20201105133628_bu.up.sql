ALTER TABLE devicetype DISABLE KEYS;
INSERT INTO devicetype VALUES (0,'emulator','','','','android','emulator','','','',NULL,NULL);
ALTER TABLE devicetype ENABLE KEYS;

ALTER TABLE registrationcode DISABLE KEYS;
INSERT INTO registrationcode VALUES (1,'0101010101',90000009,70000007,0,NULL);
ALTER TABLE registrationcode ENABLE KEYS;