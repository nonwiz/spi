-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: SPI
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ApprovalBy`
--

LOCK TABLES `ApprovalBy` WRITE;
/*!40000 ALTER TABLE `ApprovalBy` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CodeName`
--

LOCK TABLES `CodeName` WRITE;
/*!40000 ALTER TABLE `CodeName` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CommentBy`
--

LOCK TABLES `CommentBy` WRITE;
/*!40000 ALTER TABLE `CommentBy` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Department`
--

LOCK TABLES `Department` WRITE;
/*!40000 ALTER TABLE `Department` DISABLE KEYS */;
INSERT INTO `Department` VALUES (1,'Information Technology',8000,'kazimotodan4@gmail.com'),(2,'Engineering',8000,'gina@apiu.edu'),(3,'Education',8000,'education@apiu.edu'),(4,'Business Administration',8000,NULL),(5,'Arts & Humanities',8000,NULL),(6,'Finance',8000,NULL),(7,'Nursing',10000,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GeneralInfo`
--

LOCK TABLES `GeneralInfo` WRITE;
/*!40000 ALTER TABLE `GeneralInfo` DISABLE KEYS */;
INSERT INTO `GeneralInfo` VALUES (1,'Pending','order_status'),(2,'Approved','order_status'),(3,'Purchased','order_status'),(4,'Rejected','order_status'),(5,'small','item_size'),(6,'medium','item_size'),(7,'large','item_size'),(8,'extra_large','item_size'),(9,'other','item_size'),(10,'kilogram','quantity_unit'),(11,'gram','quantity_unit'),(12,'inches','quantity_unit'),(13,'meter','quantity_unit'),(14,'pound','quantity_unit'),(15,'litre','quantity_unit'),(16,'square_meter','quantity_unit'),(17,'cubic_meter','quantity_unit'),(18,'other quantity','quantity_unit');
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
  PRIMARY KEY (`id`),
  KEY `Item_location_id_fkey` (`location_id`),
  KEY `Item_target_location_request_id_fkey` (`target_location_request_id`),
  CONSTRAINT `Item_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Item_target_location_request_id_fkey` FOREIGN KEY (`target_location_request_id`) REFERENCES `LocationMoveRequest` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Item`
--

LOCK TABLES `Item` WRITE;
/*!40000 ALTER TABLE `Item` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Location`
--

LOCK TABLES `Location` WRITE;
/*!40000 ALTER TABLE `Location` DISABLE KEYS */;
INSERT INTO `Location` VALUES (1,'Information_Technology',1,'101',NULL,0,'2022-05-08 06:13:50.630','IT101',NULL),(2,'Information_Technology',1,'102',NULL,0,'2022-05-08 06:13:50.630','IT102',NULL),(3,'Information_Technology',1,'103',NULL,0,'2022-05-08 06:13:50.630','IT103',NULL),(4,'Information_Technology',1,'104',NULL,0,'2022-05-08 06:13:50.630','IT104',NULL),(5,'Information_Technology',1,'105',NULL,0,'2022-05-08 06:13:50.630','IT105',NULL),(6,'Information_Technology',1,'106',NULL,0,'2022-05-08 06:13:50.630','IT106',NULL),(7,'Information_Technology',1,'107',NULL,0,'2022-05-08 06:13:50.630','IT107',NULL),(8,'Information_Technology',1,'108',NULL,0,'2022-05-08 06:13:50.630','IT108',NULL),(9,'Administration',2,'201',NULL,0,'2022-05-08 06:13:50.630','AD201',NULL),(10,'Administration',2,'202',NULL,0,'2022-05-08 06:13:50.630','AD202',NULL),(11,'Administration',2,'203',NULL,0,'2022-05-08 06:13:50.630','AD203',NULL),(12,'Administration',2,'204',NULL,0,'2022-05-08 06:13:50.630','AD204',NULL),(13,'Administration',2,'205',NULL,0,'2022-05-08 06:13:50.630','AD205',NULL),(14,'Administration',1,'101',NULL,0,'2022-05-08 06:13:50.630','AD101',NULL),(15,'Administration',1,'102',NULL,0,'2022-05-08 06:13:50.630','AD102',NULL),(16,'Administration',1,'103',NULL,0,'2022-05-08 06:13:50.630','AD103',NULL),(17,'Administration',1,'104',NULL,0,'2022-05-08 06:13:50.630','AD104',NULL),(18,'Administration',1,'105',NULL,0,'2022-05-08 06:13:50.630','AD105',NULL),(19,'Administration',1,'106',NULL,0,'2022-05-08 06:13:50.630','AD106',NULL),(20,'Administration',1,'107',NULL,0,'2022-05-08 06:13:50.630','AD107',NULL),(21,'Administration',1,'108',NULL,0,'2022-05-08 06:13:50.630','AD108',NULL);
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `LocationMoveRequest_location_id_key` (`location_id`),
  CONSTRAINT `LocationMoveRequest_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Log`
--

LOCK TABLES `Log` WRITE;
/*!40000 ALTER TABLE `Log` DISABLE KEYS */;
INSERT INTO `Log` VALUES (1,'Department','Updated from Engineering 1 to Engineering','Update','2022-05-08 15:05:00.508','201800157@my.apiu.edu'),(2,'Department','Updated from department details','Update','2022-05-08 15:05:00.986','201800157@my.apiu.edu');
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
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` enum('small','medium','large','extra_large','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'other',
  `quotation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchasing_action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quotations` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` double DEFAULT '1',
  `quantity_unit` enum('kilogram','gram','litre','square_meter','cubic_meter','meter','pound','inches','other') COLLATE utf8mb4_unicode_ci DEFAULT 'other',
  `unit_price` double DEFAULT NULL,
  `vat` double DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_request_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderItem_order_request_id_fkey` (`order_request_id`),
  CONSTRAINT `OrderItem_order_request_id_fkey` FOREIGN KEY (`order_request_id`) REFERENCES `OrderRequest` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderItem`
--

LOCK TABLES `OrderItem` WRITE;
/*!40000 ALTER TABLE `OrderItem` DISABLE KEYS */;
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
  `order_status` enum('Pending','Approved','Purchased','Rejected','Canceled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
  `approval_status` tinyint(1) NOT NULL DEFAULT '0',
  `total_price` double DEFAULT NULL,
  `vat` double DEFAULT NULL,
  `order_date` datetime(3) DEFAULT NULL,
  `desired_date` datetime(3) DEFAULT NULL,
  `action_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remark` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderRequest_user_id_fkey` (`user_id`),
  CONSTRAINT `OrderRequest_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderRequest`
--

LOCK TABLES `OrderRequest` WRITE;
/*!40000 ALTER TABLE `OrderRequest` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderType`
--

LOCK TABLES `OrderType` WRITE;
/*!40000 ALTER TABLE `OrderType` DISABLE KEYS */;
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
INSERT INTO `Session` VALUES ('cl2x65x981120kwdrt719vn3z','7fc02dd7-b939-4b3d-819b-523c13ff9403','cl2x3ycry0869kwdr31i62buf','2022-06-07 10:45:48.570'),('cl2x8qfo81195kwdr7ppzehpw','50b1a8bb-a1a9-4572-95cf-854726574375','cl2x8qfo01188kwdrl0t7mi3h','2022-06-07 11:57:44.777'),('cl2x9p1a21311kwdrbmkx152c','dfbf3ea9-4051-4e49-8d1f-6cdd588bf92a','cl2x8qfo01188kwdrl0t7mi3h','2022-06-07 12:24:39.096'),('cl2xc6cc40664d8dro7wns4vd','fdbefb0a-005e-4cef-8858-54bee41fc0b8','cl2x8qfo01188kwdrl0t7mi3h','2022-06-07 13:34:05.809'),('cl2xd6fjk02057wdr5zgwi077','f77047d2-f44f-4dbc-bd5a-b0b9c8757237','cl2x8qfo01188kwdrl0t7mi3h','2022-06-07 14:02:09.581');
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
  `role` enum('customer','department_head','finance_officer','purchasing_officer','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
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
INSERT INTO `User` VALUES ('cl2x3ycry0869kwdr31i62buf','Dan Kazimoto','kazimotodan4@gmail.com','2022-05-08 10:45:48.563',NULL,'customer',1,3),('cl2x8qfo01188kwdrl0t7mi3h','Chanbroset Prach','201800157@my.apiu.edu','2022-05-08 14:02:09.573',NULL,'admin',1,1);
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
INSERT INTO `VerificationToken` VALUES ('kazimotodan4@gmail.com','3dfebb3acfb8ab874fb14801035c90a8e304d9fb119c050e353ff84827427040','2022-05-09 10:35:31.287'),('201800157','64cc7f37a1cd0a642e34df214205261b9afd9d3382641eea676bb5ecffdfcd80','2022-05-09 06:46:20.322'),('201800157','ba2199d9a96db711c3fc73084e298f89f7d3e02df0ae3f0fdf306d322b4ea506','2022-05-09 11:56:08.687'),('kazimotodan4@gmail.com','d32d7579ba00e0bc149f90ac8adaf9ff86ed5ece62f41f728b406d3a379b6496','2022-05-09 10:38:40.067');
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

-- Dump completed on 2022-05-08 22:09:38
