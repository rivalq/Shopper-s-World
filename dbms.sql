-- MariaDB dump 10.19  Distrib 10.6.4-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: dbms
-- ------------------------------------------------------
-- Server version	10.6.4-MariaDB
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO,POSTGRESQL' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table "cart"
--

DROP TABLE IF EXISTS "cart";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "cart" (
  "username" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "quantity" int(11) DEFAULT NULL,
  "size" varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  "cloth_id" int(11) NOT NULL,
  PRIMARY KEY ("username","cloth_id","size"),
  KEY "fk_cart_1" ("cloth_id"),
  CONSTRAINT "cart_ibfk_1" FOREIGN KEY ("username") REFERENCES "user" ("username"),
  CONSTRAINT "fk_cart_1" FOREIGN KEY ("cloth_id") REFERENCES "marketplace" ("cloth_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "cart"
--

LOCK TABLES "cart" WRITE;
/*!40000 ALTER TABLE "cart" DISABLE KEYS */;
/*!40000 ALTER TABLE "cart" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "cloth"
--

DROP TABLE IF EXISTS "cloth";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "cloth" (
  "id" int(11) NOT NULL,
  "name" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "short_description" varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "long_description" mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "brand" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "category" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY ("id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "cloth"
--

LOCK TABLES "cloth" WRITE;
/*!40000 ALTER TABLE "cloth" DISABLE KEYS */;
INSERT INTO "cloth" VALUES (1,'Tuxedo','A tux is a fancy black suit that you might wear, along with a bow tie, to your senior prom or your wedding','Image result for tuxedo description This type of jacket traditionally has four buttons and fastens with either the bottom row (known as 4-on-1 style)or 										    		both rows (4-on-2) depending on the cut. The most traditional model of tuxedo jacket: black and \n											single-breasted with one closing button, peaked lapels with silk facings, and no rear vents. Changed','Black Lapel','Suit'),(2,'Adidas T Shirt','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.','Adidas','T Shirt'),(3,'Levis Trouser','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.','Levis','Trouser'),(4,'Men\'s Cotton Hooded Hoodie','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.','Katso','Hoodie'),(5,'Printoctopus','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.','PrintOctopus','Tshirt'),(9,'Boy\'s Floral Regular fit Polo','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Changed','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.','Allen Solly Junior','T - Shirt'),(10,'Men\'s Polo','Lorem Ipsum is simply a dummy text of the printing and typesetting industry. ','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. ','Allen Solly','T - Shirt');
/*!40000 ALTER TABLE "cloth" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "cloth_ratings"
--

DROP TABLE IF EXISTS "cloth_ratings";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "cloth_ratings" (
  "cloth_id" int(11) NOT NULL,
  "rating" float DEFAULT NULL,
  "admin_rating" float DEFAULT NULL,
  "custom" tinyint(4) DEFAULT NULL,
  PRIMARY KEY ("cloth_id"),
  CONSTRAINT "cloth_ratings_ibfk_1" FOREIGN KEY ("cloth_id") REFERENCES "marketplace" ("cloth_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "cloth_ratings"
--

LOCK TABLES "cloth_ratings" WRITE;
/*!40000 ALTER TABLE "cloth_ratings" DISABLE KEYS */;
INSERT INTO "cloth_ratings" VALUES (7,0,5,1),(8,0,5,1),(9,0,5,1),(10,4.33,5,0),(11,0,5,1);
/*!40000 ALTER TABLE "cloth_ratings" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "faculty"
--

DROP TABLE IF EXISTS "faculty";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "faculty" (
  "id" int(11) NOT NULL,
  "name" varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  "email" varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  "bio" varchar(511) COLLATE utf8mb4_unicode_ci NOT NULL,
  "address" varchar(511) COLLATE utf8mb4_unicode_ci NOT NULL,
  "phone" varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  "dob" date NOT NULL,
  "username" varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY ("id"),
  KEY "username" ("username"),
  CONSTRAINT "faculty_ibfk_1" FOREIGN KEY ("username") REFERENCES "user" ("username")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "faculty"
--

LOCK TABLES "faculty" WRITE;
/*!40000 ALTER TABLE "faculty" DISABLE KEYS */;
INSERT INTO "faculty" VALUES (3,'JATIN','Jatin','Jatin','near','191974094','2002-02-04','rivalq');
/*!40000 ALTER TABLE "faculty" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "images"
--

DROP TABLE IF EXISTS "images";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "images" (
  "url" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "cloth_id" int(11) NOT NULL,
  PRIMARY KEY ("url","cloth_id"),
  KEY "cloth_id" ("cloth_id"),
  CONSTRAINT "images_ibfk_1" FOREIGN KEY ("cloth_id") REFERENCES "marketplace" ("cloth_id") ON DELETE CASCADE ON UPDATE CASCADE
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "images"
--

LOCK TABLES "images" WRITE;
/*!40000 ALTER TABLE "images" DISABLE KEYS */;
INSERT INTO "images" VALUES ('/images/marketplace/10/profile',10),('/images/marketplace/11/profile',11),('/images/marketplace/7/profile',7),('/images/marketplace/8/profile',8),('/images/marketplace/9/profile',9);
/*!40000 ALTER TABLE "images" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "marketplace"
--

DROP TABLE IF EXISTS "marketplace";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "marketplace" (
  "cloth_id" int(11) NOT NULL,
  "name" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "short_description" varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "long_description" mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "brand" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "category" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "seller" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "custom" tinyint(1) DEFAULT NULL,
  "rating" float DEFAULT NULL,
  "admin_rating" float DEFAULT NULL,
  PRIMARY KEY ("cloth_id"),
  KEY "marketplace_ibfk_1" ("seller"),
  CONSTRAINT "marketplace_ibfk_1" FOREIGN KEY ("seller") REFERENCES "user" ("username") ON DELETE SET NULL ON UPDATE CASCADE
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "marketplace"
--

LOCK TABLES "marketplace" WRITE;
/*!40000 ALTER TABLE "marketplace" DISABLE KEYS */;
INSERT INTO "marketplace" VALUES (7,'GHPC Boy\'s T-shirt','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randoThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.\nmised words which don\'t look even slightly believable.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. ','GHP','T-shirt','rivalq',1,0,4.66),(8,'Allen Solly Junior Boy\'s Floral Regular fit Polo','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randoThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.\nmised words which don\'t look even slightly believable.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. ','Allen Solly','T-shirt','rivalq',1,0,2.71),(9,'The Children\'s Place Boy\'s Regular fit Shirt','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randoThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.\nmised words which don\'t look even slightly believable.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. ','The Children\'s Place','T-shirt','rivalq',1,0,5),(10,'MANQ Men\'s Slim Fit Tuxedo Suit','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randoThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.\nmised words which don\'t look even slightly believable.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. ','MANQ','Suit','rivalq',1,0,5),(11,'Jump Cuts Printed Round Neck Maroon Tshirt','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randoThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.\nmised words which don\'t look even slightly believable.','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. ','Jump Cuts','T-shirt','aniket',1,0,5);
/*!40000 ALTER TABLE "marketplace" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "order_details"
--

DROP TABLE IF EXISTS "order_details";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "order_details" (
  "order_id" int(11) NOT NULL,
  "cloth_id" int(11) DEFAULT NULL,
  "size" varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "quantity" int(11) DEFAULT NULL,
  "price" int(11) DEFAULT NULL,
  "username" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY ("order_id"),
  KEY "cloth_id" ("cloth_id"),
  KEY "username" ("username"),
  CONSTRAINT "order_details_ibfk_1" FOREIGN KEY ("cloth_id") REFERENCES "marketplace" ("cloth_id"),
  CONSTRAINT "order_details_ibfk_2" FOREIGN KEY ("username") REFERENCES "user" ("username")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "order_details"
--

LOCK TABLES "order_details" WRITE;
/*!40000 ALTER TABLE "order_details" DISABLE KEYS */;
INSERT INTO "order_details" VALUES (1,10,'L',1,2000,'rivalq'),(2,11,'L',1,1000,'rivalq'),(3,10,'XXL',2,2500,'rivalq'),(4,7,'L',1,1000,'rivalq'),(5,7,'XL',10,300,'rivalq');
/*!40000 ALTER TABLE "order_details" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "payout"
--

DROP TABLE IF EXISTS "payout";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "payout" (
  "id" int(11) NOT NULL,
  "notes" varchar(511) COLLATE utf8mb4_unicode_ci NOT NULL,
  "amount" int(11) NOT NULL,
  "date" date NOT NULL,
  "transactionId" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "facultyId" int(11) NOT NULL,
  PRIMARY KEY ("id"),
  KEY "facultyId" ("facultyId"),
  CONSTRAINT "payout_ibfk_1" FOREIGN KEY ("facultyId") REFERENCES "faculty" ("id") ON DELETE CASCADE
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "payout"
--

LOCK TABLES "payout" WRITE;
/*!40000 ALTER TABLE "payout" DISABLE KEYS */;
/*!40000 ALTER TABLE "payout" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "ratings"
--

DROP TABLE IF EXISTS "ratings";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "ratings" (
  "username" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "cloth_id" int(11) NOT NULL,
  "rating" float DEFAULT NULL,
  PRIMARY KEY ("username","cloth_id"),
  KEY "cloth_id" ("cloth_id"),
  CONSTRAINT "ratings_ibfk_1" FOREIGN KEY ("username") REFERENCES "user" ("username"),
  CONSTRAINT "ratings_ibfk_2" FOREIGN KEY ("cloth_id") REFERENCES "marketplace" ("cloth_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "ratings"
--

LOCK TABLES "ratings" WRITE;
/*!40000 ALTER TABLE "ratings" DISABLE KEYS */;
/*!40000 ALTER TABLE "ratings" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "requests"
--

DROP TABLE IF EXISTS "requests";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "requests" (
  "request_id" int(11) NOT NULL,
  "cloth_id" int(11) DEFAULT NULL,
  "seller" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "size" varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "quantity" int(11) DEFAULT NULL,
  "price" int(11) DEFAULT NULL,
  "request_status" tinyint(1) DEFAULT NULL,
  "request_result" tinyint(1) DEFAULT NULL,
  "mp_cloth" int(11) DEFAULT NULL,
  PRIMARY KEY ("request_id"),
  KEY "cloth_id" ("cloth_id"),
  KEY "seller" ("seller"),
  KEY "mp_cloth" ("mp_cloth"),
  CONSTRAINT "requests_ibfk_1" FOREIGN KEY ("cloth_id") REFERENCES "seller_cloth" ("cloth_id"),
  CONSTRAINT "requests_ibfk_2" FOREIGN KEY ("seller") REFERENCES "user" ("username"),
  CONSTRAINT "requests_ibfk_3" FOREIGN KEY ("mp_cloth") REFERENCES "marketplace" ("cloth_id") ON DELETE NO ACTION ON UPDATE CASCADE
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "requests"
--

LOCK TABLES "requests" WRITE;
/*!40000 ALTER TABLE "requests" DISABLE KEYS */;
INSERT INTO "requests" VALUES (7,8,'rivalq','X',10,400,1,1,8),(8,8,'rivalq','X',10,450,1,1,8),(9,8,'rivalq','X',1,450,1,1,8),(10,7,'rivalq','L',1,550,1,1,7),(11,8,'rivalq','L',1,550,1,0,NULL),(12,9,'rivalq','L',1,550,1,0,NULL),(13,10,'rivalq','L',1,550,1,0,NULL),(14,10,'rivalq','L',10,1000,1,1,10),(15,11,'aniket','L',10,1000,1,1,11),(16,7,'rivalq','S',1,450,1,1,7),(17,9,'rivalq','L',10,500,1,1,9),(18,8,'rivalq','M',10,300,1,1,8),(19,9,'rivalq','XS',10,400,1,1,9),(20,10,'rivalq','S',5,2000,1,1,10),(21,10,'rivalq','M',10,1500,1,1,10),(22,9,'rivalq','M',10,300,1,1,9),(23,9,'rivalq','L',10,400,1,1,9),(24,10,'rivalq','XXL',10,2000,1,1,10),(25,7,'rivalq','XL',10,100,1,1,7),(26,8,'rivalq','X',1,100,1,0,NULL),(27,9,'rivalq','X',1,400,1,1,9),(28,10,'rivalq','X',1,1000,1,1,10),(29,7,'rivalq','X',1,500,1,0,NULL);
/*!40000 ALTER TABLE "requests" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "seller_cloth"
--

DROP TABLE IF EXISTS "seller_cloth";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "seller_cloth" (
  "cloth_id" int(11) NOT NULL,
  "name" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "short_description" varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "long_description" mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "brand" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "category" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "seller" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY ("cloth_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "seller_cloth"
--

LOCK TABLES "seller_cloth" WRITE;
/*!40000 ALTER TABLE "seller_cloth" DISABLE KEYS */;
INSERT INTO "seller_cloth" VALUES (7,'Boy\'s T-shirt','Lorem Ipsum is simply a dummy text of the printing and typesetting industry. ','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. ','GHPC','T-shirt','rivalq'),(8,'Allen Solly Junior Boy\'s Floral Regular fit Polo','Allen Solly Half Sleeve atop polo t-shirt in Orange color.','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book','Allen Solly','T Shirt','rivalq'),(9,'The Children\'s Place Boy\'s Regular fit Shirt','Introduce a pop of pattern to your little man\'s roster with this printed shirt. Woven from smooth cotton, it\'s put up together with a point collar and short sleeves. Team it with cuffed chinos and sneakers.','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ','The Children\'s Place','Shirt','rivalq'),(10,'MANQ Men\'s Slim Fit Tuxedo Suit','Shop from a wide range of Suit from MANQ . Perfect for office meetings and parties, you could pair it with a stylish shirt to complete the look.','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ','MANQ','Suit','rivalq'),(11,'Jump Cuts Printed Round Neck Maroon Tshirt','ive your casual outfit an uber-cool update with this fullsleeve hooded cotton T-shirt from Maniac, to head out for a soiree in style','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book','Jump Cuts','T-Shirt','aniket');
/*!40000 ALTER TABLE "seller_cloth" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "seller_cloth_images"
--

DROP TABLE IF EXISTS "seller_cloth_images";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "seller_cloth_images" (
  "url" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "cloth_id" int(11) DEFAULT NULL,
  KEY "cloth_id" ("cloth_id"),
  CONSTRAINT "seller_cloth_images_ibfk_1" FOREIGN KEY ("cloth_id") REFERENCES "seller_cloth" ("cloth_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "seller_cloth_images"
--

LOCK TABLES "seller_cloth_images" WRITE;
/*!40000 ALTER TABLE "seller_cloth_images" DISABLE KEYS */;
INSERT INTO "seller_cloth_images" VALUES ('/images/rivalq/created/7/profile',7),('/images/rivalq/created/8/profile',8),('/images/rivalq/created/9/profile',9),('/images/rivalq/created/10/profile',10),('/images/aniket/created/11/profile',11);
/*!40000 ALTER TABLE "seller_cloth_images" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "stock"
--

DROP TABLE IF EXISTS "stock";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "stock" (
  "cloth_id" int(11) NOT NULL,
  "Size" varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  "Quantity" int(11) NOT NULL,
  "price" int(11) DEFAULT NULL,
  PRIMARY KEY ("cloth_id","Size"),
  CONSTRAINT "stock_ibfk_1" FOREIGN KEY ("cloth_id") REFERENCES "marketplace" ("cloth_id") ON DELETE CASCADE ON UPDATE CASCADE
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "stock"
--

LOCK TABLES "stock" WRITE;
/*!40000 ALTER TABLE "stock" DISABLE KEYS */;
INSERT INTO "stock" VALUES (7,'L',0,1000),(7,'S',0,500),(7,'XL',0,300),(8,'M',10,500),(8,'X',20,550),(9,'L',20,400),(9,'M',10,500),(9,'X',1,500),(9,'XS',10,500),(10,'L',8,2000),(10,'M',10,1600),(10,'S',5,2100),(10,'X',1,1000),(11,'L',8,1000);
/*!40000 ALTER TABLE "stock" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "subject"
--

DROP TABLE IF EXISTS "subject";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "subject" (
  "id" int(11) NOT NULL,
  "name" varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  "code" varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  "facultyId" int(11) DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "facultyId" ("facultyId"),
  CONSTRAINT "subject_ibfk_1" FOREIGN KEY ("facultyId") REFERENCES "faculty" ("id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "subject"
--

LOCK TABLES "subject" WRITE;
/*!40000 ALTER TABLE "subject" DISABLE KEYS */;
/*!40000 ALTER TABLE "subject" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "user"
--

DROP TABLE IF EXISTS "user";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "user" (
  "username" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "password" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "is_admin" tinyint(1) DEFAULT NULL,
  "first_name" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "last_name" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "city" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "email" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "profile_image" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "phone" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "street" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "pincode" varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "is_seller" tinyint(1) DEFAULT NULL,
  PRIMARY KEY ("username")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "user"
--

LOCK TABLES "user" WRITE;
/*!40000 ALTER TABLE "user" DISABLE KEYS */;
INSERT INTO "user" VALUES ('aniket','jatin',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('jatin_garg','123456',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('rivalq','jatin',1,'Jatin','Garg','Samana','anikjgarg@gmail.com',NULL,'7009260790','Peer Gori Mohalla','147101',NULL);
/*!40000 ALTER TABLE "user" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "wishlist"
--

DROP TABLE IF EXISTS "wishlist";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "wishlist" (
  "username" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "cloth_id" int(11) NOT NULL,
  PRIMARY KEY ("username","cloth_id"),
  KEY "cloth_id" ("cloth_id"),
  CONSTRAINT "wishlist_ibfk_1" FOREIGN KEY ("username") REFERENCES "user" ("username"),
  CONSTRAINT "wishlist_ibfk_2" FOREIGN KEY ("cloth_id") REFERENCES "marketplace" ("cloth_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "wishlist"
--

LOCK TABLES "wishlist" WRITE;
/*!40000 ALTER TABLE "wishlist" DISABLE KEYS */;
INSERT INTO "wishlist" VALUES ('rivalq',7),('rivalq',11);
/*!40000 ALTER TABLE "wishlist" ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-24  0:00:40
