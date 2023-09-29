-- MariaDB dump 10.19  Distrib 10.4.27-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: sgfl_db
-- ------------------------------------------------------
-- Server version	10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_studentcartcourses`
--

DROP TABLE IF EXISTS `_studentcartcourses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_studentcartcourses` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL,
  UNIQUE KEY `_StudentCartCourses_AB_unique` (`A`,`B`),
  KEY `_StudentCartCourses_B_index` (`B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_studentcartcourses`
--

LOCK TABLES `_studentcartcourses` WRITE;
/*!40000 ALTER TABLE `_studentcartcourses` DISABLE KEYS */;
INSERT INTO `_studentcartcourses` VALUES (2,8),(2,13),(10,8),(16,8),(38,13);
/*!40000 ALTER TABLE `_studentcartcourses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_studentenrolledcourses`
--

DROP TABLE IF EXISTS `_studentenrolledcourses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_studentenrolledcourses` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL,
  UNIQUE KEY `_StudentEnrolledCourses_AB_unique` (`A`,`B`),
  KEY `_StudentEnrolledCourses_B_index` (`B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_studentenrolledcourses`
--

LOCK TABLES `_studentenrolledcourses` WRITE;
/*!40000 ALTER TABLE `_studentenrolledcourses` DISABLE KEYS */;
INSERT INTO `_studentenrolledcourses` VALUES (4,8),(6,8),(8,8),(22,8),(38,8);
/*!40000 ALTER TABLE `_studentenrolledcourses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'Climatisation'),(1,'Eléctricité'),(3,'Électronique Automobile');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `price` double NOT NULL,
  `trainerId` int(11) DEFAULT NULL,
  `categoryId` int(11) NOT NULL,
  `thumbnailUrl` varchar(191) NOT NULL,
  `videoUrl` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `published` enum('PENDING','PUBLISHED') NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY (`id`),
  KEY `Course_trainerId_idx` (`trainerId`),
  KEY `Course_categoryId_idx` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'Introduction à la Climatisation','Apprenez les bases de la climatisation',49.99,2,2,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(2,'Maintenance des Climatiseurs','Découvrez comment entretenir les climatiseurs',30.05,2,2,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(3,'Maintenance Préventive des Climatiseurs','Apprenez à effectuer une maintenance préventive',29.99,2,2,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(4,'Installation de Climatiseurs Résidentiels','Découvrez les techniques d\'installation résidentielle',59,2,2,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(5,'Réparation des Systèmes de Climatisation','Apprenez à réparer les systèmes défectueux',39.99,2,2,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(6,'Climatisation pour les Voitures','Explorez les systèmes de climatisation automobiles',49.99,2,2,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(7,'Gestion de l\'Énergie dans la Climatisation','Optimisez la gestion de l\'énergie',34.99,2,2,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(8,'Maintenance Industrielle de Climatiseurs','Apprenez la maintenance industrielle',79.99,2,2,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(9,'Climatisation Haute Efficacité','Découvrez les systèmes haute efficacité',54.99,2,2,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(10,'Réfrigération et Climatisation Commerciale','Apprenez la réfrigération commerciale',69.99,2,2,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(11,'Fondamentaux de l\'Électricité','Comprenez les principes de base de l\'électricité',39.99,2,1,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(12,'Sécurité Électrique','Apprenez les bonnes pratiques de sécurité électrique',52.03,2,1,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(13,'Câblage Électrique Résidentiel','Apprenez le câblage résidentiel',39.99,2,1,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(14,'Systèmes d\'Éclairage Économiques','Découvrez les systèmes d\'éclairage économes en énergie',29.99,2,1,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(15,'Sécurité Électrique Avancée','Approfondissez la sécurité électrique',49.99,2,1,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(16,'Câblage Électrique Industriel','Apprenez le câblage industriel',59.99,2,1,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(17,'Énergie Solaire Domestique','Découvrez l\'énergie solaire pour les maisons',69.99,2,1,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(18,'Automatisation des Systèmes Électriques','Apprenez l\'automatisation électrique',44.99,2,1,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(19,'Dépannage Électrique Avancé','Maîtrisez le dépannage électrique avancé',54.99,2,1,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(20,'Électricité pour les Bâtiments Commerciaux','Explorez l\'électricité commerciale',49.99,2,1,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(21,'Systèmes d\'Éclairage Architectural','Découvrez l\'éclairage architectural',39.99,2,1,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(22,'Électricité et Électronique de Base','Apprenez les fondamentaux',29.99,2,1,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(23,'Électronique Automobile Avancée','Explorez l\'électronique automobile avancée',49.99,3,3,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(24,'Dépannage des Systèmes Électroniques de Voitures','Apprenez à dépanner les systèmes électroniques des voitures',35,3,3,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(25,'Systèmes de Sécurité Automobile','Explorez les systèmes de sécurité',39.99,3,3,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(26,'Diagnostic des Électroniques de Voitures','Apprenez le diagnostic électronique',49.99,3,3,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(27,'Électronique de Moteurs Automobiles','Découvrez l\'électronique des moteurs',59.99,3,3,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(28,'Réparation des Systèmes Électroniques Automobiles','Apprenez la réparation automobile',44.99,3,3,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(29,'Électronique de Transmission Automobile','Explorez l\'électronique de transmission',54.99,3,3,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PENDING'),(30,'Systèmes de Navigation Automobile','Apprenez les systèmes de navigation',49.99,3,3,'https://via.placeholder.com/200x200','https://via.placeholder.com/400x300','2023-09-11 12:38:49.000','PUBLISHED'),(38,'Nouveau Cours Titre','Nouveau Cours Description',29,2,2,'https://firebasestorage.googleapis.com/v0/b/sgflproject.appspot.com/o/images%2F49228a16-bcda-4862-90bf-532b47b6666e?alt=media&token=e25db16f-b567-4084-99ca-200edceeef16','https://firebasestorage.googleapis.com/v0/b/sgflproject.appspot.com/o/video%2F5982ac8f-f9aa-44e8-ae9a-de5d51ae55c5?alt=media&token=6f5cc3ef-12b7-48ea-88f5-c6c573276d77','2023-09-21 12:10:11.627','PUBLISHED');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coursepayment`
--

DROP TABLE IF EXISTS `coursepayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coursepayment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `paymentIntentId` varchar(191) NOT NULL,
  `paymentStatus` enum('CREATED','SUCCEEDED','FAILED','CANCELLED') NOT NULL,
  `paymentAmount` double NOT NULL,
  `paymentMethod` enum('STRIPE') NOT NULL DEFAULT 'STRIPE',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `CoursePayment_paymentIntentId_key` (`paymentIntentId`),
  KEY `CoursePayment_courseId_idx` (`courseId`),
  KEY `CoursePayment_userId_idx` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursepayment`
--

LOCK TABLES `coursepayment` WRITE;
/*!40000 ALTER TABLE `coursepayment` DISABLE KEYS */;
/*!40000 ALTER TABLE `coursepayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(191) DEFAULT NULL,
  `lastName` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `gender` enum('MALE','FEMALE') DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `role` enum('USER','STUDENT','TRAINER','ADMIN') NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_phone_key` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'John','Doe','admin@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','123 Admin Street, Port-au-Prince, Haiti','+1234567890','ACTIVE','ADMIN'),(2,'Michael','Smith','michaelsmith@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','456 Trainer Avenue, Gonaïves, Haiti','+9876543211','ACTIVE','TRAINER'),(3,'Emily','Johnson','emilyjohnson@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','789 Trainer Road, Cap-Haïtien, Haiti','+1112223333','ACTIVE','TRAINER'),(4,'David','Brown','davidbrown@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','321 Trainer Lane, Les Cayes, Haiti','+4445556666','ACTIVE','TRAINER'),(5,'Sarah','Lee','sarahlee@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','654 Trainer Way, Jacmel, Haiti','+7778889999','ACTIVE','TRAINER'),(6,'Robert','Garcia','robertgarcia@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','111 User Street, Port-au-Prince, Haiti','+1111111111','ACTIVE','USER'),(7,'Sophia','Martinez','sophiamartinez@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','222 User Avenue, Gonaïves, Haiti','+2222222222','ACTIVE','USER'),(8,'James','Davis','jamesdavis@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','333 User Road, Cap-Haïtien, Haiti','+3333333333','ACTIVE','STUDENT'),(9,'Olivia','Taylor','oliviataylor@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','444 User Lane, Les Cayes, Haiti','+4444444444','ACTIVE','USER'),(10,'Michael','Miller','michaelmiller@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','555 User Way, Jacmel, Haiti','+5555555555','ACTIVE','USER'),(11,'John','Anderson','johnanderson@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','111 Student Street, Port-au-Prince, Haiti','+1111111112','ACTIVE','STUDENT'),(12,'Jane','Smith','janesmith@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','222 Student Avenue, Gonaïves, Haiti','+2222222223','ACTIVE','STUDENT'),(13,'Robert','Johnson','robertjohnson@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','333 Student Road, Cap-Haïtien, Haiti','+3333333334','ACTIVE','STUDENT'),(14,'Sophia','Brown','sophiabrown@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','444 Student Lane, Les Cayes, Haiti','+4444444445','ACTIVE','STUDENT'),(15,'James','Lee','jameslee@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','555 Student Way, Jacmel, Haiti','+5555555556','ACTIVE','STUDENT'),(16,'Olivia','Garcia','oliviagarcia@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','666 Student Street, Port-au-Prince, Haiti','+6666666667','ACTIVE','STUDENT'),(17,'David','Martinez','davidmartinez@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','777 Student Avenue, Gonaïves, Haiti','+7777777778','ACTIVE','STUDENT'),(18,'Sarah','Davis','sarahdavis@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','FEMALE','888 Student Road, Cap-Haïtien, Haiti','+8888888889','ACTIVE','STUDENT'),(19,'Michael','Taylor','michaeltaylor@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','999 Student Lane, Les Cayes, Haiti','+9999999990','ACTIVE','STUDENT'),(20,'Emily','Miller','emilymiller@example.com','$2a$10$FQlP/1EtokGffto9mbO7vukMaqW55n10doLZKGkCLn4v3BCSlHIci','MALE','1010 Student Way, Jacmel, Haiti','+1010101011','ACTIVE','STUDENT'),(41,'Daphnee','Joseph','josephdaphnee975@gmail.com','$2a$10$YXEKyGoFlDXFFaPxoMVXUeargECiMbJlbDuskpAWbbCGcpu66.YtG','MALE','07 Catalpa 19,Port-au-Prince','47440348','ACTIVE','USER'),(42,'Daphnee','Joseph','josephdaphnee9@gmail.com','$2a$10$5fjcrbuuhX2D8YYdzyFMiucq4Yts6.q1ZUEnhZEoo9HZiNbzRxpNe','FEMALE','07 Catalpa 19,Port-au-Prince','47440344','INACTIVE','STUDENT'),(43,NULL,NULL,'josephdaphnee97@gmail.com','$2a$10$kmg.6uZOlNVv2uUxqVjYge5NTaDyJKVqplLMNjppoINyA1P8HoYZi',NULL,NULL,NULL,'ACTIVE','USER'),(44,NULL,NULL,'jamesantonio@gmail.com','$2a$10$NLOIN4qElNhlidG/gWGcfuSfVf8C6ak/gcGok/lQmmpCtsgj83i7y',NULL,NULL,NULL,'ACTIVE','USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-29 11:56:43
