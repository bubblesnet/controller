-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: Bubbles
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.10.1
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO,ANSI' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table user
--

DROP TABLE IF EXISTS "user";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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

DROP TABLE IF EXISTS devicetype;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table device
--

DROP TABLE IF EXISTS device;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE device (
                        deviceid serial primary key,
                        created timestamp NOT NULL,
                        lastseen timestamp DEFAULT NULL,
                        userid_User int NOT NULL,
                        devicetypeid_DeviceType int NOT NULL,
                        imei varchar(45) DEFAULT NULL,
                        serial varchar(45) DEFAULT NULL,
                        androidid varchar(45) DEFAULT NULL,
                        osversion varchar(45) DEFAULT NULL,
                        versionincremental varchar(45) DEFAULT NULL,
                        sdk varchar(45) DEFAULT NULL,
                        FOREIGN KEY (userid_User) REFERENCES "user" (userid),
                        FOREIGN KEY (devicetypeid_DeviceType) REFERENCES DeviceType (devicetypeid)
/*                          CONSTRAINT device_ibfk_1 FOREIGN KEY (userid_User) REFERENCES user) REFERENCES XX (userid),
                          CONSTRAINT device_ibfk_2 FOREIGN KEY (devicetypeid_DeviceType) REFERENCES devicetype) REFERENCES XX (devicetypeid)
 */
);
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table event
--

DROP TABLE IF EXISTS event;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
                       FOREIGN KEY (deviceid_Device) REFERENCES Device (deviceid)
    /*
    KEY (IDX_latesteventbytypestring) REFERENCES XX (userid_User,deviceid_Device,datetimemillis,type,stringvalue,eventid),
    KEY (IDX_latestevent) REFERENCES XX (eventid,datetimemillis,userid_User,deviceid_Device),
    CONSTRAINT event_ibfk_1 FOREIGN KEY (userid_User) REFERENCES user) REFERENCES XX (userid),
    CONSTRAINT event_ibfk_2 FOREIGN KEY (deviceid_Device) REFERENCES device) REFERENCES XX (deviceid)

     */
);
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table alertcondition
--

DROP TABLE IF EXISTS alertcondition;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
                                FOREIGN KEY (deviceid_Device) REFERENCES Device (deviceid),
                                FOREIGN KEY (eventid_Event) REFERENCES Event (eventid)
    /*
CONSTRAINT fk_idx_eventid FOREIGN KEY (eventid_Event) REFERENCES event) REFERENCES XX (eventid) ON DELETE NO ACTION ON UPDATE NO ACTION,
CONSTRAINT fk_idx_userid FOREIGN KEY (userid_User) REFERENCES user) REFERENCES XX (userid) ON DELETE NO ACTION ON UPDATE NO ACTION,
CONSTRAINT ik_idx_deviceid FOREIGN KEY (deviceid_Device) REFERENCES device) REFERENCES XX (deviceid) ON DELETE NO ACTION ON UPDATE NO ACTION
*/
);

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table contact
--

DROP TABLE IF EXISTS contact;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE contact (
                         contactid SERIAL PRIMARY KEY,
                         firstname varchar(100) DEFAULT NULL,
                         lastname varchar(100) DEFAULT NULL,
                         email varchar(100) DEFAULT NULL,
                         subject varchar(100) DEFAULT NULL,
                         contactmessage varchar(1024) DEFAULT NULL,
                         datecreated timestamp NULL DEFAULT NULL
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table currentevent
--

DROP TABLE IF EXISTS currentevent;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
                              FOREIGN KEY (deviceid_Device) REFERENCES Device (deviceid)
/*                                KEY (IDX_latestcurrenteventbytypestring) REFERENCES XX (userid_User,deviceid_Device,datetimemillis,type,stringvalue),
                                KEY (IDX_latestcurrentevent) REFERENCES XX (datetimemillis,userid_User,deviceid_Device),
                                CONSTRAINT currentevent_ibfk_1 FOREIGN KEY (userid_User) REFERENCES user) REFERENCES "user" (userid),
                                CONSTRAINT currentevent_ibfk_2 FOREIGN KEY (deviceid_Device) REFERENCES device) REFERENCES XX (deviceid)
*/
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table faq
--

DROP TABLE IF EXISTS faq;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE faq (
                     faqid SERIAL PRIMARY KEY,
                     displayorder int DEFAULT NULL,
                     question varchar(256) DEFAULT NULL,
                     answer varchar(2048) DEFAULT NULL
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table location
--

DROP TABLE IF EXISTS location;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
                          FOREIGN KEY (deviceid_Device) REFERENCES Device (deviceid)
    /*
    CONSTRAINT location_ibfk_1 FOREIGN KEY (userid_User) REFERENCES user) REFERENCES XX (userid),
    CONSTRAINT location_ibfk_2 FOREIGN KEY (deviceid_Device) REFERENCES device) REFERENCES XX (deviceid)
     */
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table notification
--

DROP TABLE IF EXISTS notification;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
                              viewedonwebui bit(1) NOT NULL DEFAULT b'0'
    /*
KEY (fk_idx_notificationalertconditiond_idx) REFERENCES XX (alertconditionid_Alertcondition),
KEY (fk_idx_notificationuserid_idx) REFERENCES "user" (userid),
CONSTRAINT fk_idx_notificationalertconditiond FOREIGN KEY (alertconditionid_Alertcondition) REFERENCES alertcondition) REFERENCES XX (alertconditionid) ON DELETE NO ACTION ON UPDATE NO ACTION,
CONSTRAINT fk_idx_notificationuserid FOREIGN KEY (userid_User) REFERENCES user) REFERENCES XX (userid) ON DELETE NO ACTION ON UPDATE NO ACTION

     */
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table registrationcode
--

DROP TABLE IF EXISTS registrationcode;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE registrationcode (
                                  registrationcodeid SERIAL PRIMARY KEY,
                                  registrationcode varchar(10) NOT NULL,
                                  userid_User int NOT NULL,
                                  deviceid_Device int DEFAULT NULL,
                                  createdatemillis bigint NOT NULL,
                                  usedatemillis bigint DEFAULT NULL,
                                  FOREIGN KEY (userid_User) REFERENCES "user" (userid),
                                  FOREIGN KEY (deviceid_Device) REFERENCES Device (deviceid)
    /*
CONSTRAINT registrationcode_ibfk_1 FOREIGN KEY (userid_User) REFERENCES user) REFERENCES XX (userid),
CONSTRAINT registrationcode_ibfk_2 FOREIGN KEY (deviceid_Device) REFERENCES device) REFERENCES XX (deviceid)

     */
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table strip
--

DROP TABLE IF EXISTS strip;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
    /*
UNIQUE KEY (stripid_UNIQUE) REFERENCES XX (stripid),
UNIQUE KEY (filename_UNIQUE) REFERENCES XX (filename)

     */
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table usersettings
--

DROP TABLE IF EXISTS usersettings;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
                              usesmsforinformation bit(1) NOT NULL DEFAULT b'0'
    /*
UNIQUE KEY (usersettingsid_UNIQUE) REFERENCES XX (usersettingsid),
KEY (fk_idx_settingsuserid_idx) REFERENCES "user" (userid),
CONSTRAINT fk_idx_settingsuserid FOREIGN KEY (userid_User) REFERENCES user) REFERENCES XX (userid) ON DELETE NO ACTION ON UPDATE NO ACTION

     */
);
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


