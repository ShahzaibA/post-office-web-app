-- MySQL dump 10.13  Distrib 5.5.62, for Win32 (AMD64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.10.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cities`
--

DROP TABLE IF EXISTS `Cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cities` (
  `City_ID` int(11) NOT NULL AUTO_INCREMENT,
  `City_Name` varchar(24) DEFAULT NULL,
  PRIMARY KEY (`City_ID`),
  UNIQUE KEY `ID_UNIQUE` (`City_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cities`
--

LOCK TABLES `Cities` WRITE;
/*!40000 ALTER TABLE `Cities` DISABLE KEYS */;
INSERT INTO `Cities` VALUES (1,'Montgomery'),(2,'Houston'),(3,'Miami'),(4,'Albany'),(5,'Los Angeles'),(6,'Olympia'),(7,'Washington'),(8,'Santa Fe'),(9,'Juneau'),(10,'Phoenix'),(11,'Little Rock'),(12,'Denver'),(13,'Hartford'),(14,'Dover'),(15,'Tiflis'),(16,'Honolulu'),(17,'Boise'),(18,'Springfield'),(19,'Indianapolis'),(20,'Des Moines'),(21,'Topeka'),(22,'Francfort'),(23,'Baton Rouge'),(24,'Augusta'),(25,'Annapolis'),(26,'Boston'),(27,'Lansing'),(28,'Saint Paul'),(29,'Jackson'),(30,'Jefferson City'),(31,'Helena'),(32,'Lincoln'),(33,'Carson City'),(34,'Concord'),(35,'Trenton'),(36,'Raleigh'),(37,'Bismarck'),(38,'Columbus'),(39,'Oklahoma City'),(40,'Salem'),(41,'Harrisburg'),(42,'Providence'),(43,'Columbia'),(44,'Nashville'),(45,'Pierre'),(46,'Salt Lake City'),(47,'Montpelier'),(48,'Richmond'),(49,'Charleston'),(50,'Madison'),(51,'Cheyenne'),(52,'League City'),(53,'Missouri City'),(54,'Billings'),(55,'San Francisco'),(56,'Sacramento'),(57,'asfd'),(58,'aa'),(59,'not mo city'),(60,'Some City'),(61,'Austin');
/*!40000 ALTER TABLE `Cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Countries`
--

DROP TABLE IF EXISTS `Countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Countries` (
  `Country_ID` tinyint(4) NOT NULL,
  `Country_Name` varchar(24) DEFAULT NULL,
  `A2` char(2) DEFAULT NULL,
  `A3` char(3) DEFAULT NULL,
  `UN` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`Country_ID`),
  UNIQUE KEY `ID_UNIQUE` (`Country_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Countries`
--

LOCK TABLES `Countries` WRITE;
/*!40000 ALTER TABLE `Countries` DISABLE KEYS */;
INSERT INTO `Countries` VALUES (1,'United States',NULL,NULL,NULL);
/*!40000 ALTER TABLE `Countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FName` varchar(18) NOT NULL,
  `LName` varchar(18) NOT NULL,
  `Email` varchar(32) NOT NULL,
  `Hub_ID` int(11) NOT NULL,
  `JobTitles_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  KEY `fk_tEmployee_tHub1_idx` (`Hub_ID`),
  KEY `fk_tEmployee_tJobTitles1_idx` (`JobTitles_ID`),
  CONSTRAINT `fk_Employee_Hub` FOREIGN KEY (`Hub_ID`) REFERENCES `Hub` (`Hub_ID`),
  CONSTRAINT `fk_Employee_JobTitles` FOREIGN KEY (`JobTitles_ID`) REFERENCES `JobTitles` (`JobTitle_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
INSERT INTO `Employee` VALUES (6,'manF','manL','manager@email.com',9,1),(7,'driF','driL','driver@email.com',9,2),(8,'James','Harden','jamesharden@gmail.com',9,2),(9,'Chris','Dang','Chrisu@gmail.com',21,2),(10,'DRIVER','FAST','drivefast@gmail.com',47,2),(11,'Shahzaib','Ali','shahzaibsa98@gmail.com',15,1);
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `mydb`.`Employee_AFTER_INSERT` AFTER INSERT ON `Employee` FOR EACH ROW
BEGIN
	INSERT INTO EmployeeCredentials (Email, Password)
    VALUES (NEW.Email, concat(NEW.LName, NEW.FName, 'pass'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `EmployeeCredentials`
--

DROP TABLE IF EXISTS `EmployeeCredentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EmployeeCredentials` (
  `Employee_Credentials_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(32) NOT NULL,
  `Password` varchar(18) NOT NULL,
  PRIMARY KEY (`Employee_Credentials_ID`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  CONSTRAINT `Employee_Email` FOREIGN KEY (`Email`) REFERENCES `Employee` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EmployeeCredentials`
--

LOCK TABLES `EmployeeCredentials` WRITE;
/*!40000 ALTER TABLE `EmployeeCredentials` DISABLE KEYS */;
INSERT INTO `EmployeeCredentials` VALUES (1,'manager@email.com','password'),(2,'driver@email.com','password'),(3,'jamesharden@gmail.com','HardenJamespass'),(4,'Chrisu@gmail.com','DangChrispass'),(5,'drivefast@gmail.com','FASTDRIVERpass'),(6,'shahzaibsa98@gmail.com','AliShahzaibpass');
/*!40000 ALTER TABLE `EmployeeCredentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hub`
--

DROP TABLE IF EXISTS `Hub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hub` (
  `Hub_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Addr` varchar(32) NOT NULL,
  `City_ID` int(11) NOT NULL,
  `State_ID` smallint(6) NOT NULL,
  `Zip` int(11) NOT NULL,
  `Country_ID` tinyint(4) NOT NULL,
  PRIMARY KEY (`Hub_ID`),
  UNIQUE KEY `ID_UNIQUE` (`Hub_ID`),
  KEY `fk_tHub_tCity1_idx` (`City_ID`),
  KEY `fk_tHub_tState1_idx` (`State_ID`),
  KEY `fk_tHub_tCountry1_idx` (`Country_ID`),
  CONSTRAINT `fk_Hub_City` FOREIGN KEY (`City_ID`) REFERENCES `Cities` (`City_ID`),
  CONSTRAINT `fk_Hub_Country` FOREIGN KEY (`Country_ID`) REFERENCES `Countries` (`Country_ID`),
  CONSTRAINT `fk_Hub_State` FOREIGN KEY (`State_ID`) REFERENCES `States` (`State_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hub`
--

LOCK TABLES `Hub` WRITE;
/*!40000 ALTER TABLE `Hub` DISABLE KEYS */;
INSERT INTO `Hub` VALUES (9,'1239 Kirby St.',2,43,12345,1),(10,'6789 Chavez Dr.',3,9,67890,1),(11,'1098 White Speedway',1,1,67890,1),(12,'8674 Never Sleep Drive',4,32,10650,1),(13,'3549 Movies State St',5,5,10650,1),(14,'0985 Best Street',6,47,35468,1),(15,'3470 Llano Street',7,51,77095,1),(16,'9670 Llano Poblano Drive',8,31,90078,1),(17,'5678 Wuaya Drive',9,2,98765,1),(18,'1015 Thursday City Block',10,3,87654,1),(19,'5432 Monday Block',11,4,17762,1),(21,'2065 Friday Block',12,6,49051,1),(22,'4098 Happy Street',13,7,23678,1),(25,'1450 Super Happy Driveway',14,8,36301,1),(26,'7470 Super Sad Driveway',15,10,40975,1),(28,'7875 The Worst Street',16,11,71524,1),(29,'8513 The Party Corner',17,12,35467,1),(30,'6531 Viva la vida Dr.',18,13,56724,1),(31,'5690 Kirby Life Dr.',19,14,56724,1),(32,'9132 Simon Dr.',20,15,56540,1),(33,'3547 Simon Dr.',21,16,95347,1),(34,'7561 Pancho Dr.',22,17,65127,1),(35,'1289 Main Steet.',23,18,27589,1),(36,'3456 Not Main Steet.',24,19,98140,1),(37,'9478 Yes is Main Steet.',25,20,12840,1),(38,'1249 Super Stret',26,21,85630,1),(39,'8949 THE Stret',27,22,89998,1),(40,'8754 Umbrella Stret',28,23,99999,1),(41,'7419 the Lizard',29,24,11111,1),(42,'9090 Havasu Creek',30,25,11122,1),(43,'8080 Mosaic Stairway',31,26,44422,1),(44,'7070 Mosaic Valcony',32,27,44433,1),(45,'6006 The Valcony',33,28,88821,1),(46,'1111 Hawaii Place',34,29,55555,1),(47,'1122 Texas Palace',35,30,11655,1),(48,'5550 Kentocky Dream',36,33,66600,1),(49,'3009 Star Drive',37,34,70001,1),(50,'3119 Ohaio Drive',38,35,71111,1),(51,'9001 Daniel Street',39,36,80009,1),(52,'5009 Fernanda Drive',40,37,40609,1),(53,'5669 Leo Street',41,38,76609,1),(54,'7891 SQL Driveway',42,39,98888,1),(55,'9666 Builder Street',43,40,77777,1),(56,'1000 The 100 Street',44,41,55678,1),(57,'1200 Dixie DR.',45,42,80000,1),(58,'5000 Dad Drive',46,44,80892,1),(59,'3004 Mome is Home',47,45,34472,1),(60,'9807 Group 2 Speedway',48,46,50772,1),(61,'1010 Volcano Speedway',49,48,40767,1),(62,'1956 Meteorito Drive',50,49,78951,1),(64,'3030 Tornado Drive',51,50,65432,1);
/*!40000 ALTER TABLE `Hub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Invoice`
--

DROP TABLE IF EXISTS `Invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Invoice` (
  `Invoice_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Sender_ID` int(11) NOT NULL,
  `Price` decimal(10,2) unsigned NOT NULL,
  `Tender_ID` tinyint(4) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `PackageQuantity` tinyint(4) NOT NULL,
  PRIMARY KEY (`Invoice_ID`),
  UNIQUE KEY `ID_UNIQUE` (`Invoice_ID`),
  KEY `fk_tInvoice_tTender1_idx` (`Tender_ID`),
  KEY `fk_tInvoice_tPerson1_idx` (`Sender_ID`),
  CONSTRAINT `fk_Invoice_Sender` FOREIGN KEY (`Sender_ID`) REFERENCES `Sender` (`Sender_ID`),
  CONSTRAINT `fk_Invoice_Tender` FOREIGN KEY (`Tender_ID`) REFERENCES `Tender` (`Tender_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invoice`
--

LOCK TABLES `Invoice` WRITE;
/*!40000 ALTER TABLE `Invoice` DISABLE KEYS */;
INSERT INTO `Invoice` VALUES (1,1,3.99,1,'2019-04-15','18:53:32',1),(2,1,12.65,1,'2019-04-15','19:51:08',1),(3,2,21.86,1,'2019-04-15','20:01:28',1),(4,1,3.99,1,'2019-04-16','01:43:13',1),(5,1,4.91,1,'2019-04-16','16:50:06',1),(6,1,3.99,1,'2019-04-16','19:26:18',1),(7,1,31.98,1,'2019-04-16','19:38:03',1),(8,1,5.83,1,'2019-04-16','20:42:18',1),(9,1,13.20,1,'2019-04-16','23:01:30',1),(10,1,7.24,1,'2019-04-16','23:26:25',1),(11,5,117.28,1,'2019-04-18','00:43:30',1),(12,3,40.26,1,'2019-04-18','05:54:40',1),(13,6,4.91,1,'2019-04-22','23:38:49',1);
/*!40000 ALTER TABLE `Invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JobTitles`
--

DROP TABLE IF EXISTS `JobTitles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `JobTitles` (
  `JobTitle_ID` int(11) NOT NULL AUTO_INCREMENT,
  `JobTitle` varchar(24) NOT NULL,
  PRIMARY KEY (`JobTitle_ID`),
  UNIQUE KEY `ID_UNIQUE` (`JobTitle_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JobTitles`
--

LOCK TABLES `JobTitles` WRITE;
/*!40000 ALTER TABLE `JobTitles` DISABLE KEYS */;
INSERT INTO `JobTitles` VALUES (1,'Manager'),(2,'Driver');
/*!40000 ALTER TABLE `JobTitles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Package`
--

DROP TABLE IF EXISTS `Package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Package` (
  `Package_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Invoice_ID` int(11) NOT NULL,
  `Sender_ID` int(11) NOT NULL,
  `ShipForm_ID` tinyint(4) NOT NULL,
  `Weight` double unsigned NOT NULL,
  `ReceiverFirstName` varchar(18) NOT NULL,
  `ReceiverLastName` varchar(18) NOT NULL,
  `ReceiverAddr` varchar(32) NOT NULL,
  `ReceiverCity_ID` int(11) NOT NULL,
  `ReceiverState_ID` smallint(6) NOT NULL,
  `ReceiverZip` int(11) NOT NULL,
  `ReceiverCountry_ID` tinyint(4) NOT NULL,
  `ReceiverApt` int(11) DEFAULT NULL,
  PRIMARY KEY (`Package_ID`),
  UNIQUE KEY `ID_UNIQUE` (`Package_ID`),
  KEY `fk_tToShip_tInvoice_idx` (`Invoice_ID`),
  KEY `fk_tToShip_tShipForm1_idx` (`ShipForm_ID`),
  KEY `fk_tToShip_tPerson1_idx` (`Sender_ID`),
  KEY `fk_tPackage_tCity1_idx` (`ReceiverCity_ID`),
  KEY `fk_tPackage_tCountry1_idx` (`ReceiverCountry_ID`),
  KEY `fk_tPackage_tState1_idx` (`ReceiverState_ID`),
  CONSTRAINT `fk_Package_City` FOREIGN KEY (`ReceiverCity_ID`) REFERENCES `Cities` (`City_ID`),
  CONSTRAINT `fk_Package_Country` FOREIGN KEY (`ReceiverCountry_ID`) REFERENCES `Countries` (`Country_ID`),
  CONSTRAINT `fk_Package_Invoice` FOREIGN KEY (`Invoice_ID`) REFERENCES `Invoice` (`Invoice_ID`),
  CONSTRAINT `fk_Package_Sender` FOREIGN KEY (`Sender_ID`) REFERENCES `Sender` (`Sender_ID`),
  CONSTRAINT `fk_Package_ShipForm` FOREIGN KEY (`ShipForm_ID`) REFERENCES `ShipForm` (`ShipForm_ID`),
  CONSTRAINT `fk_Package_State` FOREIGN KEY (`ReceiverState_ID`) REFERENCES `States` (`State_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Package`
--

LOCK TABLES `Package` WRITE;
/*!40000 ALTER TABLE `Package` DISABLE KEYS */;
INSERT INTO `Package` VALUES (1,1,1,4,2,'Chris','Dang','5314 Tocadero Dr',2,43,72442,1,NULL),(2,2,1,2,2,'Chris ','Dang','4123 Calhoun Rd',2,43,74564,1,NULL),(3,3,2,2,12,'andres','Boccalandro','6335 mystic bridgde dr',2,43,77024,1,NULL),(4,4,1,4,2,'Victor','Zapata','328 Warren St.',54,26,59101,1,NULL),(5,5,1,4,3,'Billy ','Bob','2131 Layover Ln',55,5,34442,1,NULL),(6,6,1,4,2,'Daniel','Oviedo','4341 Sunset Blvd',5,5,55444,1,NULL),(7,7,1,2,23,'Clint','Capela','5258 Eastbury St',2,43,77048,1,NULL),(8,8,1,4,4,'Cash','DeLeon','5543 Lincoln Ave',7,51,54553,1,NULL),(9,9,1,4,12,'Chris','Dang','3123 Calhoun Rd',2,43,77432,1,NULL),(10,10,1,1,2,'Chris','Paul','3123 Rockets Ln',2,43,77434,1,NULL),(11,11,5,1,1231313,'sdaf','safafa','dasfas',58,11,151515,1,12313131),(12,12,3,2,32,'shahzaib','ali','3920 some place',59,5,55564,1,NULL),(13,13,6,4,3,'Kimberly','Smith','6353',61,43,64443,1,NULL);
/*!40000 ALTER TABLE `Package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sender`
--

DROP TABLE IF EXISTS `Sender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sender` (
  `Sender_ID` int(11) NOT NULL AUTO_INCREMENT,
  `FName` varchar(18) NOT NULL,
  `LName` varchar(18) NOT NULL,
  `Addr1` varchar(32) NOT NULL,
  `Addr2` varchar(32) DEFAULT NULL,
  `City_ID` int(11) NOT NULL,
  `State_ID` smallint(6) NOT NULL,
  `ZIP` int(11) NOT NULL,
  `Country_ID` tinyint(4) NOT NULL,
  `Email` varchar(32) DEFAULT NULL,
  `Phone` varchar(10) NOT NULL,
  `Apt` int(11) DEFAULT NULL,
  PRIMARY KEY (`Sender_ID`),
  UNIQUE KEY `ID_UNIQUE` (`Sender_ID`),
  KEY `fk_tPerson_tCities1_idx` (`City_ID`),
  KEY `fk_tPerson_tState1_idx` (`State_ID`),
  KEY `fk_tPerson_tCountry1_idx` (`Country_ID`),
  CONSTRAINT `fk_Sender_City` FOREIGN KEY (`City_ID`) REFERENCES `Cities` (`City_ID`),
  CONSTRAINT `fk_Sender_Country` FOREIGN KEY (`Country_ID`) REFERENCES `Countries` (`Country_ID`),
  CONSTRAINT `fk_Sender_State` FOREIGN KEY (`State_ID`) REFERENCES `States` (`State_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sender`
--

LOCK TABLES `Sender` WRITE;
/*!40000 ALTER TABLE `Sender` DISABLE KEYS */;
INSERT INTO `Sender` VALUES (1,'Shahzaib','Ali','2313 Sydney Ln','',52,43,77546,1,'shahzaibsa98@gmail.com','8326061323',4324),(2,'jose','Boccalandro','2950 old spanish trail',NULL,2,43,77054,1,'jofebocc@gmail.com','2816308756',377),(3,'christopher','dang','3000 cape blank rd',NULL,53,43,77459,1,'dchrisu@yahoo.com','8329858637',NULL),(4,'Jamie','Lannister','5322 Lockheed Dr',NULL,56,5,76556,1,'jamie123@gmail.com','8325333413',NULL),(5,'13131','2131asdf','asfdafafs',NULL,57,6,234243,1,'131','31',1123131),(6,'Jennifer','Florez','4132 Lombard St',NULL,55,5,53244,1,'JenniferFlorez@shipit.com','3215324444',NULL);
/*!40000 ALTER TABLE `Sender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SenderCredentials`
--

DROP TABLE IF EXISTS `SenderCredentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SenderCredentials` (
  `User_Credential_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(16) NOT NULL,
  `Password` varchar(18) NOT NULL,
  `Sender_ID` int(11) NOT NULL,
  `Date_Updated` date DEFAULT NULL,
  PRIMARY KEY (`User_Credential_ID`),
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  UNIQUE KEY `ID_UNIQUE` (`User_Credential_ID`),
  KEY `fk_tUsers_tSender1_idx` (`Sender_ID`),
  CONSTRAINT `fk_tSenderID` FOREIGN KEY (`Sender_ID`) REFERENCES `Sender` (`Sender_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SenderCredentials`
--

LOCK TABLES `SenderCredentials` WRITE;
/*!40000 ALTER TABLE `SenderCredentials` DISABLE KEYS */;
INSERT INTO `SenderCredentials` VALUES (1,'Shahzaib','321',1,'2019-04-16'),(2,'jofebocc','Jo25478837',2,NULL),(3,'dchrisu','pass',3,'2019-04-18'),(4,'ConfuzedOne','123',4,NULL);
/*!40000 ALTER TABLE `SenderCredentials` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `mydb`.`SenderCredentials_BEFORE_UPDATE` BEFORE UPDATE ON `SenderCredentials` FOR EACH ROW
BEGIN
	SET NEW.Date_Updated=curdate();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `ShipForm`
--

DROP TABLE IF EXISTS `ShipForm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ShipForm` (
  `ShipForm_ID` tinyint(4) NOT NULL AUTO_INCREMENT COMMENT 'Form of package (i.e. small, large, letter)',
  `ShipForm` char(12) NOT NULL,
  `Length` int(11) DEFAULT NULL,
  `Width` int(11) DEFAULT NULL,
  `Height` int(11) DEFAULT NULL,
  PRIMARY KEY (`ShipForm_ID`),
  UNIQUE KEY `ID_UNIQUE` (`ShipForm_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShipForm`
--

LOCK TABLES `ShipForm` WRITE;
/*!40000 ALTER TABLE `ShipForm` DISABLE KEYS */;
INSERT INTO `ShipForm` VALUES (1,'Small Box',6,8,6),(2,'Medium Box',9,11,9),(3,'Large Box',12,18,12),(4,'Letter',9,6,1);
/*!40000 ALTER TABLE `ShipForm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShipStatus`
--

DROP TABLE IF EXISTS `ShipStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ShipStatus` (
  `ShipStatus_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Status_ID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `Hub_ID` int(11) DEFAULT NULL,
  `Package_ID` int(11) NOT NULL,
  `Driver_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ShipStatus_ID`),
  UNIQUE KEY `ID_UNIQUE` (`ShipStatus_ID`),
  KEY `fk_tShipStatus_tHub1_idx` (`Hub_ID`),
  KEY `fk_tShipStatus_tPackage1_idx` (`Package_ID`),
  KEY `fk_tShipStatus_tStatus1_idx` (`Status_ID`),
  KEY `fk_ShipStatus_Driver_ID_idx` (`Driver_ID`),
  CONSTRAINT `fk_ShipStatus_Driver_ID` FOREIGN KEY (`Driver_ID`) REFERENCES `Employee` (`ID`),
  CONSTRAINT `fk_ShipStatus_Hub` FOREIGN KEY (`Hub_ID`) REFERENCES `Hub` (`Hub_ID`),
  CONSTRAINT `fk_ShipStatus_Package` FOREIGN KEY (`Package_ID`) REFERENCES `Package` (`Package_ID`),
  CONSTRAINT `fk_ShipStatus_Status` FOREIGN KEY (`Status_ID`) REFERENCES `Status` (`Status_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShipStatus`
--

LOCK TABLES `ShipStatus` WRITE;
/*!40000 ALTER TABLE `ShipStatus` DISABLE KEYS */;
INSERT INTO `ShipStatus` VALUES (1,2,'2019-04-15','18:53:32',9,1,NULL),(2,3,'2019-04-15','18:54:27',9,1,NULL),(3,4,'2019-04-15','18:55:54',9,1,NULL),(4,6,'2019-04-15','18:55:54',9,1,7),(5,2,'2019-04-15','19:51:08',9,2,NULL),(6,3,'2019-04-15','19:51:15',9,2,NULL),(7,4,'2019-04-15','19:51:37',9,2,NULL),(8,6,'2019-04-15','19:51:37',9,2,7),(9,2,'2019-04-15','20:01:28',9,3,NULL),(10,3,'2019-04-15','20:03:39',9,3,NULL),(11,4,'2019-04-15','20:04:06',9,3,NULL),(12,6,'2019-04-15','20:04:06',9,3,7),(13,7,'2019-04-15','20:04:36',NULL,1,7),(14,7,'2019-04-15','20:04:37',NULL,2,7),(15,7,'2019-04-15','20:04:37',NULL,3,7),(16,2,'2019-04-16','01:43:13',9,4,NULL),(17,3,'2019-04-16','01:44:46',9,4,NULL),(18,4,'2019-04-16','01:46:53',9,4,NULL),(19,5,'2019-04-16','01:46:53',43,4,7),(20,2,'2019-04-16','01:46:53',43,4,NULL),(21,3,'2019-04-16','01:47:09',43,4,NULL),(22,4,'2019-04-16','01:47:26',43,4,NULL),(23,6,'2019-04-16','01:47:26',43,4,7),(24,7,'2019-04-16','01:48:24',NULL,4,7),(25,2,'2019-04-16','16:50:06',9,5,NULL),(26,3,'2019-04-16','16:51:04',9,5,NULL),(27,4,'2019-04-16','16:51:35',9,5,NULL),(28,5,'2019-04-16','16:51:35',21,5,7),(29,2,'2019-04-16','16:51:35',21,5,NULL),(30,3,'2019-04-16','16:51:45',21,5,NULL),(31,4,'2019-04-16','16:51:55',21,5,NULL),(32,5,'2019-04-16','16:51:56',22,5,7),(33,2,'2019-04-16','16:51:56',22,5,NULL),(34,4,'2019-04-16','16:51:56',21,5,NULL),(35,5,'2019-04-16','16:51:56',22,5,7),(36,2,'2019-04-16','16:51:56',22,5,NULL),(37,3,'2019-04-16','16:52:05',22,5,NULL),(38,4,'2019-04-16','16:52:15',22,5,NULL),(39,5,'2019-04-16','16:52:15',15,5,7),(40,2,'2019-04-16','16:52:15',15,5,NULL),(41,3,'2019-04-16','16:52:26',15,5,NULL),(42,4,'2019-04-16','16:52:40',15,5,NULL),(43,4,'2019-04-16','16:52:42',15,5,NULL),(44,4,'2019-04-16','16:52:44',15,5,NULL),(45,5,'2019-04-16','16:52:44',13,5,7),(46,4,'2019-04-16','16:52:44',15,5,NULL),(47,4,'2019-04-16','16:52:44',15,5,NULL),(48,5,'2019-04-16','16:52:44',13,5,7),(49,5,'2019-04-16','16:52:45',13,5,7),(50,2,'2019-04-16','16:52:45',13,5,NULL),(51,5,'2019-04-16','16:52:45',13,5,7),(52,5,'2019-04-16','16:52:45',13,5,7),(53,2,'2019-04-16','16:52:45',13,5,NULL),(54,2,'2019-04-16','16:52:45',13,5,NULL),(55,2,'2019-04-16','16:52:45',13,5,NULL),(56,2,'2019-04-16','16:52:45',13,5,NULL),(57,3,'2019-04-16','16:53:13',13,5,NULL),(58,4,'2019-04-16','16:53:35',13,5,NULL),(59,6,'2019-04-16','16:53:35',13,5,7),(60,7,'2019-04-16','16:57:05',NULL,5,7),(61,2,'2019-04-16','19:26:18',9,6,NULL),(62,3,'2019-04-16','19:27:31',9,6,NULL),(63,4,'2019-04-16','19:29:49',9,6,NULL),(64,5,'2019-04-16','19:29:49',51,6,8),(65,2,'2019-04-16','19:29:49',51,6,NULL),(66,3,'2019-04-16','19:29:58',51,6,NULL),(67,4,'2019-04-16','19:30:11',51,6,NULL),(68,5,'2019-04-16','19:30:11',13,6,8),(69,2,'2019-04-16','19:30:11',13,6,NULL),(70,3,'2019-04-16','19:30:37',13,6,NULL),(71,4,'2019-04-16','19:30:52',13,6,NULL),(72,6,'2019-04-16','19:30:52',13,6,8),(73,2,'2019-04-16','19:38:03',9,7,NULL),(74,3,'2019-04-16','19:38:51',9,7,NULL),(75,4,'2019-04-16','19:40:42',9,7,NULL),(76,6,'2019-04-16','19:40:42',9,7,7),(77,7,'2019-04-16','19:41:19',NULL,7,7),(78,2,'2019-04-16','20:42:18',9,8,NULL),(79,3,'2019-04-16','20:43:19',9,8,NULL),(80,4,'2019-04-16','20:43:47',9,8,NULL),(81,5,'2019-04-16','20:43:47',15,8,8),(82,2,'2019-04-16','20:43:47',15,8,NULL),(83,3,'2019-04-16','20:43:59',15,8,NULL),(84,4,'2019-04-16','20:44:16',15,8,NULL),(85,6,'2019-04-16','20:44:16',15,8,8),(86,2,'2019-04-16','23:01:30',9,9,NULL),(87,2,'2019-04-16','23:26:26',9,10,NULL),(88,3,'2019-04-16','23:27:27',9,9,NULL),(89,3,'2019-04-16','23:27:27',9,10,NULL),(90,4,'2019-04-16','23:28:13',9,9,NULL),(91,6,'2019-04-16','23:28:13',9,9,8),(92,4,'2019-04-16','23:28:27',9,10,NULL),(93,6,'2019-04-16','23:28:27',9,10,8),(94,7,'2019-04-16','23:29:10',NULL,9,8),(95,7,'2019-04-16','23:29:13',NULL,10,8),(96,7,'2019-04-16','23:29:15',NULL,6,8),(97,7,'2019-04-16','23:29:16',NULL,8,8),(98,2,'2019-04-18','00:43:30',21,11,NULL),(99,2,'2019-04-18','05:54:40',9,12,NULL),(100,2,'2019-04-22','23:38:49',13,13,NULL);
/*!40000 ALTER TABLE `ShipStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `States`
--

DROP TABLE IF EXISTS `States`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `States` (
  `State_ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `State_Name` varchar(24) DEFAULT NULL,
  `State_Abbr` char(2) DEFAULT NULL,
  PRIMARY KEY (`State_ID`),
  UNIQUE KEY `ID_UNIQUE` (`State_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `States`
--

LOCK TABLES `States` WRITE;
/*!40000 ALTER TABLE `States` DISABLE KEYS */;
INSERT INTO `States` VALUES (1,'Alabama','AL'),(2,'Alaska','AK'),(3,'Arizona','AZ'),(4,'Arkansas','AR'),(5,'California','CA'),(6,'Colorado','CO'),(7,'Connecticut','CT'),(8,'Delaware','DE'),(9,'Florida','FL'),(10,'Georgia','GA'),(11,'Hawaii','HI'),(12,'Idaho','ID'),(13,'Illinois','IL'),(14,'Indiana','IN'),(15,'Iowa','IA'),(16,'Kansas','KS'),(17,'Kentucky','KY'),(18,'Louisiana','LA'),(19,'Maine','ME'),(20,'Maryland','MD'),(21,'Massachusetts','MA'),(22,'Michigan','MI'),(23,'Minnesota','MN'),(24,'Mississippi','MS'),(25,'Missouri','MO'),(26,'Montana','MT'),(27,'Nebraska','NE'),(28,'Nevada','NV'),(29,'New Hampshire','NH'),(30,'New Jersey','NJ'),(31,'New Mexico','NM'),(32,'New York','NY'),(33,'North Carolina','NC'),(34,'North Dakota','ND'),(35,'Ohio','OH'),(36,'Oklahoma','OK'),(37,'Oregon','OR'),(38,'Pennsylvania','PA'),(39,'Rhode Island','RI'),(40,'South Carolina','SC'),(41,'South Dakota','SD'),(42,'Tennessee','TN'),(43,'Texas','TX'),(44,'Utah','UT'),(45,'Vermont','VT'),(46,'Virginia','VA'),(47,'Washington','WA'),(48,'West Virginia','WV'),(49,'Wisconsin','WI'),(50,'Wyoming','WY'),(51,'District of Columbia','DC');
/*!40000 ALTER TABLE `States` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Status`
--

DROP TABLE IF EXISTS `Status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Status` (
  `Status_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Lookup table\\nWe generate types of statuses',
  `Status_Type` varchar(24) NOT NULL,
  PRIMARY KEY (`Status_ID`),
  UNIQUE KEY `ID_UNIQUE` (`Status_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Status`
--

LOCK TABLES `Status` WRITE;
/*!40000 ALTER TABLE `Status` DISABLE KEYS */;
INSERT INTO `Status` VALUES (1,'Label Created'),(2,'Awaiting Arrival'),(3,'Arrival Scan'),(4,'Package Processed'),(5,'In Transit'),(6,'Out For Delivery'),(7,'Delivered');
/*!40000 ALTER TABLE `Status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tender`
--

DROP TABLE IF EXISTS `Tender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tender` (
  `Tender_ID` tinyint(4) NOT NULL AUTO_INCREMENT,
  `Tender_Type` varchar(16) NOT NULL,
  PRIMARY KEY (`Tender_ID`),
  UNIQUE KEY `id_UNIQUE` (`Tender_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tender`
--

LOCK TABLES `Tender` WRITE;
/*!40000 ALTER TABLE `Tender` DISABLE KEYS */;
INSERT INTO `Tender` VALUES (1,'Credit');
/*!40000 ALTER TABLE `Tender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vehicles`
--

DROP TABLE IF EXISTS `Vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Vehicles` (
  `VIN` varchar(17) NOT NULL,
  `Vehicle_Hub_Location_ID` int(11) NOT NULL,
  `Driver_Employee_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`VIN`),
  UNIQUE KEY `VIN_UNIQUE` (`VIN`),
  KEY `fk_tVehicles_tHub1_idx` (`Vehicle_Hub_Location_ID`),
  KEY `fk_tVehicles_tEmployee1_idx` (`Driver_Employee_ID`),
  CONSTRAINT `fk_Vehicles_Employee` FOREIGN KEY (`Driver_Employee_ID`) REFERENCES `Employee` (`ID`),
  CONSTRAINT `fk_Vehicles_Hub` FOREIGN KEY (`Vehicle_Hub_Location_ID`) REFERENCES `Hub` (`Hub_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehicles`
--

LOCK TABLES `Vehicles` WRITE;
/*!40000 ALTER TABLE `Vehicles` DISABLE KEYS */;
INSERT INTO `Vehicles` VALUES ('123124214124',47,10),('4324234GGFGFGDFVF',21,9),('445L4543LLLFESFEE',9,8);
/*!40000 ALTER TABLE `Vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mydb'
--

--
-- Dumping routines for database 'mydb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-23  3:08:50
