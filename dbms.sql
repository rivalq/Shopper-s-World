-- MariaDB dump 10.19  Distrib 10.6.4-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: dbms
-- ------------------------------------------------------
-- Server version	10.6.4-MariaDB

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `size` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cloth_id` int(11) NOT NULL,
  PRIMARY KEY (`username`,`cloth_id`,`size`),
  KEY `fk_cart_1` (`cloth_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  CONSTRAINT `fk_cart_1` FOREIGN KEY (`cloth_id`) REFERENCES `marketplace` (`cloth_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cloth`
--

DROP TABLE IF EXISTS `cloth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cloth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_description` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `long_description` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brand` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cloth`
--

LOCK TABLES `cloth` WRITE;
/*!40000 ALTER TABLE `cloth` DISABLE KEYS */;
INSERT INTO `cloth` VALUES (1,'Tuxedo','A tux is a fancy black suit that you might wear, along with a bow tie, to your senior prom or your wedding','Image result for tuxedo description This type of jacket traditionally has four buttons and fastens with either the bottom row (known as 4-on-1 style)or 										    		both rows (4-on-2) depending on the cut. The most traditional model of tuxedo jacket: black and \n											single-breasted with one closing button, peaked lapels with silk facings, and no rear vents. Changed','Black Lapel','Suit'),(2,'Adidas T Shirt','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.','Adidas','T Shirt'),(3,'Levis Trouser','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.','Levis','Trouser'),(4,'Men\'s Cotton Hooded Hoodie','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.','Katso','Hoodie'),(5,'Printoctopus','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.','PrintOctopus','Tshirt'),(9,'Boy\'s Floral Regular fit Polo','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Changed','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.','Allen Solly Junior','T - Shirt'),(10,'Men\'s Polo','Lorem Ipsum is simply a dummy text of the printing and typesetting industry. ','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. ','Allen Solly','T - Shirt');
/*!40000 ALTER TABLE `cloth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `db_variables`
--

DROP TABLE IF EXISTS `db_variables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `db_variables` (
  `variable` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` int(11) DEFAULT NULL,
  PRIMARY KEY (`variable`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `db_variables`
--

LOCK TABLES `db_variables` WRITE;
/*!40000 ALTER TABLE `db_variables` DISABLE KEYS */;
INSERT INTO `db_variables` VALUES ('Hide out of Stock',0);
/*!40000 ALTER TABLE `db_variables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `features` (
  `cloth_id` int(11) DEFAULT NULL,
  `feature_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `cloth_id` (`cloth_id`),
  CONSTRAINT `features_ibfk_1` FOREIGN KEY (`cloth_id`) REFERENCES `marketplace` (`cloth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (18,'Neck Style','Polo'),(42,'Sleeve Length','Three-Quarter Sleeves'),(42,'Top Shape','A-Line'),(42,'Top Type','Kurta'),(42,'Bottom Type','Palazzos'),(42,'Dupatta','With Dupatta'),(42,'Top Pattern','Printed'),(42,'Top Design Styling','Regular'),(42,'Top Hemline','Straight'),(42,'Top Length','Calf Length'),(42,'Neck','V-Neck'),(42,'Print or Pattern Type','Ethnic Motifs'),(42,'Bottom Pattern','Printed'),(42,'Bottom Closure','Slip-On'),(42,'Waistband','Partially Elasticated'),(42,'Occasion','Daily'),(42,'Weave Pattern','Regular'),(42,'Weave Type','Machine Weave'),(42,'Pattern Coverage','Small'),(42,'Dupatta Pattern','Printed'),(42,'Dupatta Border','Printed'),(43,'Distress','Clean Look'),(43,'Waist Rise','Mid-Rise'),(43,'Fade','Heavy Fade'),(43,'Shade','Dark'),(43,'Fit','Tapered Fit'),(43,'Length','Regular'),(43,'Waistband','With belt loops'),(43,'Stretch','Stretchable'),(43,'Closure','Button and Zip'),(43,'Reversible','No'),(43,'Effects','Whiskers and Chevrons'),(43,'Number of Pockets','5'),(43,'Occasion','Casual'),(44,'Sleeve Length','Long Sleeves'),(44,'Type','Denim Jacket'),(44,'Collar','Spread Collar'),(44,'Print or Pattern Type','Solid'),(44,'Length','Regular'),(44,'Closure','Button'),(44,'Lining Fabric','Unlined'),(44,'Number of Pockets','4'),(44,'Hemline','Straight'),(44,'Surface Styling','Patchwork'),(44,'Occasion','Casual'),(44,'Surface Styling','Patchwork'),(45,'Sleeve Length','Long Sleeves'),(45,'Type','Bomber'),(45,'Collar','Stand Collar'),(45,'Print or Pattern Type','Solid'),(45,'Length','Regular'),(45,'Closure','Zip'),(45,'Lining Fabric','Polyester'),(45,'Number of Pockets','2'),(45,'Hemline','Straight'),(45,'Occasion','Casual'),(46,'Sleeve Length','Long Sleeves'),(46,'Type','Tailored Jacket'),(46,'Collar','Stand Collar'),(46,'Print or Pattern Type','Solid'),(46,'Length','Regular'),(46,'Closure','Zip'),(46,'Lining Fabric','Unlined'),(46,'Number of Pockets','2'),(46,'Hemline','Hem with Toggle'),(46,'Occasion','Casual'),(47,'Distress','Clean Look'),(47,'Waist Rise','Mid-Rise'),(47,'Fade','No Fade'),(47,'Shade','Light'),(47,'Fit','Slim Fit'),(47,'Length','Regular'),(47,'Waistband','With belt loops'),(47,'Stretch','Stretchable'),(47,'Closure','Button and Zip'),(47,'Reversible','No'),(47,'Number of Pockets','5'),(47,'Occasion','Casual'),(48,'Sleeve Length','Long Sleeves'),(48,'Type','Bomber'),(48,'Collar','Mock Collar'),(48,'Print or Pattern Type','Solid'),(48,'Length','Regular'),(48,'Closure','Zip'),(48,'Lining Fabric','Unlined'),(48,'Number of Pockets','2'),(48,'Hemline','Straight'),(48,'Occasion','Casual'),(49,'Sleeve Length','Three-Quarter Sleeves'),(49,'Top Shape','Anarkali'),(49,'Top Type','Kurta'),(49,'Bottom Type','Trousers'),(49,'Dupatta','With Dupatta'),(49,'Top Pattern','Printed'),(49,'Top Design Styling','Empire'),(49,'Top Hemline','Flared'),(49,'Top Length','Calf Length'),(49,'Neck','Round Neck'),(49,'Print or Pattern Type','Floral'),(49,'Bottom Pattern','Printed'),(49,'Bottom Closure','Slip-On'),(49,'Waistband','Elasticated'),(49,'Occasion','Festive'),(49,'Weave Pattern','Regular'),(49,'Weave Type','Machine Weave'),(49,'Pattern Coverage','Large'),(49,'Dupatta Pattern','Printed'),(49,'Dupatta Border','Printed'),(50,'Sleeve Length','Three-Quarter Sleeves'),(50,'Shape','Straight'),(50,'Neck','V-Neck'),(50,'Print or Pattern Type','Floral'),(50,'Design Styling','Regular'),(50,'Slit Detail','Side Slits'),(50,'Length','Calf Length'),(50,'Hemline','Straight'),(50,'Colour Family','Pastel'),(50,'Weave Pattern','Regular'),(50,'Weave Type','Machine Weave'),(50,'Occasion','Daily'),(57,'Sleeve Length','Three-Quarter Sleeves'),(57,'Type','Padded Jacket'),(57,'Collar','Hooded'),(57,'Print or Pattern Type','Solid'),(57,'Length','Regular'),(57,'Closure','Button'),(57,'Lining Fabric','Unlined'),(57,'Number of Pockets','2'),(57,'Hemline','Straight'),(57,'Occasion','Casual'),(58,'Sleeve Length','Long Sleeves'),(58,'Neck','Hood'),(58,'Pattern','Colourblocked'),(58,'Length','Regular'),(58,'Type','Pullover'),(58,'Print or Pattern Type','Typography'),(58,'Hood','Hooded'),(58,'Number of Pockets','1'),(58,'Occasion','Casual'),(58,'Hemline','Straight'),(59,'Waist Rise','Mid-Rise'),(59,'Length','Regular'),(59,'Fit','Regular Fit'),(59,'Print or Pattern Type','Solid'),(59,'Closure','Drawstring'),(59,'Type of Pleat','Flat-Front'),(59,'Weave Type','Woven'),(59,'Fly Type','No Fly'),(59,'Number of Pockets','6'),(59,'Features','Plain'),(59,'Main Trend','Utility or Military Inspired'),(59,'Occasion','Casual'),(60,'Waist Rise','Mid-Rise'),(60,'Length','Regular'),(60,'Fit','Tapered Fit'),(60,'Print or Pattern Type','Solid'),(60,'Closure','Button'),(60,'Type of Pleat','Flat-Front'),(60,'Weave Type','Woven'),(60,'Fly Type','Zip'),(60,'Number of Pockets','5'),(60,'Features','Plain'),(60,'Main Trend','New Basics'),(60,'Occasion','Casual'),(61,'Distress','Highly Distressed'),(61,'Waist Rise','Mid-Rise'),(61,'Fade','No Fade'),(61,'Shade','Dark'),(61,'Fit','Skinny Fit'),(61,'Length','Regular'),(61,'Waistband','With belt loops'),(61,'Stretch','Stretchable'),(61,'Closure','Button and Zip'),(61,'Reversible','No'),(61,'Number of Pockets','5'),(61,'Occasion','Casual'),(62,'Sleeve Length','Short Sleeves'),(62,'Shape','Anarkali'),(62,'Neck','Round Neck'),(62,'Print or Pattern Type','Ethnic Motifs'),(62,'Design Styling','Layered'),(62,'Slit Detail','Front Slit'),(62,'Ornamentation','Thread Work'),(62,'Length','Ankle Length'),(62,'Hemline','Flared'),(62,'Colour Family','Earthy'),(62,'Weave Pattern','Regular'),(62,'Weave Type','Machine Weave'),(62,'Occasion','Daily'),(63,'Sleeve Length','Long Sleeves'),(63,'Type','Padded Jacket'),(63,'Collar','Mock Collar'),(63,'Print or Pattern Type','Solid'),(63,'Length','Regular'),(63,'Closure','Zip'),(63,'Lining Fabric','Polyester'),(63,'Number of Pockets','2'),(63,'Hemline','Straight'),(63,'Occasion','Sports'),(64,'Sleeve Length','Long Sleeves'),(64,'Neck','Hood'),(64,'Pattern','Printed'),(64,'Length','Regular'),(64,'Type','Pullover'),(64,'Print or Pattern Type','Graphic'),(64,'Hood','Hooded'),(64,'Number of Pockets','2'),(64,'Occasion','Casual'),(64,'Hemline','Straight'),(65,'Sleeve Length','Long Sleeves'),(65,'Type','Biker Jacket'),(65,'Collar','Stand Collar'),(65,'Print or Pattern Type','Solid'),(65,'Length','Regular'),(65,'Closure','Zip'),(65,'Lining Fabric','Polyester'),(65,'Number of Pockets','5'),(65,'Hemline','Straight'),(65,'Occasion','Casual'),(66,'Sleeve Length','Three-Quarter Sleeves'),(66,'Top Shape','Straight'),(66,'Top Type','Kurta'),(66,'Bottom Type','Trousers'),(66,'Dupatta','With Dupatta'),(66,'Top Pattern','Printed'),(66,'Top Design Styling','Regular'),(66,'Top Hemline','Straight'),(66,'Top Length','Calf Length'),(66,'Neck','Round Neck'),(66,'Print or Pattern Type','Geometric'),(66,'Bottom Pattern','Solid'),(66,'Bottom Closure','Slip-On'),(66,'Waistband','Partially Elasticated'),(66,'Occasion','Festive'),(66,'Weave Pattern','Regular'),(66,'Weave Type','Machine Weave'),(66,'Pattern Coverage','Yoke or Border'),(66,'Dupatta Pattern','Printed'),(66,'Dupatta Border','Taping'),(67,'Distress','Clean Look'),(67,'Waist Rise','Mid-Rise'),(67,'Fade','No Fade'),(67,'Shade','Dark'),(67,'Fit','Slim Fit'),(67,'Length','Regular'),(67,'Waistband','With belt loops'),(67,'Stretch','Stretchable'),(67,'Closure','Button and Zip'),(67,'Reversible','No'),(67,'Number of Pockets','5'),(67,'Occasion','Casual'),(68,'Distress','Clean Look'),(68,'Waist Rise','Mid-Rise'),(68,'Fade','No Fade'),(68,'Shade','Medium'),(68,'Fit','Skinny Fit'),(68,'Length','Regular'),(68,'Waistband','With belt loops'),(68,'Stretch','Stretchable'),(68,'Closure','Button and Zip'),(68,'Reversible','No'),(68,'Number of Pockets','5'),(68,'Occasion','Casual'),(69,'Sleeve Length','Three-Quarter Sleeves'),(69,'Top Shape','Straight'),(69,'Top Type','Kurta'),(69,'Bottom Type','Trousers'),(69,'Dupatta','With Dupatta'),(69,'Top Pattern','Yoke Design'),(69,'Top Design Styling','Regular'),(69,'Top Hemline','Straight'),(69,'Top Length','Calf Length'),(69,'Neck','Round Neck'),(69,'Print or Pattern Type','Ethnic Motifs'),(69,'Bottom Pattern','Solid'),(69,'Bottom Closure','Slip-On'),(69,'Waistband','Elasticated'),(69,'Occasion','Festive'),(69,'Ornamentation','Zari'),(69,'Weave Pattern','Regular'),(69,'Weave Type','Machine Weave'),(69,'Pattern Coverage','Yoke or Border'),(69,'Dupatta Pattern','Embroidered');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `url` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cloth_id` int(11) NOT NULL,
  PRIMARY KEY (`url`,`cloth_id`),
  KEY `cloth_id` (`cloth_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`cloth_id`) REFERENCES `marketplace` (`cloth_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES ('/images/marketplace/10/profile',10),('/images/marketplace/11/profile',11),('/images/marketplace/14/1',14),('/images/marketplace/14/profile',14),('/images/marketplace/18/1',18),('/images/marketplace/18/profile',18),('/images/marketplace/42/1',42),('/images/marketplace/42/2',42),('/images/marketplace/42/3',42),('/images/marketplace/42/4',42),('/images/marketplace/42/5',42),('/images/marketplace/42/profile',42),('/images/marketplace/43/1',43),('/images/marketplace/43/2',43),('/images/marketplace/43/3',43),('/images/marketplace/43/4',43),('/images/marketplace/43/profile',43),('/images/marketplace/44/1',44),('/images/marketplace/44/2',44),('/images/marketplace/44/3',44),('/images/marketplace/44/4',44),('/images/marketplace/44/5',44),('/images/marketplace/44/profile',44),('/images/marketplace/45/1',45),('/images/marketplace/45/2',45),('/images/marketplace/45/3',45),('/images/marketplace/45/4',45),('/images/marketplace/45/profile',45),('/images/marketplace/46/1',46),('/images/marketplace/46/2',46),('/images/marketplace/46/3',46),('/images/marketplace/46/4',46),('/images/marketplace/46/profile',46),('/images/marketplace/47/1',47),('/images/marketplace/47/2',47),('/images/marketplace/47/3',47),('/images/marketplace/47/4',47),('/images/marketplace/47/5',47),('/images/marketplace/47/profile',47),('/images/marketplace/48/1',48),('/images/marketplace/48/2',48),('/images/marketplace/48/3',48),('/images/marketplace/48/4',48),('/images/marketplace/48/5',48),('/images/marketplace/48/profile',48),('/images/marketplace/49/1',49),('/images/marketplace/49/2',49),('/images/marketplace/49/3',49),('/images/marketplace/49/4',49),('/images/marketplace/49/5',49),('/images/marketplace/49/profile',49),('/images/marketplace/50/1',50),('/images/marketplace/50/2',50),('/images/marketplace/50/3',50),('/images/marketplace/50/profile',50),('/images/marketplace/57/1',57),('/images/marketplace/57/2',57),('/images/marketplace/57/3',57),('/images/marketplace/57/4',57),('/images/marketplace/57/5',57),('/images/marketplace/57/profile',57),('/images/marketplace/58/1',58),('/images/marketplace/58/2',58),('/images/marketplace/58/3',58),('/images/marketplace/58/4',58),('/images/marketplace/58/profile',58),('/images/marketplace/59/1',59),('/images/marketplace/59/2',59),('/images/marketplace/59/3',59),('/images/marketplace/59/4',59),('/images/marketplace/59/profile',59),('/images/marketplace/60/1',60),('/images/marketplace/60/2',60),('/images/marketplace/60/3',60),('/images/marketplace/60/4',60),('/images/marketplace/60/profile',60),('/images/marketplace/61/1',61),('/images/marketplace/61/2',61),('/images/marketplace/61/3',61),('/images/marketplace/61/4',61),('/images/marketplace/61/5',61),('/images/marketplace/61/profile',61),('/images/marketplace/62/1',62),('/images/marketplace/62/2',62),('/images/marketplace/62/3',62),('/images/marketplace/62/4',62),('/images/marketplace/62/profile',62),('/images/marketplace/63/1',63),('/images/marketplace/63/2',63),('/images/marketplace/63/3',63),('/images/marketplace/63/4',63),('/images/marketplace/63/5',63),('/images/marketplace/63/profile',63),('/images/marketplace/64/1',64),('/images/marketplace/64/2',64),('/images/marketplace/64/3',64),('/images/marketplace/64/4',64),('/images/marketplace/64/profile',64),('/images/marketplace/65/1',65),('/images/marketplace/65/2',65),('/images/marketplace/65/3',65),('/images/marketplace/65/4',65),('/images/marketplace/65/5',65),('/images/marketplace/65/profile',65),('/images/marketplace/66/1',66),('/images/marketplace/66/2',66),('/images/marketplace/66/3',66),('/images/marketplace/66/4',66),('/images/marketplace/66/5',66),('/images/marketplace/66/profile',66),('/images/marketplace/67/1',67),('/images/marketplace/67/2',67),('/images/marketplace/67/3',67),('/images/marketplace/67/4',67),('/images/marketplace/67/5',67),('/images/marketplace/67/profile',67),('/images/marketplace/68/1',68),('/images/marketplace/68/2',68),('/images/marketplace/68/3',68),('/images/marketplace/68/4',68),('/images/marketplace/68/profile',68),('/images/marketplace/69/1',69),('/images/marketplace/69/2',69),('/images/marketplace/69/3',69),('/images/marketplace/69/4',69),('/images/marketplace/69/profile',69),('/images/marketplace/7/profile',7),('/images/marketplace/8/profile',8),('/images/marketplace/9/profile',9);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marketplace`
--

DROP TABLE IF EXISTS `marketplace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marketplace` (
  `cloth_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_description` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `long_description` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brand` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seller` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom` tinyint(1) DEFAULT 1,
  `rating` float DEFAULT 0,
  `admin_rating` float DEFAULT 5,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hide` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`cloth_id`),
  KEY `marketplace_ibfk_1` (`seller`),
  CONSTRAINT `marketplace_ibfk_1` FOREIGN KEY (`seller`) REFERENCES `user` (`username`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marketplace`
--

LOCK TABLES `marketplace` WRITE;
/*!40000 ALTER TABLE `marketplace` DISABLE KEYS */;
INSERT INTO `marketplace` VALUES (7,'Boy\'s T-shirt','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randoThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.\nmised words which don\'t look even slightly believable.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. ','GHP','T-shirt','rivalq',1,0,4.66,'Men',0),(8,'Allen Solly Junior Boy\'s Floral Regular fit Polo','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randoThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.\nmised words which don\'t look even slightly believable.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. ','Allen Solly','T-shirt','rivalq',1,0,2.71,'Men',0),(9,'The Children\'s Place Boy\'s Regular fit Shirt','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randoThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.\nmised words which don\'t look even slightly believable.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. ','The Children\'s Place','T-shirt','rivalq',1,0,5,'Men',0),(10,'MANQ Men\'s Slim Fit Tuxedo Suit','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randoThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.\nmised words which don\'t look even slightly believable.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. ','MANQ','Suit','rivalq',1,0,5,'Men',0),(11,'Jump Cuts Printed Round Neck Maroon Tshirt','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randoThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.\nmised words which don\'t look even slightly believable.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. ','Jump Cuts','T-shirt','aniket',1,0,5,'Men',0),(14,'Women\'s Chiffon A-Line Mini Clothing','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','SERA','Dress','rivalq',1,NULL,5,'Women',0),(18,'Men\'s Cotton Poly Blend Polo Regular Fit T-Shirt','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book','American Crew','T-Shirt','rivalq',1,NULL,3.87,'Men',0),(42,'Women Peach-Coloured & Off-White Printed Kurta with Palazzos & Dupatta','This charming peach kurta set from GERUA has the perfect romantic edge for any event or occasion. Perfect for breezy summer days, accessorize this kurta set with gold statement jewellery.','<h4>PRODUCT DETAILS</h4>Peach-Coloured and off-white printed kurta with palazzos and dupatta<br>Peach-Coloured A-line calf length kurta, has a V-neck, three-quarter sleeves, side slits<br>Off-white printed palazzos, has partially elasticated waistband, slip-on closure<br>Peach-Coloured and off-white printed dupatta, has printed border<br /><h4>Size & Fit</h4>The model (height 5\'8\") is wearing a size S<br>Dupatta length: 2.30 mtr<br>Dupatta width: 1.17 mtr<br><br /><h4>Material & Care</h4>Kurta fabric: Pure Cotton<br>Bottom fabric: Pure Cotton<br>Dupatta fabric: Pure Cotton<br>Machine-wash<br />','GERUA','Kurta Sets','rivalq',1,0,5,'Women',0),(43,'Men Black Tapered Fit Mid-Rise Clean Look Stretchable Jeans','Featuring comfort and style, these jeans from HIGHLANDER make a great addition to any wardrobe. They can be worn with trainers and a fitted tee when you need some run some errands.','<h4>PRODUCT DETAILS</h4>Black dark wash 5-pocket mid-rise jeans, clean look with heavy fade, has a button and zip closure, waistband with belt loops<br /><h4>Size & Fit</h4>Tapered Fit<br>Stretchable<br>The model (height 6\') is wearing a size 32<br /><h4>Material & Care</h4>97% Cotton 2.5% Polyester 0.5% Elastane<br>Machine-wash<br />','HIGHLANDER','Jeans','rivalq',1,0,5,'Men',0),(44,'Men Black Solid Denim Jacket','Show off your handsome side with this trendy black jacket. This jacket from HIGHLANDER can be worn with distressed denims and a modern tee for a laid-back brunch outfit.','<h4>PRODUCT DETAILS</h4>Black solid jacket, has a spread collar, 4 pockets, button closure, long sleeves, straight hem, and unlined lining<br /><h4>Size & Fit</h4>The model (height 6\') is wearing a size M<br /><h4>Material & Care</h4>Material: Cotton<br>  Machine Wash<br />','HIGHLANDER','Jackets','rivalq',1,0,5,'Men',0),(45,'Men Olive Green Solid Active Bomber Jacket','This fashionable olive green jacket will elevate your overall style. Pair this HRX by Hrithik Roshan jacket with a cool T-shirt and trim denims when you\'re going out for drinks with the boys.','<h4>PRODUCT DETAILS</h4><b>Product design details</b><ul><li>Lightweight jacket provides insulation and helps maintain body temperature in mild cold</li><li>Breathable fabric helps sweat dry fast.</li><li>Zippered pockets keep your essentials safe</li><li>Style: Full Front Open Zipper</li><li>Sleeve: Full Sleeves</li><li>Colour: Olive green</li><li>Fit: Regular</li></ul><b>About&nbsp;HRX by Hrithik Roshan Active Bomber Jacket</b><br>The HRX Men\'s Running Jacket - lightweight yet sturdy; breathable yet warm - just right for a&nbsp;quick run before the weather gets really cold.<br /><h4>Size & Fit</h4>The model (height 6\') is wearing a size M<br /><h4>Material & Care</h4>100% polyester&nbsp;<br>Machine-wash<br />','HRX by Hrithik Roshan','Jackets','rivalq',1,0,5,'Men',0),(46,'Men Khaki Solid Tailored Jacket','This handsome jacket in khaki will be the talk of the town. This jacket from Roadster is perfect with trousers and loafers for a day out around town.','<h4>PRODUCT DETAILS</h4>Khaki solid tailored jacket, has a stand collar, two pockets, zip closure, long sleeves, hem with toggle<br /><h4>Size & Fit</h4>The model (height 6\') is wearing a size M<br /><h4>Material & Care</h4>Cotton<br>Machine-wash<br />','Roadster','Jackets','rivalq',1,0,5,'Men',0),(47,'Men Blue Slim Fit Mid-Rise Clean Look Stretchable Jeans','Roadster has created a collection of fashionable and comfortable slim jeans. Team them with a printed T-shirt and leather boots for a modish and casual weekend look.','<h4>PRODUCT DETAILS</h4>Blue light wash five-pocket mid-rise jeans, clean look, no fade, has a button and zip closure, and waistband with belt loops<br /><h4>Size & Fit</h4>Slim fit<br>Stretchable<br>The model (height 6\') is wearing a size 32<br /><h4>Material & Care</h4>98% cotton, 2% elastane<br>Machine-wash<br />','Roadster','Jeans','rivalq',1,0,5,'Men',0),(48,'Men Black Solid Bomber','Show off your handsome side with this trendy black jacket. When you\'re going to a concert with your buddies, layer your favourite tee with this WROGN jacket.','<h4>PRODUCT DETAILS</h4>Black solid bomber, has a stand collar, two pockets, zip closure, long sleeves, straight hem and has no lining<br /><h4>Size & Fit</h4>The model (height 6\') is wearing a size M<br /><h4>Material & Care</h4>Polyester<br> Machine-wash<br />','WROGN','Jackets','rivalq',1,0,5,'Men',0),(49,'Women Blue Floral Printed Kurta with Trousers & Dupatta','Showcase your unique style in this lively decorated blue kurta set from Nayo. Pair this kurta set with leggings and flats by day, switching to pumps and gold accessories at night.','<h4>PRODUCT DETAILS</h4>Blue printed kurta with trousers<br> Blue anarkali calf length kurta, has a round neck, three-quarter sleeves, flared hem<br> Blue printed trousers, slip-on closure<br /><h4>Size & Fit</h4>The model (height 5\'8\") is wearing a size S<br /><h4>Material & Care</h4>Kurta fabric: pure cotton<br>Bottom fabric: pure cotton<br>Dupatta fabric: pure cotton<br>Hand-wash<br />','Nayo','Kurta Sets','rivalq',1,0,5,'Women',0),(50,'Women Pink Printed Straight Kurta','You\'ll love the style, comfort and durability of this Anouk kurta. For your next dinner party or family gathering, this peach piece pairs well with dark leggings and chic flats.','<h4>PRODUCT DETAILS</h4>Pink printed straight kurta, has a V-neck, three-quarter sleeves, straight hem, side slits<br /><h4>Size & Fit</h4>The model (height 5\'8\") is wearing a size S<br /><h4>Material & Care</h4>100% cotton<br>Machine-wash<br />','Anouk','Kurtas','rivalq',1,0,5,'Women',0),(57,'Women Pink Solid Padded Jacket','Layer on a chic pink jacket from Tokyo Talkies. This piece can be matched with dark wash jeans and a cute tee when you\'re going to dinner with your family.','<h5>PRODUCT DETAILS</h5>Pink solid jacket, has a hooded, 2 pockets, button closure, three-quarter sleeves, straight hem, and unlined lining<br /><br /><h5>Size & Fit</h5>The model (height 5\'8\") is wearing a size S<br /><br /><h5>Material & Care</h5>Material: Polyester<br>  Machine Wash<br /><br />','Tokyo Talkies','Jackets','rivalq',1,0,5,'Women',0),(58,'Men White & Navy Blue Colourblocked Hooded Sweatshirt','Layer this Mast & Harbour zip-up to your outfit to feel comfortable and look stylish. Layer this white piece over a tee and wear jeans and sneakers for a casual dinner look.','<h5>PRODUCT DETAILS</h5>White, navy blue and mustard yellow colourblocked sweatshirt, has a hooded neck, one kangaroo pocket, long sleeves, straight hem<br /><br /><h5>Size & Fit</h5>The model (height 6\') is wearing a size M<br /><br /><h5>Material & Care</h5>Material: 100% Cotton<br>Machine Wash<br /><br />','Mast & Harbour','Sweatshirts','rivalq',1,0,5,'Men',0),(59,'Men Olive Green Regular Fit Solid Cargos','These simple, yet trendy pair of cargo trousers from Roadster will complete any look. You\'ll run errands like a pro when you combine this olive pair with a muscle tee and baseball cap.','<h5>PRODUCT DETAILS</h5>Olive green solid mid-rise cargos, has a drawstring closure, 6 pockets, cuffed hems<br>Manufacturer Info: ASK Apparel And Textile Sourcing<br>Country of Origin: India<br /><br /><h5>Size & Fit</h5>Regular Fit<br> The model (height 6\') is wearing a size 32<br /><br /><h5>Material & Care</h5>Cotton <br> Machine-wash<br /><br />','Roadster','Trousers','rivalq',1,0,5,'Men',0),(60,'Men Black Tapered Fit Solid Chinos','Formalize your wardrobe with a trendsetting pair of chino trousers from HIGHLANDER. When you need a semi-formal event outfit, style this black pair with a button-down shirt, a fashionable tie, and Oxfords.','<h5>PRODUCT DETAILS</h5>Black solid mid-rise chinos, has a button closure closure, 5 pockets<br /><br /><h5>Size & Fit</h5>Tapered Fit<br> The model (height 6\') is wearing a size 32<br /><br /><h5>Material & Care</h5>Cotton and elastane <br> Machine-wash<br /><br />','HIGHLANDER','Trousers','rivalq',1,0,5,'Men',0),(61,'Men Black Skinny Fit Mid-Rise Highly Distressed Stretchable Jeans','Slip into a pair of these skinny-fit jeans by HERE&NOW and discover a whole new level of comfort. When you\'re meeting the boys for dinner and drinks, rock them with leather boots and a quality tee.','<h5>PRODUCT DETAILS</h5>Black dark wash 5-pocket mid-rise jeans, highly distressed, no fade, has a button and zip closure, and waistband with belt loops<br /><br /><h5>Size & Fit</h5>Skinny Fit<br>Stretchable<br>The model (height 6\') is wearing a size 32<br /><br /><h5>Material & Care</h5>98% cotton, 2% elastane<br>Machine-wash<br /><br />','HERE&NOW','Jeans','rivalq',1,0,5,'Men',0),(62,'Women Red Printed Anarkali Kurta With Dupatta','Look and feel beautiful in this uniquely designed kurta from Ishin. Look chic for the day with this red kurta and leggings.','<h5>PRODUCT DETAILS</h5>Red printed anarkali kurta, has a round neck, and flared hem<br /><br /><h5>Size & Fit</h5>The model (height 5\'8\") is wearing a size S<br /><br /><h5>Material & Care</h5>Material: Cotton<br /><br />','Ishin','Kurtas','rivalq',1,0,5,'Women',0),(63,'Men Navy Blue Solid Padded Jacket','Top off your personal wardrobe with this trendsetting jacket. This HRX by Hrithik Roshan jacket can be styled with your trackpants and sport shoes for a workout session','<h5>PRODUCT DETAILS</h5>Navy Blue solid jacket, has a mock collar, 2 pockets, zip closure, long sleeves, straight hem, and polyester lining<br /><br /><h5>Size & Fit</h5>The model (height 6\') is wearing a size M<br /><br /><h5>Material & Care</h5>Material: Shell: 100% Nylon<br>Lining: 100% Polyester<br>Padding: 100% Polyester<br>Hand Wash<br /><br />','HRX by Hrithik Roshan','Jackets','rivalq',1,0,5,'Men',0),(64,'Men Black Printed Hooded Sweatshirt','Add this fashion-forward WROGN zip-up to your casual wardrobe staples and stay warm all year long. Layer this black piece over a tee and wear jeans and sneakers for a casual dinner look.','<h5>PRODUCT DETAILS</h5>Black printed sweatshirt, has a hood, long sleeves, straight hem<br /><br /><h5>Size & Fit</h5>The model (height 6\') is wearing a size M<br /><br /><h5>Material & Care</h5>100% polyester<br>Machine-wash<br /><br />','WROGN','Sweatshirts','rivalq',1,0,5,'Men',0),(65,'Men Grey Solid Biker Jacket','This fashionable grey jacket will elevate your overall style. Pair this WROGN jacket with a cool T-shirt and trim denims when you\'re going out for drinks with the boys.','<h5>PRODUCT DETAILS</h5>Grey solid jacket, has a stand collar, 5 pockets, zip closure, long sleeves, straight hem<br /><br /><h5>Size & Fit</h5>The model (height 6\') is wearing a size M<br /><br /><h5>Material & Care</h5>Shell: 88% polyester, 8% cotton and 4% viscose<br>Coating: 100% polyurethane&nbsp;<br>Lining: 100% polyester<br>Dry-clean<br /><br /><h5>Complete The Look</h5>This fashionable grey jacket will elevate your overall style. Pair this WROGN jacket with a cool T-shirt and trim denims when you\'re going out for drinks with the boys.<br/>','WROGN','Jackets','rivalq',1,0,5,'Men',0),(66,'Women Navy Blue Printed Kurta with Trousers & Dupatta','Show off your exquisite style in this navy blue kurta set from Indo Era. Style this kurta set with gold bangles and statement earrings for a resort-chic look.','<h5>PRODUCT DETAILS</h5>Navy Blue printed kurta with trousers and dupatta<br>Navy Blue printed straight calf length kurta, has a round neck, three-quarter sleeves, side slits<br>Navy Blue solid trousers, has partially elasticated waistband, slip-on closure<br>Navy Blue printed dupatta, has taping border<br /><br /><h5>Size & Fit</h5>The model (height 5\'8\") is wearing a size S<br /><br /><h5>Material & Care</h5>Kurta fabric: cotton blend<br>Bottom fabric: cotton blend<br>Dupatta fabric: cotton blend<br>Dry-clean<br /><br /><h5>Complete The Look</h5>Show off your exquisite style in this navy blue kurta set from Indo Era. Style this kurta set with gold bangles and statement earrings for a resort-chic look.<br/>','Indo Era','Kurta Sets','rivalq',1,0,5,'Women',0),(67,'Men Navy Blue Slim Fit Mid-Rise Clean Look Stretchable Jeans','These slim jeans from Roadster will make a great addition to any casual wardrobe. Match yours with sneakers and a comfy tee and join your friends for dinner and drinks.','<h5>PRODUCT DETAILS</h5>Navy Blue dark wash 5-pocket mid-rise jeans, clean look, no fade, has a button and zip closure, and waistband with belt loops<br /><br /><h5>Size & Fit</h5>Slim fit<br>Stretchable<br>The model (height 6\') is wearing a size 32<br /><br /><h5>Material & Care</h5>Cotton and elastane blend<br>Machine-wash<br /><br /><h5>Complete The Look</h5>These slim jeans from Roadster will make a great addition to any casual wardrobe. Match yours with sneakers and a comfy tee and join your friends for dinner and drinks.<br/>','Roadster','Jeans','rivalq',1,0,5,'Men',0),(68,'Men Navy Blue Skinny Fit Mid-Rise Clean Look Stretchable Jeans','For long-lasting comfort and style, opt for these Mast & Harbour skinny-fit jeans. Style yours with canvas shoes and your favourite jacket when you\'re catching up with some friends over coffee.','<h5>PRODUCT DETAILS</h5>Navy Blue medium wash 5-pocket mid-rise jeans, clean look, no fade, has a button and zip closure, and waistband with belt loops<br /><br /><h5>Size & Fit</h5>Skinny Fit<br>Stretchable<br>The model (height 6\') is wearing a size 32<br /><br /><h5>Material & Care</h5>98% cotton, 2% elastane<br>Machine-wash<br /><br /><h5>Complete The Look</h5>For long-lasting comfort and style, opt for these Mast & Harbour skinny-fit jeans. Style yours with canvas shoes and your favourite jacket when you\'re catching up with some friends over coffee.<br/>','Mast & Harbour','Jeans','rivalq',1,0,5,'Men',0),(69,'Women Mauve Zari Yoke Design Chanderi Silk Kurta with Trousers & Dupatta','This elegant mauve kurta set from Varanga will help you feel elegant and modest at any occasion. Style this kurta set with gold bangles and statement earrings for a resort-chic look.','<h5>PRODUCT DETAILS</h5>Mauve yoke design kurta with trousers<br>Mauve yoke design straight calf length kurta, has a round neck, three-quarter sleeves with zari detailing, straight hem, side slits and has button closure<br>Mauve solid trousers, slip-on closure<br>Mauve sequined embroidered Dupatta<br /><br /><h5>Size & Fit</h5>The model (height 5\'8\") is wearing a size S<br /><br /><h5>Material & Care</h5>Kurta fabric: chanderi silk<br>Bottom fabric: silk blend<br>Dupatta fabric: net<br>Dry-clean<br /><br /><h5>Complete The Look</h5>This elegant mauve kurta set from Varanga will help you feel elegant and modest at any occasion. Style this kurta set with gold bangles and statement earrings for a resort-chic look.<br/>','Varanga','Kurta Sets','rivalq',1,0,5,'Women',0);
/*!40000 ALTER TABLE `marketplace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_details` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `cloth_id` int(11) DEFAULT NULL,
  `size` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `cloth_id` (`cloth_id`),
  KEY `username` (`username`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`cloth_id`) REFERENCES `marketplace` (`cloth_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,10,'L',1,2000,'rivalq'),(2,11,'L',1,1000,'rivalq'),(3,10,'XXL',2,2500,'rivalq'),(4,7,'L',1,1000,'rivalq'),(5,7,'XL',10,300,'rivalq'),(6,7,'S',2,600,'rivalq');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ratings` (
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cloth_id` int(11) NOT NULL,
  `rating` float DEFAULT NULL,
  PRIMARY KEY (`username`,`cloth_id`),
  KEY `cloth_id` (`cloth_id`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`cloth_id`) REFERENCES `marketplace` (`cloth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requests` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `cloth_id` int(11) DEFAULT NULL,
  `seller` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `request_status` tinyint(1) DEFAULT NULL,
  `request_result` tinyint(1) DEFAULT NULL,
  `mp_cloth` int(11) DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `cloth_id` (`cloth_id`),
  KEY `seller` (`seller`),
  KEY `mp_cloth` (`mp_cloth`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`cloth_id`) REFERENCES `seller_cloth` (`cloth_id`),
  CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`seller`) REFERENCES `user` (`username`),
  CONSTRAINT `requests_ibfk_3` FOREIGN KEY (`mp_cloth`) REFERENCES `marketplace` (`cloth_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (7,8,'rivalq','X',10,400,1,1,8),(8,8,'rivalq','X',10,450,1,1,8),(9,8,'rivalq','X',1,450,1,1,8),(10,7,'rivalq','L',1,550,1,1,7),(11,8,'rivalq','L',1,550,1,0,NULL),(12,9,'rivalq','L',1,550,1,0,NULL),(13,10,'rivalq','L',1,550,1,0,NULL),(14,10,'rivalq','L',10,1000,1,1,10),(15,11,'aniket','L',10,1000,1,1,11),(16,7,'rivalq','S',1,450,1,1,7),(17,9,'rivalq','L',10,500,1,1,9),(18,8,'rivalq','M',10,300,1,1,8),(19,9,'rivalq','XS',10,400,1,1,9),(20,10,'rivalq','S',5,2000,1,1,10),(21,10,'rivalq','M',10,1500,1,1,10),(22,9,'rivalq','M',10,300,1,1,9),(23,9,'rivalq','L',10,400,1,1,9),(24,10,'rivalq','XXL',10,2000,1,1,10),(25,7,'rivalq','XL',10,100,1,1,7),(26,8,'rivalq','X',1,100,1,0,NULL),(27,9,'rivalq','X',1,400,1,1,9),(28,10,'rivalq','X',1,1000,1,1,10),(29,7,'rivalq','X',1,500,1,0,NULL),(30,7,'rivalq','S',5,500,1,1,7),(31,13,'rivalq','L',1,1000,1,1,18);
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cloth_id` int(11) NOT NULL,
  `head` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hide` tinyint(1) DEFAULT NULL,
  `time` date DEFAULT NULL,
  PRIMARY KEY (`username`,`cloth_id`),
  KEY `cloth_id` (`cloth_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`cloth_id`) REFERENCES `marketplace` (`cloth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES ('rivalq',10,'Contrary to popular belief','The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',0,'2021-10-26'),('rivalq',11,'Lorem Ipsum is simply dummy t','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',0,'2021-10-26');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_cloth`
--

DROP TABLE IF EXISTS `seller_cloth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seller_cloth` (
  `cloth_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_description` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `long_description` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brand` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seller` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'Men',
  PRIMARY KEY (`cloth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_cloth`
--

LOCK TABLES `seller_cloth` WRITE;
/*!40000 ALTER TABLE `seller_cloth` DISABLE KEYS */;
INSERT INTO `seller_cloth` VALUES (7,'Boy\'s T-shirt','Lorem Ipsum is simply a dummy text of the printing and typesetting industry. ','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. ','GHPC','T-shirt','rivalq','Men'),(8,'Allen Solly Junior Boy\'s Floral Regular fit Polo','Allen Solly Half Sleeve atop polo t-shirt in Orange color.','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book','Allen Solly','T Shirt','rivalq','Men'),(9,'The Children\'s Place Boy\'s Regular fit Shirt','Introduce a pop of pattern to your little man\'s roster with this printed shirt. Woven from smooth cotton, it\'s put up together with a point collar and short sleeves. Team it with cuffed chinos and sneakers.','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ','The Children\'s Place','Shirt','rivalq','Men'),(10,'MANQ Men\'s Slim Fit Tuxedo Suit','Shop from a wide range of Suit from MANQ . Perfect for office meetings and parties, you could pair it with a stylish shirt to complete the look.','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ','MANQ','Suit','rivalq','Men'),(11,'Jump Cuts Printed Round Neck Maroon Tshirt','ive your casual outfit an uber-cool update with this fullsleeve hooded cotton T-shirt from Maniac, to head out for a soiree in style','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book','Jump Cuts','T-Shirt','aniket','Men'),(12,'Maternity Feeding Kurti with Zippers','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\n','CEE 18','Kurtas','rivalq','Men'),(13,'Men\'s Cotton Poly Blend Polo Regular Fit T-Shirt','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book','American Crew','T-Shirt','rivalq','Men');
/*!40000 ALTER TABLE `seller_cloth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_cloth_features`
--

DROP TABLE IF EXISTS `seller_cloth_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seller_cloth_features` (
  `cloth_id` int(11) DEFAULT NULL,
  `feature_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `cloth_id` (`cloth_id`),
  CONSTRAINT `seller_cloth_features_ibfk_1` FOREIGN KEY (`cloth_id`) REFERENCES `seller_cloth` (`cloth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_cloth_features`
--

LOCK TABLES `seller_cloth_features` WRITE;
/*!40000 ALTER TABLE `seller_cloth_features` DISABLE KEYS */;
INSERT INTO `seller_cloth_features` VALUES (13,'Neck Style','Polo');
/*!40000 ALTER TABLE `seller_cloth_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_cloth_images`
--

DROP TABLE IF EXISTS `seller_cloth_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seller_cloth_images` (
  `url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cloth_id` int(11) DEFAULT NULL,
  KEY `cloth_id` (`cloth_id`),
  CONSTRAINT `seller_cloth_images_ibfk_1` FOREIGN KEY (`cloth_id`) REFERENCES `seller_cloth` (`cloth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_cloth_images`
--

LOCK TABLES `seller_cloth_images` WRITE;
/*!40000 ALTER TABLE `seller_cloth_images` DISABLE KEYS */;
INSERT INTO `seller_cloth_images` VALUES ('/images/rivalq/created/7/profile',7),('/images/rivalq/created/8/profile',8),('/images/rivalq/created/9/profile',9),('/images/rivalq/created/10/profile',10),('/images/aniket/created/11/profile',11),('/images/rivalq/created/12/profile',12),('/images/rivalq/created/12/1',12),('/images/rivalq/created/13/profile',13),('/images/rivalq/created/13/1',13);
/*!40000 ALTER TABLE `seller_cloth_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `cloth_id` int(11) NOT NULL,
  `Size` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Quantity` int(11) NOT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`cloth_id`,`Size`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`cloth_id`) REFERENCES `marketplace` (`cloth_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (7,'L',0,1000),(7,'S',3,600),(7,'XL',0,300),(8,'M',10,500),(8,'X',20,550),(9,'L',20,400),(9,'M',10,500),(9,'X',1,500),(9,'XS',10,500),(10,'L',8,2000),(10,'M',10,1600),(10,'S',5,2100),(10,'X',1,1000),(11,'L',8,1000),(14,'S',10,1000),(18,'L',0,1100),(42,'L',99,1502),(42,'M',93,1717),(42,'XS',84,1670),(42,'XXL',1,1529),(43,'L',93,711),(43,'S',97,531),(43,'XL',36,758),(43,'XXL',3,864),(44,'L',82,915),(44,'M',75,1054),(44,'XS',77,893),(45,'L',90,2107),(45,'M',67,2250),(46,'L',55,1344),(46,'S',25,1242),(47,'M',31,871),(47,'XL',21,996),(48,'L',40,1655),(48,'M',10,1782),(48,'S',72,1618),(48,'XS',75,1869),(49,'M',94,1416),(49,'S',58,1417),(49,'XL',63,1293),(49,'XS',33,1470),(50,'L',58,696),(50,'M',41,608),(50,'XL',25,618),(50,'XS',52,736),(57,'L',60,1466),(57,'M',88,1451),(57,'XXL',19,1598),(58,'M',19,1226),(59,'S',96,1299),(60,'M',4,877),(60,'XL',46,690),(61,'S',67,1097),(62,'L',82,1815),(62,'M',93,1852),(62,'S',4,1913),(62,'XS',68,1882),(63,'M',94,2363),(63,'XL',24,2129),(63,'XS',81,2392),(64,'L',26,1371),(64,'XL',3,1222),(65,'L',60,2716),(66,'L',70,1459),(66,'S',95,1380),(66,'XL',84,1620),(66,'XS',51,1624),(67,'M',7,710),(67,'XXL',14,849),(68,'S',53,1267),(69,'L',22,2209),(69,'M',68,2174),(69,'XL',90,2426);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_image` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_seller` tinyint(1) DEFAULT NULL,
  `credits` int(11) DEFAULT 0,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('aniket','jatin',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0),('jatin_garg','123456',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),('rivalq','jatin',1,'Jatin','Garg','Samana','anikjgarg@gmail.com',NULL,'7009260790','Peer Gori Mohalla','147101',NULL,8800);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wishlist` (
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cloth_id` int(11) NOT NULL,
  PRIMARY KEY (`username`,`cloth_id`),
  KEY `cloth_id` (`cloth_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`cloth_id`) REFERENCES `marketplace` (`cloth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES ('aniket',8),('rivalq',7),('rivalq',8),('rivalq',11);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-06 21:33:00
