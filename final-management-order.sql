-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: order_management
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.22.04.1

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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) NOT NULL,
  `merchant_name` varchar(255) NOT NULL,
  `product` varchar(255) NOT NULL,
  `expired_date` date NOT NULL,
  `product_specification` text,
  `server` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (47,'Asep94','P-Store','VPS / RDP','2025-07-18','RAM 8GB 4CORE','tabiruloma@gmail.com','2025-06-19 00:51:01','2025-06-19 00:51:01',80000.00),(48,'Asep94','P-Store','VPS / RDP','2025-07-18','RAM 8GB 4CORE','imarpamudi@gmail.com','2025-06-19 00:52:04','2025-06-19 00:52:04',80000.00),(49,'approdite','P-Store','VPS / RDP','2025-07-17','RAM 8GB 4CORE','tabiruloma@gmail.com','2025-06-19 00:54:21','2025-06-19 00:54:21',80000.00),(50,'ferisipandu','P-Store','VPS / RDP','2025-07-17','RAM 8GB 4CORE','tabiruloma@gmail.com','2025-06-19 00:55:32','2025-06-19 00:55:32',80000.00),(51,'mmjbjsnis','P-Store','VPS / RDP','2025-07-14','RAM 8GB 4CORE','vitaminasi87@gmail.com','2025-06-19 00:59:25','2025-06-19 00:59:25',80000.00),(52,'hakikiyang','P-Store','VPS / RDP','2025-07-15','RAM 4GB 2CORE','vitaminasi87@gmail.com','2025-06-19 01:00:11','2025-06-19 01:00:11',50000.00),(53,'kevinxzuto','P-Store','VPS / RDP','2025-07-16','RAM 4GB 2CORE','vitaminasi87@gmail.com','2025-06-19 01:00:59','2025-06-19 01:00:59',50000.00),(54,'ryuzuu','P-Store','VPS / RDP','2025-07-11','RAM 8GB 4CORE','anwarmahro@gmail.com','2025-06-19 01:04:48','2025-06-19 01:04:48',80000.00),(55,'ryuzuu','P-Store','VPS / RDP','2025-07-11','RAM 8GB 4CORE','anwarmahro@gmail.com','2025-06-19 01:05:29','2025-06-19 01:05:29',80000.00),(56,'chensky','P-Store','VPS / RDP','2025-07-13','RAM 8GB 4CORE','anwarmahro@gmail.com','2025-06-19 01:06:11','2025-06-19 01:06:11',80000.00),(57,'cupiz','P-Store','VPS / RDP','2025-07-06','RAM 8GB 4CORE','alyonasiputrina@gmail.com','2025-06-19 01:09:46','2025-06-19 01:09:46',80000.00),(58,'michael1','P-Store','VPS / RDP','2025-07-09','RAM 4GB 2CORE','alyonasiputrina@gmail.com','2025-06-19 01:12:48','2025-06-19 01:12:48',50000.00),(59,'Dhinta','P-Store','VPS / RDP','2025-07-03','RAM 8GB 4CORE','sunjokonju@gmail.com','2025-06-19 01:17:49','2025-06-19 01:17:49',80000.00),(60,'404found','P-Store','VPS / RDP','2025-07-04','RAM 8GB 4CORE','sunjokonju@gmail.com','2025-06-19 01:20:20','2025-06-19 01:20:20',80000.00),(61,'tasimjoe','P-Store','VPS / RDP','2025-07-04','RAM 8GB 4CORE','sunjokonju@gmail.com','2025-06-19 01:21:17','2025-06-19 01:21:17',80000.00),(62,'sbotogel','P-Store','VPS / RDP','2025-07-01','RAM 32GB 8CORE','auliaatmajayadi@gmail.com','2025-06-19 02:05:30','2025-06-19 02:05:30',330000.00),(63,'deonsempak','P-Store','VPS / RDP','2025-07-01','RAM 4GB 2CORE','auliaatmajayadi@gmail.com','2025-06-19 02:06:24','2025-06-19 02:06:24',50000.00),(64,'ruwiyanto','P-Store','VPS / RDP','2025-07-01','RAM 8GB 4CORE','fahnudaroy@gmail.com','2025-06-19 02:07:18','2025-06-19 02:07:18',80000.00),(65,'eko39','Shopee','VPS / RDP','2025-07-19','RAM 8GB 4CORE','imarpamudi@gmail.com','2025-06-19 11:14:33','2025-06-19 11:14:33',80000.00),(66,'carson112233','Shopee','VPS / RDP','2025-06-26','RAM 16GB 8CORE','syafaitulnawara@gmail.com','2025-06-19 11:15:38','2025-06-19 11:15:38',50000.00),(67,'lostclone','P-Store','AKUN DO','2025-06-19','10 DROPLETS','fahrasyahmafahai@gmail.com','2025-06-19 13:25:15','2025-06-19 13:25:15',200000.00),(68,'xiongshan98','P-Store','VPS / RDP','2025-07-09','RAM 8GB 4CORE','azkiaasifa3@gmail.com','2025-06-20 13:22:34','2025-06-20 13:22:34',80000.00),(69,'xiongshan98','P-Store','VPS / RDP','2025-07-22','RAM 8GB 4CORE','anakpunkxz@gmail.com','2025-06-20 13:24:00','2025-06-20 13:24:00',80000.00),(70,'xiongshan98','P-Store','VPS / RDP','2025-07-22','RAM 8GB 4CORE','anakpunkxz@gmail.com','2025-06-20 13:24:28','2025-06-20 13:24:28',80000.00),(71,'rencarnation8989','P-Store','AKUN DO','2025-06-21','10 DROPLETS','sarufialduputra@gmail.com','2025-06-21 09:02:39','2025-06-21 09:02:39',200000.00),(72,'RudyLast','P-Store','VPS / RDP','2025-07-22','RAM 4GB 2CORE','syafaitulnawara@gmail.com','2025-06-21 21:11:32','2025-06-21 21:11:32',50000.00),(73,'RudyLast','P-Store','VPS / RDP','2025-07-22','RAM 4GB 2CORE','syafaitulnawara@gmail.com','2025-06-21 21:11:57','2025-06-21 21:11:57',50000.00),(74,'RudyLast','P-Store','VPS / RDP','2025-07-22','RAM 4GB 2CORE','syafaitulnawara@gmail.com','2025-06-21 21:12:19','2025-06-21 21:12:19',50000.00),(75,'RudyLast','P-Store','VPS / RDP','2025-07-22','RAM 4GB 2CORE','syafaitulnawara@gmail.com','2025-06-21 21:12:46','2025-06-21 21:12:46',50000.00),(76,'RudyLast','P-Store','VPS / RDP','2025-07-22','RAM 4GB 2CORE','syafaitulnawara@gmail.com','2025-06-21 21:13:06','2025-06-21 21:13:06',50000.00),(77,'4616','WhatsApp','VPS / RDP','2025-07-22','RAM 4GB 2CORE','novalandhi@gmail.com','2025-06-22 07:59:42','2025-06-22 08:16:00',60000.00),(78,'renereberkah','Shopee','VPS / RDP','2025-07-22','RAM 32GB 8CORE','nevanfbv@gmail.com','2025-06-22 09:20:41','2025-06-22 09:20:41',285000.00),(79,'comunistream22','Shopee','VPS / RDP','2025-07-22','RAM 4GB 2CORE','novalandhi@gmail.com','2025-06-22 11:05:32','2025-06-22 13:06:05',57000.00),(80,'gifthink','Shopee','VPS / RDP','2025-07-23','RAM 16GB 8CORE','sabrieopemobama@gmail.com','2025-06-23 05:05:02','2025-06-23 05:05:02',144400.00),(81,'8495','WhatsApp','VPS / RDP','2025-06-30','RAM 8GB 4CORE','novalandhi@gmail.com','2025-06-23 05:05:53','2025-06-23 05:05:53',30000.00),(82,'sarafajira','P-Store','VPS / RDP','2025-07-23','RAM 32GB 8CORE','sabrieopemobama@gmail.com','2025-06-23 10:43:04','2025-06-23 10:43:04',330000.00),(83,'Lewmr','P-Store','AKUN DO','2025-06-23','10 DROPLETS','hardlamsneakeli@gmail.com','2025-06-23 10:43:51','2025-06-23 10:43:51',200000.00),(84,'renerebekah','Shopee','VPS / RDP','2025-07-23','RAM 32GB 8CORE','sutasipuakmulae@gmail.com','2025-06-23 10:44:42','2025-06-23 10:44:42',285000.00),(85,'renereberkah','Shopee','VPS / RDP','2025-07-23','RAM 32GB 8CORE','sefraldomamufar@gmail.com','2025-06-23 10:45:13','2025-06-23 10:45:13',285000.00),(87,'renereberkah','Shopee','VPS / RDP','2025-07-23','RAM 32GB 8CORE','surmarsihomulrs@gmail.com','2025-06-23 10:46:33','2025-06-23 10:46:33',285000.00),(88,'renereberkah','Shopee','VPS / RDP','2025-07-23','RAM 32GB 8CORE','saoemspalemoela@gmail.com','2025-06-23 10:47:24','2025-06-23 10:47:24',285000.00),(89,'2338','WhatsApp','AKUN DO','2025-06-23','10 DROPLETS','risamukajarilos@gmail.com','2025-06-23 13:52:31','2025-06-23 13:52:31',150000.00),(90,'2338','WhatsApp','AKUN DO','2025-06-23','10 DROPLETS','shamarapedmorea@gmail.com','2025-06-23 13:53:01','2025-06-23 13:53:01',150000.00),(91,'hokdertiayena','P-Store','VPS / RDP','2025-07-24','RAM 8GB 4CORE','novalandhi@gmail.com','2025-06-24 06:37:39','2025-06-24 06:37:39',80000.00),(92,'tanvah_memvesonah','Shopee','VPS / RDP','2025-07-24','RAM 4GB 2CORE','nevanfbv@gmail.com','2025-06-24 11:15:14','2025-06-24 11:15:14',57000.00);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `username_3` (`username`),
  UNIQUE KEY `username_4` (`username`),
  UNIQUE KEY `username_5` (`username`),
  UNIQUE KEY `username_6` (`username`),
  UNIQUE KEY `username_7` (`username`),
  UNIQUE KEY `username_8` (`username`),
  UNIQUE KEY `username_9` (`username`),
  UNIQUE KEY `username_10` (`username`),
  UNIQUE KEY `username_11` (`username`),
  UNIQUE KEY `username_12` (`username`),
  UNIQUE KEY `username_13` (`username`),
  UNIQUE KEY `username_14` (`username`),
  UNIQUE KEY `username_15` (`username`),
  UNIQUE KEY `username_16` (`username`),
  UNIQUE KEY `username_17` (`username`),
  UNIQUE KEY `username_18` (`username`),
  UNIQUE KEY `username_19` (`username`),
  UNIQUE KEY `username_20` (`username`),
  UNIQUE KEY `username_21` (`username`),
  UNIQUE KEY `username_22` (`username`),
  UNIQUE KEY `username_23` (`username`),
  UNIQUE KEY `username_24` (`username`),
  UNIQUE KEY `username_25` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'admin','$2b$10$eEGZgPT/4r9q0TcUoxlejusYPvhSNOmt.xwSmLjvo6GSRbfyzACS2','2025-06-20 09:14:06','2025-06-20 09:14:06');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-24 16:58:25
