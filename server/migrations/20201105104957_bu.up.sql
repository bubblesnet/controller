--
-- Table structure for table user
--

CREATE TABLE "user" (
                        userid serial primary key,
                        firstname varchar(20) NOT NULL,
                        lastname varchar(20) NOT NULL,
                        email varchar(100) NOT NULL,
                        passwordhash varchar(300) NOT NULL,
                        username varchar(100) DEFAULT NULL,
                        created timestamp DEFAULT NULL,
                        deleted timestamp DEFAULT NULL,
                        timezone float8 DEFAULT NULL,
                        provisioned timestamp DEFAULT NULL,
                        passwordsalt int4 DEFAULT NULL,
                        mobilenumber varchar(45) DEFAULT NULL
);

--
-- Table structure for table devicetype
--
CREATE TABLE devicetype (
                            devicetypeid SERIAL PRIMARY KEY,
                            devicetypename varchar(100) NOT NULL,
                            useragent varchar(200) DEFAULT NULL,
                            device varchar(45) DEFAULT NULL,
                            product varchar(45) DEFAULT NULL,
                            manufacturer varchar(45) DEFAULT NULL,
                            model varchar(45) DEFAULT NULL,
                            brand varchar(45) DEFAULT NULL,
                            display varchar(200) DEFAULT NULL,
                            fingerprint varchar(200) DEFAULT NULL,
                            board varchar(45) DEFAULT NULL,
                            hardware varchar(45) DEFAULT NULL
);

--
-- Table structure for table device
--
CREATE TABLE device
(
    deviceid                serial primary key,
    created                 timestamp NOT NULL,
    lastseen                timestamp DEFAULT NULL,
    devicename    varchar(255),
    userid_User             int       NOT NULL,
    devicetypeid_DeviceType int       NOT NULL,
    FOREIGN KEY (userid_User) REFERENCES "user" (userid),
    FOREIGN KEY (devicetypeid_DeviceType) REFERENCES devicetype (devicetypeid)
);

--
-- Table structure for table event
--
CREATE TABLE event (
                       eventid SERIAL PRIMARY KEY,
                       userid_User int NOT NULL,
                       deviceid_Device int NOT NULL,
                       datetimemillis bigint NOT NULL,
                       type varchar(256) NOT NULL,
                       message varchar(256) NOT NULL,
                       filename varchar(256) NOT NULL,
                       subeventdatemillis bigint DEFAULT NULL,
                       floatvalue float8 DEFAULT NULL,
                       intvalue int DEFAULT NULL,
                       stringvalue varchar(256) DEFAULT NULL,
                       textvalue text,
                       rawjson text NOT NULL,
                       time bigint DEFAULT NULL,
                       FOREIGN KEY (userid_User) REFERENCES "user" (userid),
                       FOREIGN KEY (deviceid_Device) REFERENCES device (deviceid)
);

--
-- Table structure for table alertcondition
--
CREATE TABLE alertcondition (
                                alertconditionid SERIAL PRIMARY KEY,
                                shortmessage varchar(255) NOT NULL,
                                longmessage text,
                                userid_User int NOT NULL,
                                deviceid_Device int NOT NULL,
                                triggered_datetimemillis bigint NOT NULL,
                                remedied_datetimemillis bigint DEFAULT NULL,
                                eventid_Event int DEFAULT NULL,
                                FOREIGN KEY (userid_User) REFERENCES "user" (userid),
                                FOREIGN KEY (deviceid_Device) REFERENCES device (deviceid),
                                FOREIGN KEY (eventid_Event) REFERENCES event (eventid)
);

--
-- Table structure for table contact
--
CREATE TABLE contact (
                         contactid SERIAL PRIMARY KEY,
                         firstname varchar(100) DEFAULT NULL,
                         lastname varchar(100) DEFAULT NULL,
                         email varchar(100) DEFAULT NULL,
                         subject varchar(100) DEFAULT NULL,
                         contactmessage varchar(1024) DEFAULT NULL,
                         datecreated timestamp NULL DEFAULT NULL
);

--
-- Table structure for table currentevent
--
CREATE TABLE currentevent (
                              userid_User int NOT NULL,
                              deviceid_Device int NOT NULL,
                              datetimemillis bigint NOT NULL,
                              type varchar(256) NOT NULL,
                              message varchar(256) NOT NULL,
                              filename varchar(256) NOT NULL,
                              subeventdatemillis bigint DEFAULT NULL,
                              floatvalue float8 DEFAULT NULL,
                              intvalue int DEFAULT NULL,
                              stringvalue varchar(256) NOT NULL,
                              textvalue text,
                              rawjson text NOT NULL,
                              time bigint DEFAULT NULL,
                              PRIMARY KEY (userid_User,deviceid_Device,type,stringvalue),
                              FOREIGN KEY (userid_User) REFERENCES "user" (userid),
                              FOREIGN KEY (deviceid_Device) REFERENCES device (deviceid)
);

--
-- Table structure for table faq
--
CREATE TABLE faq (
                     faqid SERIAL PRIMARY KEY,
                     displayorder int DEFAULT NULL,
                     question varchar(256) DEFAULT NULL,
                     answer varchar(2048) DEFAULT NULL
);

--
-- Table structure for table location
--
CREATE TABLE location (
                          locationid SERIAL PRIMARY KEY,
                          userid_User int NOT NULL,
                          deviceid_Device int NOT NULL,
                          eventdatemillis bigint NOT NULL,
                          accuracy float8 NOT NULL,
                          altitude float8 NOT NULL,
                          bearing float8 NOT NULL,
                          latitude float8 NOT NULL,
                          longitude float8 NOT NULL,
                          provider varchar(45) NOT NULL,
                          speed float8 NOT NULL,
                          hasAccuracy int NOT NULL,
                          hasAltitude int NOT NULL,
                          hasBearing int NOT NULL,
                          hasSpeed int NOT NULL,
                          gpstime bigint NOT NULL,
                          filename varchar(256) NOT NULL,
                          FOREIGN KEY (userid_User) REFERENCES "user" (userid),
                          FOREIGN KEY (deviceid_Device) REFERENCES device (deviceid)
);

--
-- Table structure for table notification
--
CREATE TABLE notification (
                              notificationid SERIAL PRIMARY KEY,
                              alertconditionid_Alertcondition int DEFAULT NULL,
                              userid_User int NOT NULL,
                              datetimemillis bigint DEFAULT NULL,
                              email_required bit(1) NOT NULL DEFAULT b'0',
                              email_recipient varchar(255) DEFAULT NULL,
                              email_sent bit(1) NOT NULL DEFAULT b'0',
                              sms_required bit(1) DEFAULT b'0',
                              sms_recipient varchar(255) DEFAULT NULL,
                              sms_sent bit(1) NOT NULL DEFAULT b'0',
                              viewedonwebui bit(1) NOT NULL DEFAULT b'0',
                              FOREIGN KEY (alertconditionid_Alertcondition) REFERENCES alertcondition (alertconditionid),
                              FOREIGN KEY (userid_User) REFERENCES "user" (userid)
 );

--
-- Table structure for table registrationcode
--
CREATE TABLE registrationcode (
                                  registrationcodeid SERIAL PRIMARY KEY,
                                  registrationcode varchar(10) NOT NULL,
                                  userid_User int NOT NULL,
                                  deviceid_Device int DEFAULT NULL,
                                  createdatemillis bigint NOT NULL,
                                  usedatemillis bigint DEFAULT NULL,
                                  FOREIGN KEY (userid_User) REFERENCES "user" (userid),
                                  FOREIGN KEY (deviceid_Device) REFERENCES device (deviceid)
);

--
-- Table structure for table strip
--

CREATE TABLE strip (
                       stripid SERIAL PRIMARY KEY,
                       userid_User int NOT NULL,
                       deviceid_Device int NOT NULL,
                       startdatemillis bigint NOT NULL,
                       enddatemillis bigint NOT NULL,
                       createdatemillis bigint NOT NULL,
                       supersededby_stripid int DEFAULT NULL,
                       filename varchar(100) NOT NULL,
                       startdate timestamp DEFAULT NULL,
                       enddate timestamp DEFAULT NULL
);

--
-- Table structure for table usersettings
--

CREATE TABLE usersettings (
                              usersettingsid SERIAL PRIMARY KEY,
                              userid_User int NOT NULL,
                              useemailforsecurity bit(1) NOT NULL DEFAULT b'0',
                              usesmsforsecurity bit(1) NOT NULL DEFAULT b'0',
                              useemailforplantprogress bit(1) NOT NULL DEFAULT b'0',
                              usesmsforplantprogress bit(1) NOT NULL DEFAULT b'0',
                              useemailformaintenancerequired bit(1) NOT NULL DEFAULT b'0',
                              usesmsformaintenancerequired bit(1) NOT NULL DEFAULT b'0',
                              useemailforinformation bit(1) NOT NULL DEFAULT b'0',
                              usesmsforinformation bit(1) NOT NULL DEFAULT b'0',
                              FOREIGN KEY (userid_User) REFERENCES "user" (userid)
 );
