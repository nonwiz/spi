-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: SPI
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ApprovalBy`
--

DROP TABLE IF EXISTS `ApprovalBy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ApprovalBy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `user` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ApprovalBy_orderId_fkey` (`orderId`),
  CONSTRAINT `ApprovalBy_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `OrderRequest` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ApprovalBy`
--

LOCK TABLES `ApprovalBy` WRITE;
/*!40000 ALTER TABLE `ApprovalBy` DISABLE KEYS */;
INSERT INTO `ApprovalBy` VALUES (1,1,'201900162@my.apiu.edu','department_head'),(2,1,'bdchanbroset@gmail.com','finance_officer'),(3,7,'bdchanbroset@gmail.com','department_head'),(4,7,'201900162@my.apiu.edu','finance_officer'),(5,8,'bdchanbroset@gmail.com','department_head'),(6,8,'201900162@my.apiu.edu','finance_officer');
/*!40000 ALTER TABLE `ApprovalBy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CodeName`
--

DROP TABLE IF EXISTS `CodeName`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CodeName` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `codeType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CodeName_name_key` (`name`),
  UNIQUE KEY `CodeName_code_key` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CodeName`
--

LOCK TABLES `CodeName` WRITE;
/*!40000 ALTER TABLE `CodeName` DISABLE KEYS */;
INSERT INTO `CodeName` VALUES (1,'TOWN HOUSE A5','A5','Location'),(2,'ADMIN AREA','AD100','Location'),(3,'AUDITORIUM ML','AUDIML','Location'),(4,'ADMINISTRATIVE SERVICES','AS','Department'),(5,'President','ASPRESI01','Department'),(6,'Bangkok Operations','AUBANGK01','Department'),(7,'Alfredo Gomeri Agustin','ERALFRE01','Employee'),(8,'Amanda Rachel Simon','ERAMAND01','Employee'),(9,'Bunsort Suknoi','ERBUNSO01','Employee'),(10,'Bryan Khaw','BRYKH96','Employee'),(12,'Solomon Right Wing','SRW','Location'),(13,'CHURCH','CHRCH1','Location'),(14,'Health Promotion','HP20','Department'),(15,'Tarun Tudu','TTRDU','Employee'),(16,'Kyaw Tha Khlain','KTK42','Employee');
/*!40000 ALTER TABLE `CodeName` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CommentBy`
--

DROP TABLE IF EXISTS `CommentBy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CommentBy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CommentBy_orderId_fkey` (`orderId`),
  CONSTRAINT `CommentBy_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `OrderRequest` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CommentBy`
--

LOCK TABLES `CommentBy` WRITE;
/*!40000 ALTER TABLE `CommentBy` DISABLE KEYS */;
INSERT INTO `CommentBy` VALUES (1,2,'Which version of bluetooth adaptor you need?','201800157@my.apiu.edu','admin'),(2,2,'Would v5.0 be okey?','201800157@my.apiu.edu','admin'),(3,2,'fawefawefawefawefawefewfwef','201800157@my.apiu.edu','admin'),(4,2,'aefawefawefawef','201800157@my.apiu.edu','admin'),(6,2,'gewweewfewfwefwefwefwef','201900162@my.apiu.edu','department_head'),(7,2,'fwefwefwef','201800157@my.apiu.edu','admin'),(8,2,'fwefwefwefaewfawefwef','201800157@my.apiu.edu','admin'),(9,2,'awefawefwfwef','201800157@my.apiu.edu','admin'),(10,2,'aewfaewfewfewfew','201800157@my.apiu.edu','admin'),(11,2,'Testing commenting + Sending email!','201800157@my.apiu.edu','admin'),(12,2,'Purchasing will not be avaiable until May 20.','201800157@my.apiu.edu','admin'),(14,7,'That looks good to me for now.','bdchanbroset@gmail.com','department_head'),(15,7,'Testing comment','bdchanbroset@gmail.com','department_head'),(16,7,'Testing commentwefwef','bdchanbroset@gmail.com','department_head'),(18,7,'Testing commentwefwefqwdqwwqd','bdchanbroset@gmail.com','department_head'),(19,8,'For time being, you can go to IT106 to borrow the keyboard first if necessary.','bdchanbroset@gmail.com','department_head'),(20,6,'too expensive','bdchanbroset@gmail.com','department_head'),(21,5,'Testing comment','201800157@my.apiu.edu','department_head'),(22,5,'afweaewfawef','201800157@my.apiu.edu','department_head'),(25,9,'Test adding comments','201800157@my.apiu.edu','department_head'),(26,5,'fwefwefawef','201800157@my.apiu.edu','department_head'),(27,9,'Testing comment feature 1201','201800157@my.apiu.edu','department_head');
/*!40000 ALTER TABLE `CommentBy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Department`
--

DROP TABLE IF EXISTS `Department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `budget` double DEFAULT NULL,
  `dean_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Department_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Department`
--

LOCK TABLES `Department` WRITE;
/*!40000 ALTER TABLE `Department` DISABLE KEYS */;
INSERT INTO `Department` VALUES (1,'Information Technology',8000,'bdchanbroset@gmail.com'),(2,'Engineering',8000,'gina@apiu.edu'),(3,'Education',8000,'education@apiu.edu'),(4,'Business Administration',8000,NULL),(5,'Arts & Humanities',8000,NULL),(6,'Finance',8000,NULL),(7,'Nursing',10000,NULL),(8,'Science',NULL,'test@gmail.com');
/*!40000 ALTER TABLE `Department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GeneralInfo`
--

DROP TABLE IF EXISTS `GeneralInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GeneralInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `GeneralInfo_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GeneralInfo`
--

LOCK TABLES `GeneralInfo` WRITE;
/*!40000 ALTER TABLE `GeneralInfo` DISABLE KEYS */;
INSERT INTO `GeneralInfo` VALUES (1,'Pending','order_status'),(2,'Approved','order_status'),(3,'Purchased','order_status'),(4,'Rejected','order_status'),(5,'small','quantity_unit'),(6,'medium','quantity_unit'),(7,'large','quantity_unit'),(8,'extra_large','quantity_unit'),(9,'other','quantity_unit'),(10,'kilogram','quantity_unit'),(11,'gram','quantity_unit'),(12,'inches','quantity_unit'),(13,'meter','quantity_unit'),(14,'pound','quantity_unit'),(15,'litre','quantity_unit'),(16,'square_meter','quantity_unit'),(17,'cubic_meter','quantity_unit'),(18,'other quantity','quantity_unit'),(19,'Cancelled','order_status'),(20,'electronics','order_type'),(21,'office','order_type'),(22,'furniture','order_type'),(23,'Decoration','order_type'),(24,'Tools','order_type'),(25,'land improvement','order_type'),(26,'gibabyte','quantity_unit'),(27,'Delivered','order_status');
/*!40000 ALTER TABLE `GeneralInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Item`
--

DROP TABLE IF EXISTS `Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `order_date` datetime(3) DEFAULT NULL,
  `isAsset` tinyint(1) NOT NULL DEFAULT '0',
  `depreciation` datetime(3) DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` double DEFAULT NULL,
  `quantity_unit` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_id` int NOT NULL,
  `target_location_request_id` int DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_reference` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Item_target_location_request_id_key` (`target_location_request_id`),
  KEY `Item_location_id_fkey` (`location_id`),
  CONSTRAINT `Item_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Item_target_location_request_id_fkey` FOREIGN KEY (`target_location_request_id`) REFERENCES `LocationMoveRequest` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Item`
--

LOCK TABLES `Item` WRITE;
/*!40000 ALTER TABLE `Item` DISABLE KEYS */;
INSERT INTO `Item` VALUES (1,'Project EP301','This is the projector.',30000,'2022-05-09 00:00:00.000',1,'2021-05-09 00:00:00.000',NULL,1,'small',23,NULL,NULL,NULL,NULL),(2,'Projector','Project for IT102',7000,'2020-08-22 00:00:00.000',1,NULL,'office',1,'kilogram',2,NULL,'AF32Z',NULL,NULL),(3,'Flower Vase','Flower designed with black theme',400,'2010-05-11 00:00:00.000',0,NULL,'Decoration',1,'small',1,NULL,'FV0312',NULL,NULL),(6,'Hand Sanitizer','This is the projector.',30000,'2022-05-09 00:00:00.000',0,'1970-01-01 00:00:00.000',NULL,1,'small',2,NULL,NULL,NULL,NULL),(7,'Samsung EVO xl','Project for IT102',7000,'2020-08-22 00:00:00.000',0,'1970-01-01 00:00:00.000','office',1,'kilogram',2,NULL,'AF32Z',NULL,NULL),(8,'Office Desk','Teacher chari',3000,'2002-05-04 00:00:00.000',0,'2012-05-10 00:00:00.000','furniture',1,'large',12,NULL,'DOC123',NULL,NULL),(9,'Computer Mouse','Plastic bag',8000,'2010-05-11 00:00:00.000',0,'1970-01-01 00:00:00.000','Decoration',20,'small',1,NULL,'REW32',NULL,NULL),(10,'Extension','This is the projector.',30000,'2022-05-09 00:00:00.000',0,'1970-01-01 00:00:00.000',NULL,1,'small',2,NULL,'REWF3',NULL,NULL),(11,'Lab Monitor','Project for IT102',7000,'2020-08-22 00:00:00.000',0,'1970-01-01 00:00:00.000','office',1,'kilogram',2,NULL,'GSD234',NULL,NULL),(12,'Xpen Tablet','Teacher chari',3000,'2002-05-04 00:00:00.000',0,'2012-05-10 00:00:00.000','furniture',1,'large',12,NULL,'FE#FEW',NULL,NULL),(13,'Monitor','Flower designed with black theme',400,'2010-05-11 00:00:00.000',1,'1970-01-01 00:00:00.000','Decoration',1,'small',1,NULL,'FV0312',NULL,NULL),(14,'Chair','Plastic bag',8000,'2010-05-11 00:00:00.000',1,'1970-01-01 00:00:00.000','Decoration',20,'small',1,NULL,'REW32',NULL,NULL),(15,'Shoes','Project for IT102',7000,'2020-08-22 00:00:00.000',1,'1970-01-01 00:00:00.000','office',1,'kilogram',2,NULL,'AF32Z',NULL,NULL),(16,'Pepper Spray','This is the projector.',30000,'2022-05-09 00:00:00.000',1,'1970-01-01 00:00:00.000',NULL,1,'small',2,NULL,NULL,NULL,NULL),(17,'Fire Extinguisher','Project for IT102',7000,'2020-08-22 00:00:00.000',1,'1970-01-01 00:00:00.000','office',1,'kilogram',2,NULL,'AF32Z',NULL,NULL),(18,'Extension','This is the projector.',30000,'2022-05-09 00:00:00.000',1,'1970-01-01 00:00:00.000',NULL,1,'small',2,NULL,'REWF3',NULL,NULL),(19,'Sock','Project for IT102',7000,'2020-08-22 00:00:00.000',1,'1970-01-01 00:00:00.000','office',1,'kilogram',2,NULL,'GSD234',NULL,NULL);
/*!40000 ALTER TABLE `Item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Location`
--

DROP TABLE IF EXISTS `Location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `building` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `floor` int NOT NULL,
  `room_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_quantity` double DEFAULT '0',
  `update_date` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `short_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Location_department_id_fkey` (`department_id`),
  CONSTRAINT `Location_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Location`
--

LOCK TABLES `Location` WRITE;
/*!40000 ALTER TABLE `Location` DISABLE KEYS */;
INSERT INTO `Location` VALUES (1,'Science',1,'102','',0,'2022-05-08 06:13:50.630','SC102',8),(2,'Information_Technology',1,'102',NULL,0,'2022-05-08 06:13:50.630','IT102',1),(3,'Information_Technology',1,'103',NULL,0,'2022-05-08 06:13:50.630','IT103',1),(4,'Information_Technology',1,'104',NULL,0,'2022-05-08 06:13:50.630','IT104',1),(5,'Information_Technology',1,'105',NULL,0,'2022-05-08 06:13:50.630','IT105',1),(6,'Information_Technology',1,'106',NULL,0,'2022-05-08 06:13:50.630','IT106',1),(7,'Information_Technology',1,'107',NULL,0,'2022-05-08 06:13:50.630','IT107',1),(8,'Information_Technology',1,'108',NULL,0,'2022-05-08 06:13:50.630','IT108',1),(9,'Administration',2,'201',NULL,0,'2022-05-08 06:13:50.630','AD201',4),(10,'Administration',2,'203','',0,'2022-05-08 06:13:50.630','AD203',4),(11,'Administration',2,'203',NULL,0,'2022-05-08 06:13:50.630','AD203',4),(12,'Administration',2,'204',NULL,0,'2022-05-08 06:13:50.630','AD204',4),(13,'Administration',2,'205',NULL,0,'2022-05-08 06:13:50.630','AD205',NULL),(14,'Administration',1,'101',NULL,0,'2022-05-08 06:13:50.630','AD101',NULL),(15,'Administration',1,'102',NULL,0,'2022-05-08 06:13:50.630','AD102',NULL),(16,'Administration',1,'103',NULL,0,'2022-05-08 06:13:50.630','AD103',1),(17,'Administration',1,'104',NULL,0,'2022-05-08 06:13:50.630','AD104',1),(18,'Administration',1,'105',NULL,0,'2022-05-08 06:13:50.630','AD105',NULL),(19,'Administration',1,'106',NULL,0,'2022-05-08 06:13:50.630','AD106',NULL),(20,'Administration',1,'107',NULL,0,'2022-05-08 06:13:50.630','AD107',NULL),(21,'Administration',1,'108',NULL,0,'2022-05-08 06:13:50.630','AD108',NULL),(22,'Science',1,'101','',0,'2022-05-09 07:05:01.521','SC101',8),(23,'Information_Technology',2,'224','IT LAB with double screen',0,'2022-05-09 07:50:46.603','IT224',NULL),(24,'Science',3,'301',NULL,0,'2022-05-11 07:53:24.791','SC301',8);
/*!40000 ALTER TABLE `Location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LocationMoveRequest`
--

DROP TABLE IF EXISTS `LocationMoveRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LocationMoveRequest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `previous_location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location_id` int NOT NULL,
  `approve` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `LocationMoveRequest_location_id_key` (`location_id`),
  CONSTRAINT `LocationMoveRequest_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LocationMoveRequest`
--

LOCK TABLES `LocationMoveRequest` WRITE;
/*!40000 ALTER TABLE `LocationMoveRequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `LocationMoveRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Log`
--

DROP TABLE IF EXISTS `Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `operation` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `user` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Log`
--

LOCK TABLES `Log` WRITE;
/*!40000 ALTER TABLE `Log` DISABLE KEYS */;
INSERT INTO `Log` VALUES (1,'Department','Updated from Engineering 1 to Engineering','Update','2022-05-08 15:05:00.508','201800157@my.apiu.edu'),(2,'Department','Updated from department details','Create','2022-05-08 15:05:00.986','201800157@my.apiu.edu'),(3,'Department','Create new department danz','Create','2022-05-09 07:47:36.030','kazimotodan4@gmail.com'),(4,'Department','Updated from dean to test@gmail.com','Update','2022-05-09 07:47:58.085','kazimotodan4@gmail.com'),(5,'Department','Create new department huiii','Create','2022-05-09 07:49:06.043','kazimotodan4@gmail.com'),(6,'Location','Update location SC102$','Update','2022-05-10 07:51:07.300','bdchanbroset@gmail.com'),(7,'Location','Update location SC102$','Update','2022-05-10 07:53:14.713','bdchanbroset@gmail.com'),(8,'Location','Update location SC102$','Update','2022-05-10 07:53:26.778','bdchanbroset@gmail.com'),(9,'Item','Add: new item (LG Monitor-electronics-) to the inventory','Create','2022-05-10 13:33:33.634','kazimotodan4@gmail.com'),(10,'Item','Add: new item (Asus Motherboard-electronics-) to the inventory','Create','2022-05-10 13:34:25.590','kazimotodan4@gmail.com'),(11,'Item','Add: new item (Flower Vase-Decoration-2022-05-11) to the inventory','Create','2022-05-10 17:09:22.732','bdchanbroset@gmail.com'),(12,'Item','Add: new item (360 degree office chair-furniture-2022-05-04) to the inventory','Create','2022-05-10 17:20:27.961','bdchanbroset@gmail.com'),(13,'GeneralInfo','Create: new general info type','Create','2022-05-10 17:52:46.936','201900162@my.apiu.edu'),(14,'LocationMoveRequest','Moving 360 degree office chair from SC102 to AD204','Update','2022-05-10 22:02:33.484','201800157@my.apiu.edu'),(15,'GeneralInfo','Create: new short_code','Create','2022-05-11 05:13:22.447','201800157@my.apiu.edu'),(16,'Inventory','Create: new short_code','Create','2022-05-11 05:14:18.910','201800157@my.apiu.edu'),(17,'Inventory','Create: new short_code','Create','2022-05-11 05:15:00.911','201800157@my.apiu.edu'),(18,'Inventory','Create: new short_code','Create','2022-05-11 05:15:01.355','201800157@my.apiu.edu'),(19,'Location','Add new location Science301','Create','2022-05-11 07:53:25.033','kazimotodan4@gmail.com'),(20,'LocationMoveRequest','Moving Project EP301 from IT224 to SC102','Update','2022-05-11 08:41:37.015','maginatorcloud@gmail.com'),(21,'OrderRequest & OrderItem','Create: new orders items','Create','2022-05-11 09:28:48.237','201800157@my.apiu.edu'),(22,'LocationMoveRequest','Moving Project EP301 from IT224 to IT102','Update','2022-05-11 09:33:24.083','maginatorcloud@gmail.com'),(23,'GeneralInfo','Create: new general info type','Create','2022-05-11 11:58:22.174','201800157@my.apiu.edu'),(24,'GeneralInfo','Create: new general info type','Create','2022-05-11 11:59:33.781','201800157@my.apiu.edu'),(25,'OrderRequest & OrderItem','Create: new orders items','Create','2022-05-12 12:02:41.551','201800157@my.apiu.edu'),(26,'LocationMoveRequest','Moving Project EP301 from IT102 to IT224','Update','2022-05-13 05:07:49.231','kazimotodan4@gmail.com'),(27,'Item','Dispose depreciated item','Remove','2022-05-13 07:07:26.706','201800157@my.apiu.edu');
/*!40000 ALTER TABLE `Log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderItem`
--

DROP TABLE IF EXISTS `OrderItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderItem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quotation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` double DEFAULT '1',
  `quantity_unit` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'other',
  `unit_price` double DEFAULT NULL,
  `vat` double DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_request_id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderItem_order_request_id_fkey` (`order_request_id`),
  CONSTRAINT `OrderItem_order_request_id_fkey` FOREIGN KEY (`order_request_id`) REFERENCES `OrderRequest` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderItem`
--

LOCK TABLES `OrderItem` WRITE;
/*!40000 ALTER TABLE `OrderItem` DISABLE KEYS */;
INSERT INTO `OrderItem` VALUES (1,'',1,'extra_large',4000,NULL,4000,'office',1,'Desk'),(2,'',2,'meter',1000,NULL,2000,'office',1,'Samsung LCD 24 inch \"'),(3,'Gaming chair for comfortable seating',1,'extra_large',4000,NULL,4000,'office',1,'Chair'),(4,'https://www.lazada.co.th/shop/super-bluetooth-thailand/',1,'Select unit',30,NULL,30,'electronics',2,'Bluetooth Adapters'),(5,'https://lazada.co.th/hand_washer',10,'small',45,NULL,450,'office',3,'Hand Washer'),(6,'https://thisiswhereukeep the link',1,'other quantity',40000,NULL,40000,'electronics',4,'LCD 44 inches for presentation'),(7,'',1,'medium',5000,NULL,5000,'office',5,'Dell Monitor 24 inch'),(8,'',1,'medium',2000,NULL,2000,'electronics',6,'Asus Motherboard'),(9,'https://lazada.co.th/curtain/3d',3,'extra_large',400,NULL,1200,'Decoration',7,'Curtain for side windows'),(10,'',3,'medium',200,NULL,600,'Decoration',7,'Chair'),(11,'https://lazada.com/keybaords/3',1,'Select unit',900,NULL,900,'office',8,'Logitech Keyboard'),(12,'',1,'Select unit',200,NULL,200,'electronics',9,'Nubwo bluetooth mouse');
/*!40000 ALTER TABLE `OrderItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderRequest`
--

DROP TABLE IF EXISTS `OrderRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderRequest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_reason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `approval_status` tinyint(1) NOT NULL DEFAULT '0',
  `total_price` double DEFAULT NULL,
  `vat` double DEFAULT NULL,
  `order_date` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `desired_date` datetime(3) DEFAULT NULL,
  `action_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_id` int NOT NULL,
  `purchasing_action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchased_date` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderRequest_location_id_fkey` (`location_id`),
  CONSTRAINT `OrderRequest_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderRequest`
--

LOCK TABLES `OrderRequest` WRITE;
/*!40000 ALTER TABLE `OrderRequest` DISABLE KEYS */;
INSERT INTO `OrderRequest` VALUES (1,'Prepare office for interns','Purchased',0,10000,NULL,'2022-05-10 12:50:59.474','2022-05-26 00:00:00.000',NULL,NULL,2,NULL,NULL),(2,'Computers need the Bluetooth adapter','Pending',0,30,NULL,'2022-05-10 13:58:31.823','2022-05-26 00:00:00.000',NULL,NULL,23,NULL,NULL),(3,'Prepare for intersemester, 2022','Rejected',0,450,NULL,'2022-05-10 15:45:11.525','2022-05-25 00:00:00.000',NULL,'Rejected by bdchanbroset@gmail.com',22,NULL,NULL),(4,'Classroom equipment for first semester','Cancelled',0,40000,NULL,'2022-05-10 16:11:26.878','2022-05-20 00:00:00.000',NULL,NULL,1,NULL,NULL),(5,'Need new monitor','Pending',0,5000,NULL,'2022-05-11 05:19:57.550','2022-05-13 00:00:00.000',NULL,NULL,23,NULL,NULL),(6,'need a new pc','Rejected',0,2000,NULL,'2022-05-11 05:22:24.567','2022-05-12 00:00:00.000',NULL,'Rejected by bdchanbroset@gmail.com',3,NULL,NULL),(7,'New classroom design for new academic year','Purchased',1,1800,NULL,'2022-05-11 08:29:33.854','2022-05-18 00:00:00.000',NULL,NULL,23,NULL,'2022-05-11 09:12:13.991'),(8,'New monitors and keyboards','Purchased',1,900,NULL,'2022-05-11 09:28:48.238','2022-05-12 00:00:00.000',NULL,NULL,23,NULL,'2022-05-11 09:40:31.035'),(9,'Testing','Pending',0,200,NULL,'2022-05-12 12:02:41.556','2022-05-20 00:00:00.000',NULL,NULL,23,NULL,NULL);
/*!40000 ALTER TABLE `OrderRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderType`
--

DROP TABLE IF EXISTS `OrderType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderType`
--

LOCK TABLES `OrderType` WRITE;
/*!40000 ALTER TABLE `OrderType` DISABLE KEYS */;
INSERT INTO `OrderType` VALUES (1,'electronics'),(2,'office'),(3,'subscription');
/*!40000 ALTER TABLE `OrderType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessionToken` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
INSERT INTO `Session` VALUES ('cl2x65x981120kwdrt719vn3z','7fc02dd7-b939-4b3d-819b-523c13ff9403','cl2x3ycry0869kwdr31i62buf','2022-06-07 10:45:48.570'),('cl2x8qfo81195kwdr7ppzehpw','50b1a8bb-a1a9-4572-95cf-854726574375','cl2x8qfo01188kwdrl0t7mi3h','2022-06-09 12:50:48.413'),('cl2x9p1a21311kwdrbmkx152c','dfbf3ea9-4051-4e49-8d1f-6cdd588bf92a','cl2x8qfo01188kwdrl0t7mi3h','2022-06-07 12:24:39.096'),('cl2xc6cc40664d8dro7wns4vd','fdbefb0a-005e-4cef-8858-54bee41fc0b8','cl2x8qfo01188kwdrl0t7mi3h','2022-06-07 13:34:05.809'),('cl2xd6fjk02057wdr5zgwi077','f77047d2-f44f-4dbc-bd5a-b0b9c8757237','cl2x8qfo01188kwdrl0t7mi3h','2022-06-07 14:02:09.581'),('cl2ya2r6s8356bodr027beupd','f36a46f4-82b5-457e-bde1-738e37c17dc0','cl2x3ycry0869kwdr31i62buf','2022-06-08 05:23:05.378'),('cl2yer2rt12631bodr5tbepsg1','4e8938e6-dfdf-493a-840e-34917af327fd','cl2yer2rl12624bodrsgm7b5rl','2022-06-08 07:33:58.599'),('cl2ygt8f7025918drv39kabj9','1fe007aa-cc44-483a-8aef-6e8ad84a77d1','cl2x3ycry0869kwdr31i62buf','2022-06-08 08:31:38.464'),('cl2ygvjry045918drtrsjl9q9','2f941abc-9ee6-4e4a-bf5e-5a56a3228136','cl2x3ycry0869kwdr31i62buf','2022-06-08 08:33:26.492'),('cl2ygwvwh056518dr4h4l85sp','2ff94d62-560d-4dc4-9ca7-68f08c67181b','cl2x3ycry0869kwdr31i62buf','2022-06-08 08:34:28.863'),('cl2yh8j09064018drisoxygfm','423a24ab-2f71-4c09-8089-18c935f4ddc5','cl2x8qfo01188kwdrl0t7mi3h','2022-06-08 08:43:32.022'),('cl2yrrxo20189zsdrd4fsrf14','4ed8b762-6d86-4d56-8914-abce53f718ab','cl2x8qfo01188kwdrl0t7mi3h','2022-06-08 13:38:33.648'),('cl2zuik7j0533msdrvzkctm4e','9a253292-8421-4ee1-bdc7-30c6764b139c','cl2yer2rl12624bodrsgm7b5rl','2022-06-09 07:43:01.325'),('cl307szmd0545qgdrpt2u5dla','29a4be27-7ba2-413b-a36b-2b7cbbdf7d37','cl307szm50537qgdryvdwektg','2022-06-09 13:55:02.866'),('cl30nalmy2605fwdrrlso19rp','468527d3-b968-4fab-97de-959c3dcae1c6','cl2x8qfo01188kwdrl0t7mi3h','2022-06-09 21:08:38.791'),('cl314su6k4463igdr6vx1me5u','d9938354-950e-4425-a78b-4002edacd796','cl2x3ycry0869kwdr31i62buf','2022-06-10 05:18:43.146'),('cl319zmn805908wdrzfa1xncl','b02dbdad-1118-49cb-a5ce-8198fbca49f9','cl2x3ycry0869kwdr31i62buf','2022-06-10 07:43:58.047'),('cl31bx08032098wdrvztco3as','06bd272d-b94c-4b03-9884-2bf53b56c431','cl31bx07s32028wdrp0lpfrq6','2022-06-10 08:37:54.905'),('cl31c3ds840218wdramz8szny','91d2b6e0-c628-4cbd-b069-afdc0eb1c53b','cl307szm50537qgdryvdwektg','2022-06-10 08:42:52.423'),('cl31c9mr352808wdrkih9xlcf','7018f55e-6c74-4814-9e92-7221601f19b8','cl2yer2rl12624bodrsgm7b5rl','2022-06-10 08:47:43.982'),('cl31cyrcf109938wdrcexzc0g6','f7581d7c-0dea-4910-877b-31a7c033aef0','cl31cyrc8109868wdrqwlsyzez','2022-06-10 09:07:16.328'),('cl31djmup148098wdrsdw8hmsg','266ef0f1-fc83-4e69-902f-485b07b926f4','cl2x8qfo01188kwdrl0t7mi3h','2022-06-11 11:27:37.374'),('cl31hs3j7177988wdr816kh4ct','e72ce491-a6b8-4c54-91a4-00945c649683','cl2x8qfo01188kwdrl0t7mi3h','2022-06-10 11:22:03.616'),('cl32qvgln0015esdroacmkprk','5e44a3de-80f5-424b-815e-1045e868e5e5','cl2x8qfo01188kwdrl0t7mi3h','2022-06-11 08:24:23.240'),('cl33py0mt0017agdr9skranh6','77431cb0-e55a-44dc-8771-afd313ca10f8','cl2x8qfo01188kwdrl0t7mi3h','2022-06-12 00:46:09.063'),('cl33qtp390762agdr5yjlknp0','192ff790-588b-4a43-b51a-ca64f6899f5d','cl2x3ycry0869kwdr31i62buf','2022-06-12 01:10:47.106'),('cl35xdgy20014lcdr56dj7ahy','cb57a64a-d770-4672-aee1-ae6126abb463','cl2x3ycry0869kwdr31i62buf','2022-06-13 13:49:39.718'),('cl35ykur00646lcdrspk6bmho','a6551276-802b-4fee-be92-dd92823dbc08','cl2x8qfo01188kwdrl0t7mi3h','2022-06-13 14:23:23.818'),('cl36otkkw001574drx4aunac3','dcc86056-ecb7-4887-8b65-a8db43f81e32','cl2x3ycry0869kwdr31i62buf','2022-06-14 02:38:00.558'),('cl36pzw98004370drzw0luvb6','44c6f502-6540-4853-8d04-129805d74b49','cl2x8qfo01188kwdrl0t7mi3h','2022-06-14 03:10:55.243');
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('customer','department_head','finance_officer','purchasing_officer','admin','inventory') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `department_id` int DEFAULT NULL,
  `location_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  KEY `User_location_id_fkey` (`location_id`),
  KEY `User_department_id_fkey` (`department_id`),
  CONSTRAINT `User_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `User_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('cl2x3ycry0869kwdr31i62buf','Dan Kazimoto','kazimotodan4@gmail.com','2022-05-15 02:38:00.546',NULL,'admin',1,3),('cl2x8qfo01188kwdrl0t7mi3h','John Doe','201800157@my.apiu.edu','2022-05-15 03:10:55.234',NULL,'department_head',1,23),('cl2yer2rl12624bodrsgm7b5rl','Chanbroset Prach','bdchanbroset@gmail.com','2022-05-11 08:47:43.975',NULL,'department_head',1,5),('cl307szm50537qgdryvdwektg','Dan Khazifire','201900162@my.apiu.edu','2022-05-11 08:42:52.415',NULL,'finance_officer',1,23),('cl31bx07s32028wdrp0lpfrq6','Chabai Dee','maginatorcloud@gmail.com','2022-05-11 08:37:54.899',NULL,'inventory',1,2),('cl31cyrc8109868wdrqwlsyzez','Jane Doe','201800170@my.apiu.edu','2022-05-11 09:07:16.321',NULL,'purchasing_officer',3,22);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VerificationToken`
--

DROP TABLE IF EXISTS `VerificationToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VerificationToken` (
  `identifier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  UNIQUE KEY `VerificationToken_token_key` (`token`),
  UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`,`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VerificationToken`
--

LOCK TABLES `VerificationToken` WRITE;
/*!40000 ALTER TABLE `VerificationToken` DISABLE KEYS */;
INSERT INTO `VerificationToken` VALUES ('kazimotodan4@gmail.com','3dfebb3acfb8ab874fb14801035c90a8e304d9fb119c050e353ff84827427040','2022-05-09 10:35:31.287'),('kazimotodan4@gmail.com@apiu.edu','48a5e35fc2a13dc00b6ccd2fd7e80c048331cde6b36cf4fde8a819b1d8d9b9cc','2022-05-12 07:42:39.308'),('kazimot0dan4@gmail.com','5668edf06ca20b3c0129a12b936392b03a2b3b32363d686d0330fb8eed3c8569','2022-05-10 04:14:22.209'),('201800157','64cc7f37a1cd0a642e34df214205261b9afd9d3382641eea676bb5ecffdfcd80','2022-05-09 06:46:20.322'),('201800157','ba2199d9a96db711c3fc73084e298f89f7d3e02df0ae3f0fdf306d322b4ea506','2022-05-09 11:56:08.687'),('201800157@my.apiu.edu','ba6f0bfc5a585891fdbf658c0e0b48b1107a1095886d897faf060852c3356995','2022-05-16 02:48:42.526'),('kazimotodan4@gmail.com@apiu.edu','c5df995e99b2812ecc5055d61408e51fb4344bc7d5732ec636bd8cd3a26ed527','2022-05-12 05:17:18.643'),('dan@helloworld.com','d03f160fee01071daa42d6c592639244368b414e20633cabf12446813d60a291','2022-05-15 16:27:56.774'),('kazimotodan4@gmail.com','d32d7579ba00e0bc149f90ac8adaf9ff86ed5ece62f41f728b406d3a379b6496','2022-05-09 10:38:40.067'),('bdchanbroset@gmail.com@apiu.edu','d4a918637e03b3445b6d2e1aa88daf4ccad3b2f69fb1d9495755d30beb42dc4b','2022-05-11 21:06:49.399'),('kazimotoda4@gmail.com','e5afb55ee7d716f5a0c60de8e4cc2939138b7e43b46486bd0601675335ada3a0','2022-05-10 08:29:16.651'),('201800157@my.apiu.edu','f7fcf85f37c6d9ca324e63fb6e26c080a538054dfebc882093fbfbf96c4270f0','2022-05-14 00:45:58.841');
/*!40000 ALTER TABLE `VerificationToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'SPI'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-15 12:45:08
