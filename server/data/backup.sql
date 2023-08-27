-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: sgfl_db
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('800eedd9-855e-4aed-942a-d3285f43a364','8bacd21105e15dd0a9006ca11c20004246d11c2cdf1583513e5cd02eeed120d5','2023-08-21 15:22:47.444','20230821152247_init',NULL,NULL,'2023-08-21 15:22:47.436',1),('d3d753ce-c48d-47bc-baa9-395774077aeb','beaee2e45ba4740f8827e856901652da60c403d7026180b0c5e4d70ff7266b20','2023-07-29 02:44:03.895','20230729024403_init',NULL,NULL,'2023-07-29 02:44:03.874',1),('d925bcf1-eae1-4497-87c5-0159625a26dd','124f957eeacc31344c19fee000945393fbf00519fa0c3f4aafaaae14582f801e','2023-07-30 06:05:19.836','20230730060519_add_create_date_field',NULL,NULL,'2023-07-30 06:05:19.827',1),('edac7297-c549-4eeb-89df-eb7778bc10ba','d2b1ff4e83f0e489cb800f647dd0207f27abe66b74d666bd48be5df8685a5865','2023-08-07 16:37:09.578','20230807163709_add_courses_in_cart_field',NULL,NULL,'2023-08-07 16:37:09.565',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_StudentCartCourses`
--

DROP TABLE IF EXISTS `_StudentCartCourses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_StudentCartCourses` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_StudentCartCourses_AB_unique` (`A`,`B`),
  KEY `_StudentCartCourses_B_index` (`B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_StudentCartCourses`
--

LOCK TABLES `_StudentCartCourses` WRITE;
/*!40000 ALTER TABLE `_StudentCartCourses` DISABLE KEYS */;
/*!40000 ALTER TABLE `_StudentCartCourses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_StudentEnrolledCourses`
--

DROP TABLE IF EXISTS `_StudentEnrolledCourses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_StudentEnrolledCourses` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_StudentEnrolledCourses_AB_unique` (`A`,`B`),
  KEY `_StudentEnrolledCourses_B_index` (`B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_StudentEnrolledCourses`
--

LOCK TABLES `_StudentEnrolledCourses` WRITE;
/*!40000 ALTER TABLE `_StudentEnrolledCourses` DISABLE KEYS */;
/*!40000 ALTER TABLE `_StudentEnrolledCourses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (2,'Climatisation'),(1,'Électricité'),(3,'Électronique Automobile');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Course`
--

DROP TABLE IF EXISTS `Course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `trainerId` int DEFAULT NULL,
  `categoryId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `published` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Course_trainerId_idx` (`trainerId`),
  KEY `Course_categoryId_idx` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Course`
--

LOCK TABLES `Course` WRITE;
/*!40000 ALTER TABLE `Course` DISABLE KEYS */;
INSERT INTO `Course` VALUES (1,'Introduction à l\'électricité','Découvrez les bases de l\'électricité et des circuits',50,1,1,'2023-07-30 02:05:19.828',0),(2,'Câblage résidentiel','Apprenez à câbler un réseau électrique résidentiel',60,2,1,'2023-07-30 02:05:19.828',0),(3,'Sécurité électrique','Les bonnes pratiques en matière de sécurité électrique',55,3,1,'2023-07-30 02:05:19.828',0),(4,'Introduction à la climatisation','Découvrez les principes de base de la climatisation',70,4,2,'2023-07-30 02:05:19.828',0),(5,'Entretien des systèmes HVAC','Techniques d\'entretien des systèmes de chauffage, ventilation et climatisation',75,1,2,'2023-07-30 02:05:19.828',0),(6,'Climatisation commerciale','Apprenez sur la climatisation pour les espaces commerciaux',80,2,2,'2023-07-30 02:05:19.828',0),(7,'Introduction à l\'autotronique','Les bases de l\'électronique automobile',65,3,3,'2023-07-30 02:05:19.828',0),(8,'Diagnostic des systèmes embarqués','Techniques de diagnostic des systèmes électroniques embarqués',75,4,3,'2023-07-30 02:05:19.828',0),(9,'Réparation des systèmes ABS','Apprenez à réparer les systèmes de freinage ABS',70,1,3,'2023-07-30 02:05:19.828',0),(10,'Électricité industrielle','Technologies électriques pour l\'industrie',80,2,1,'2023-07-30 02:05:19.828',0),(11,'Installation de systèmes photovoltaïques','Apprenez à installer des systèmes solaires photovoltaïques',85,3,1,'2023-07-30 02:05:19.828',0),(12,'Électricité marine','Technologies électriques pour les bateaux et navires',75,4,1,'2023-07-30 02:05:19.828',0),(13,'Climatisation industrielle','Climatisation pour les installations industrielles',90,1,2,'2023-07-30 02:05:19.828',0),(14,'Climatisation écologique','Technologies de climatisation respectueuses de l\'environnement',80,2,2,'2023-07-30 02:05:19.828',0),(15,'Réparation des compresseurs','Apprenez à réparer les compresseurs de climatisation',70,3,2,'2023-07-30 02:05:19.828',0),(16,'Électronique embarquée','Technologies électroniques pour les véhicules',75,4,3,'2023-07-30 02:05:19.828',0),(17,'Réparation des systèmes de transmission','Techniques de réparation des transmissions automatiques',80,1,3,'2023-07-30 02:05:19.828',0),(18,'Systèmes de contrôle du moteur','Apprenez sur les systèmes de contrôle moteur',85,2,3,'2023-07-30 02:05:19.828',0),(19,'Éclairage durable','Découvrez les solutions d\'éclairage durable',55,3,1,'2023-07-30 02:05:19.828',0),(20,'Électricité verte','Les dernières tendances en électricité écologique',70,4,1,'2023-07-30 02:05:19.828',0),(21,'Introduction aux énergies renouvelables','Apprenez sur les sources d\'énergie renouvelables',80,1,1,'2023-07-30 02:05:19.828',0),(22,'Climatisation résidentielle','Techniques d\'installation et d\'entretien pour la climatisation résidentielle',65,2,2,'2023-07-30 02:05:19.828',0),(23,'Climatisation automobile','Apprenez sur la climatisation des voitures',70,3,2,'2023-07-30 02:05:19.828',0),(24,'Climatisation sans gaz réfrigérant','Technologies alternatives pour la climatisation',75,4,2,'2023-07-30 02:05:19.828',0),(25,'Réparation des systèmes électriques automobiles','Techniques de réparation des systèmes électriques des voitures',70,1,3,'2023-07-30 02:05:19.828',0),(26,'Systèmes d\'éclairage automobile','Apprenez sur les systèmes d\'éclairage des voitures',60,2,3,'2023-07-30 02:05:19.828',0),(27,'Diagnostic des pannes électroniques','Techniques de diagnostic des pannes électroniques des véhicules',75,3,3,'2023-07-30 02:05:19.828',0),(28,'Électricité solaire pour l\'habitat','Apprenez à utiliser l\'électricité solaire dans les maisons',85,4,1,'2023-07-30 02:05:19.828',0),(29,'Nouvelles technologies électriques','Découvrez les dernières avancées en matière de technologies électriques',90,1,1,'2023-07-30 02:05:19.828',0),(30,'Maintenance préventive électrique','Techniques de maintenance préventive pour les installations électriques',80,2,1,'2023-07-30 02:05:19.828',0);
/*!40000 ALTER TABLE `Course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('MALE','FEMALE') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `role` enum('USER','STUDENT','TRAINER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_phone_key` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'John','Doe','admin@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','123 Admin Street, Port-au-Prince, Haiti','+1234567890','ACTIVE','ADMIN'),(2,'Michael','Smith','michaelsmith@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','456 Trainer Avenue, Gonaïves, Haiti','+9876543211','ACTIVE','TRAINER'),(3,'Emily','Johnson','emilyjohnson@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','789 Trainer Road, Cap-Haïtien, Haiti','+1112223333','ACTIVE','TRAINER'),(4,'David','Brown','davidbrown@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','321 Trainer Lane, Les Cayes, Haiti','+4445556666','ACTIVE','TRAINER'),(5,'Sarah','Lee','sarahlee@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','654 Trainer Way, Jacmel, Haiti','+7778889999','ACTIVE','TRAINER'),(6,'Robert','Garcia','robertgarcia@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','111 User Street, Port-au-Prince, Haiti','+1111111111','ACTIVE','USER'),(7,'Sophia','Martinez','sophiamartinez@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','222 User Avenue, Gonaïves, Haiti','+2222222222','ACTIVE','USER'),(8,'James','Davis','jamesdavis@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','333 User Road, Cap-Haïtien, Haiti','+3333333333','ACTIVE','USER'),(9,'Olivia','Taylor','oliviataylor@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','444 User Lane, Les Cayes, Haiti','+4444444444','ACTIVE','USER'),(10,'Michael','Miller','michaelmiller@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','555 User Way, Jacmel, Haiti','+5555555555','ACTIVE','USER'),(11,'John','Anderson','johnanderson@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','111 Student Street, Port-au-Prince, Haiti','+1111111112','ACTIVE','STUDENT'),(12,'Jane','Smith','janesmith@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','222 Student Avenue, Gonaïves, Haiti','+2222222223','ACTIVE','STUDENT'),(13,'Robert','Johnson','robertjohnson@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','333 Student Road, Cap-Haïtien, Haiti','+3333333334','ACTIVE','STUDENT'),(14,'Sophia','Brown','sophiabrown@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','444 Student Lane, Les Cayes, Haiti','+4444444445','ACTIVE','STUDENT'),(15,'James','Lee','jameslee@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','555 Student Way, Jacmel, Haiti','+5555555556','ACTIVE','STUDENT'),(16,'Olivia','Garcia','oliviagarcia@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','666 Student Street, Port-au-Prince, Haiti','+6666666667','ACTIVE','STUDENT'),(17,'David','Martinez','davidmartinez@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','777 Student Avenue, Gonaïves, Haiti','+7777777778','ACTIVE','STUDENT'),(18,'Sarah','Davis','sarahdavis@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','888 Student Road, Cap-Haïtien, Haiti','+8888888889','ACTIVE','STUDENT'),(19,'Michael','Taylor','michaeltaylor@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','999 Student Lane, Les Cayes, Haiti','+9999999990','ACTIVE','STUDENT'),(20,'Emily','Miller','emilymiller@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','1010 Student Way, Jacmel, Haiti','+1010101011','ACTIVE','STUDENT'),(38,'Daphnee','Joseph','josephdaphnee975@gmail.com','$2a$10$ORe8kXqC2k759N2F.nYNeeIYC49c/6sMV6MIZ4QCGqTMHYJm9nAw2','MALE','07 Catalpa 19,Port-au-Prince','47440348','ACTIVE','USER');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-27  8:31:10
