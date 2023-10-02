-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: event_link
-- ------------------------------------------------------
-- Server version	8.0.33
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
--
-- Table structure for table `add_posts`
--
DROP TABLE IF EXISTS `add_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `add_posts` (
  `posts_id` int NOT NULL AUTO_INCREMENT,
  `cover_img` varchar(255) DEFAULT NULL,
  `event_name` varchar(255) DEFAULT NULL,
  `event_desc` text,
  `category_id` int DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `google_form_link` varchar(255) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `college_name` varchar(255) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `venue` text,
  PRIMARY KEY (`posts_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `add_posts`
--
LOCK TABLES `add_posts` WRITE;
/*!40000 ALTER TABLE `add_posts` DISABLE KEYS */
;
INSERT INTO `add_posts`
VALUES (
    3,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/All_Posts_Images%2F1_new%20arrivals11.jpg?alt=media&token=21e51051-f001-4a8c-a120-22503cdd4c9d',
    'testing',
    'efefededfedd',
    4,
    '2334545544',
    'shreyas1234gurav@gmail.com',
    'http://localhost:3000/addpost6yt',
    1,
    1,
    'Dummy',
    '2023-08-24',
    NULL
  ),
(
    4,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/All_Posts_Images%2F1_Womens%20%20(title%201)1.jpg?alt=media&token=6b792ca6-0114-4f30-ba14-e044c6155e73',
    'testing',
    ' trre',
    2,
    '8879794186',
    'user@gmail.com',
    'http://localhost:3000/addpost',
    1,
    1,
    'Dummy',
    '2023-09-01',
    NULL
  ),
(
    6,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/All_Posts_Images%2F1_46ed9456-b290-4b20-b3c5-7e3523093431.jpeg?alt=media&token=da146a84-ec82-47ae-a136-2a4610f8d5c2',
    'Vriddhi',
    'ting tong',
    3,
    '2334545544',
    'user@gmail.com',
    'http://localhost:3000/addpost6yt',
    1,
    1,
    'Dummy',
    '2023-08-29',
    'ctctytctctyctctctcyycyyyc fcyccycyc ccctc gycvc'
  ),
(
    7,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/All_Posts_Images%2F1_91af597b-7aa6-4e5a-88ec-c360b691af57.jpg?alt=media&token=bd4ce737-ca3e-4ed8-9e30-d60cc10ba1c3',
    'Messi',
    'erewrerffff dfvfdvd dsvvfvvvdfvfvfvfdv vfvdvfdvfvfdvdfvfdvvfd vvdvvdfvfvvdfvdfvfdvfdvdfvfvfdvdvdvd vffvvfvfvfvfvfvfvfvfvfvvfvvfvvfvv',
    1,
    '1233312123',
    'test@gmail.com',
    'http://localhost:3000/addpost',
    1,
    1,
    'Dummy',
    '2023-08-24',
    NULL
  ),
(
    8,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/All_Posts_Images%2F1_IMG_20220114_131152.jpg?alt=media&token=b33bd78d-9a38-45e7-b0ed-71589c04fb08',
    'new 2 ',
    'jnjijuiubb',
    1,
    '8787888787',
    'test@gmail.com',
    'http://localhost:3000/addpost6yt',
    1,
    1,
    'Dummy',
    '2023-08-31',
    'ctctytctctyctctctcyycyyyc fcyccycyc ccctc gycvc'
  ),
(
    9,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/All_Posts_Images%2F2_Screenshot%202023-08-02%20234709.png?alt=media&token=7650cd75-4b29-4d3e-ac5f-664880b9ec13',
    'Event Link',
    'vjbvjbf djbvjb vfjvbvfvjvbkvj fjvbfkjvfvjnvn vfdjbvdvfjvbvjbvvjbvjv fjvbvjbvj',
    3,
    '2324344344',
    'test@gmail.comgf',
    'http://localhost:3000/eventlink',
    2,
    2,
    'test',
    '2023-08-30',
    'ctctytctctyctctctcyycyyyc fcyccycyc ccctc gycvc'
  ),
(
    11,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/All_Posts_Images%2F3_aa27f4f2-2dbf-4382-8d46-2f11bd943b2b.jpg?alt=media&token=f71ebe13-db86-4d58-a2be-8e592c036843',
    'testing',
    'testing done',
    2,
    '2334545544',
    'shreyasgurav1234@gmail.com',
    'http://localhost:3000/eventlink',
    3,
    6,
    'dummmyyy 2',
    '2023-08-29',
    'testing done'
  );
/*!40000 ALTER TABLE `add_posts` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `admin_profile`
--
DROP TABLE IF EXISTS `admin_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `admin_profile` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `profile_img` varchar(255) DEFAULT NULL,
  `college_name` varchar(255) DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `admin_profile`
--
LOCK TABLES `admin_profile` WRITE;
/*!40000 ALTER TABLE `admin_profile` DISABLE KEYS */
;
INSERT INTO `admin_profile`
VALUES (
    1,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/profile_images%2F1_WhatsApp%20Image%202023-07-31%20at%208.28.51%20PM.jpeg?alt=media&token=e23c49fa-5cf4-44c5-9e6d-b46d5611f652',
    'Dummy',
    '2333232332',
    'dummy@gmail.com',
    'fdgfgfgdgfdgfdgfdfdf',
    1
  ),
(
    2,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/profile_images%2F2_45b274a3-42e0-4c63-8766-6b8a2289a53d.jpeg?alt=media&token=0a9cf900-3467-409a-adef-e060ddfccfa9',
    'test',
    '2234333444',
    'shreyas1234gurav@gmail.com',
    'rrerewrfewr',
    2
  ),
(
    3,
    'C:\\fakepath\\Screenshot 2023-07-18 201239.png',
    'Dummy',
    '2234333444',
    'vu1f2021045@pvppcoe.ac.in',
    'ddddsd',
    4
  ),
(
    4,
    'C:\\fakepath\\Screenshot 2023-07-18 201239.png',
    'Dummy',
    '2234333444',
    'test@gmail.com',
    'test',
    5
  ),
(
    5,
    'C:\\fakepath\\Screenshot 2023-07-24 223414.png',
    'dummmyyy 2',
    '2334545544',
    'shreyasgurav1234@gmail.com',
    'jj',
    6
  ),
(
    6,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/profile_images%2F3_sports%20%20(title%201)1.jpg?alt=media&token=88e727b5-9d0f-41cd-aa92-cfc016af274a',
    'dummmyyy 2',
    '2234333444',
    'shreyas1234gurav@gmail.com',
    'test',
    3
  ),
(
    7,
    'C:\\fakepath\\sem 3 result.png',
    'Dummy',
    '2334545544',
    'vu1f2021045@pvppcoe.ac.in',
    'test',
    7
  ),
(
    8,
    'C:\\fakepath\\Sem 2 Result (156kb) (1).jpg',
    'atharv',
    '2234333444',
    'atharv@gmail.com',
    'atharv',
    8
  ),
(
    9,
    'C:\\fakepath\\03250771-bcf7-497e-81cb-e1d12fc5d8d6.jpeg',
    'yusra',
    '2334545544',
    'yusraansari@gmail.com',
    'test',
    9
  ),
(
    10,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/profile_images%2F10_SHREYAS%20SIGN.jpg?alt=media&token=4901c00b-7771-4d39-b9ac-c9bcf7b1f4e2',
    'dummmyyy 2',
    '2334545544',
    'shreyas1234gurav@gmail.com',
    'testing',
    10
  );
/*!40000 ALTER TABLE `admin_profile` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `category`
--
DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `category` (
  `category_id` int DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `category`
--
LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */
;
INSERT INTO `category`
VALUES (1, 'Cultural'),
(2, 'Social'),
(3, 'Technical'),
(4, 'Placement');
/*!40000 ALTER TABLE `category` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `contact_preference_type`
--
DROP TABLE IF EXISTS `contact_preference_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `contact_preference_type` (
  `contact_preference_id` int NOT NULL,
  `contact_preference_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`contact_preference_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `contact_preference_type`
--
LOCK TABLES `contact_preference_type` WRITE;
/*!40000 ALTER TABLE `contact_preference_type` DISABLE KEYS */
;
/*!40000 ALTER TABLE `contact_preference_type` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `feedback`
--
DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `feedback` (
  `fid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `feedback_id` int DEFAULT NULL,
  `feedback_subject` varchar(255) DEFAULT NULL,
  `feedback_desc` text,
  `ratings` varchar(255) DEFAULT NULL,
  `attachments` varchar(255) DEFAULT NULL,
  `contact_preference_id` int DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `user_profile_id` int DEFAULT NULL,
  PRIMARY KEY (`fid`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `feedback`
--
LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */
;
INSERT INTO `feedback`
VALUES (
    1,
    'Shreyas Gurav',
    'shreyas1234gurav@gmail.com',
    2,
    'Feedback',
    'Testing',
    '5',
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/Feebacks%2F1_undefined?alt=media&token=3e90d89c-6d6e-4a95-bda8-f3516706d361',
    1,
    1,
    1,
    NULL
  ),
(
    2,
    'User',
    'user@gmail.com',
    4,
    'Feedback',
    'test user',
    '4',
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/Feebacks%2F11_undefined?alt=media&token=39ca2637-1248-4d50-bd50-5fab38964623',
    3,
    11,
    NULL,
    1
  );
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `feedback_type`
--
DROP TABLE IF EXISTS `feedback_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `feedback_type` (
  `feedback_id` int NOT NULL,
  `feedback_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `feedback_type`
--
LOCK TABLES `feedback_type` WRITE;
/*!40000 ALTER TABLE `feedback_type` DISABLE KEYS */
;
/*!40000 ALTER TABLE `feedback_type` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `otps`
--
DROP TABLE IF EXISTS `otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `otps` (
  `otp_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `otp` int DEFAULT NULL,
  `created_at` time DEFAULT NULL,
  PRIMARY KEY (`otp_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `otps`
--
LOCK TABLES `otps` WRITE;
/*!40000 ALTER TABLE `otps` DISABLE KEYS */
;
INSERT INTO `otps`
VALUES (1, 'shreyas1234gurav@gmail.com', 355222, '17:44:45'),
(2, 'dummy@gmail.com', 280142, '17:48:12'),
(3, 'dummy@gmail.com', 292653, '17:50:15'),
(4, 'user@gmail.com', 831840, '18:15:52'),
(5, 'user@gmail.com', 709955, '18:27:53'),
(6, 'shreyas1234gurav@gmail.com', 828719, '16:46:21');
/*!40000 ALTER TABLE `otps` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `user_profile`
--
DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `user_profile` (
  `user_profile_id` int NOT NULL AUTO_INCREMENT,
  `profile_img` varchar(255) DEFAULT NULL,
  `college_name` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `clg_address` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`user_profile_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `user_profile`
--
LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */
;
INSERT INTO `user_profile`
VALUES (
    1,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/profile_images%2F11_WhatsApp%20Image%202023-07-31%20at%208.28.51%20PM.jpeg?alt=media&token=09fb2ff4-c418-4f13-8de4-738e9f5054b7',
    'VasantDada Patil College Of Engineering',
    '8879794186',
    'shreyas1234gurav@gmail.com',
    'testinggg tinggg',
    'Shreyas Gurav',
    11
  ),
(
    2,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/profile_images%2F12_Womens%20%20(title%201)1.jpg?alt=media&token=cba69726-90a2-46f6-b1a1-64eb51effc52',
    'VPPCOE',
    '2334545544',
    'riddhipagal@gmail.com',
    'naale ke bajume',
    'Riddhi Pagare',
    12
  ),
(
    3,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/profile_images%2F13_IMG_20220114_131152.jpg?alt=media&token=92c7bf93-cd79-4f34-a8bf-55e2bf6da361',
    'VJTI',
    '2234333444',
    'vjti@gmail.com',
    'VJTI , WADALA WEST , NEAR 5 GARDEN , MUMBAI - 400031',
    'SOMANSH DANGAL',
    13
  ),
(
    4,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/profile_images%2F15_Screenshot%202023-07-28%20000751.png?alt=media&token=6a2386c0-5cd5-4470-9b79-7af9a85d7547',
    'PVPPCOE',
    '2243434434',
    'dummy@gmail.com',
    'fgbgbbgbgbgbgbgbhgnhgnh ddfvf',
    'Event Link',
    15
  ),
(
    5,
    'https://firebasestorage.googleapis.com/v0/b/event-link-b0613.appspot.com/o/profile_images%2F16_Screenshot%202023-08-20%20121219.png?alt=media&token=c0440618-16ba-46ce-94d4-215dec3dc74d',
    'VPPCOE',
    '3434234432',
    'test@gmail.com',
    'bgfbbgbb',
    'Vaishnavi',
    16
  );
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `user_type` int DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `users`
--
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */
;
INSERT INTO `users`
VALUES (
    1,
    'shreyas1234gurav@gmail.com',
    1,
    '$2b$10$eN.FxGRSqmftmPwcA2WVJu26TiafzZiuQi3TLj9O1kmKl0PYH9QvG'
  ),
(
    2,
    'dummy@gmail.com',
    1,
    '$2b$10$vWEIDB8lxWdY0FYKpJqL8u0lAoR9geneDO91YOAmSayepy4LQAp6G'
  ),
(
    3,
    'vu1f2122004@pvppcoe.ac.in',
    1,
    '$2b$10$NLrDghSk4nekDUmSmidpTOeA9TNCZLyM9lZuaLMBw19PGJq3ED2Yy'
  ),
(
    4,
    'test@gmail.com',
    1,
    '$2b$10$EVDRJtkIspBCbaXTRGbV/.tT.hsag76Q1G6yNHHBJ7mUZd9ABrQUa'
  ),
(
    5,
    'testtodat@gmail.com',
    1,
    '$2b$10$8LopyECQTkM2CyabeyHPI.vG44GAm9lYncAFmAs2bRMOoIz/kurYi'
  ),
(
    6,
    'best@gmail.com',
    1,
    '$2b$10$FY6PjWmk74MlcXD20SUQv.DNZctR7X3zfU6qAdy8oGzJw8/owlpOi'
  ),
(
    7,
    'new@gmail.com',
    1,
    '$2b$10$G/VFju4to5rj1lBsUzxLCe4XbThCEoc9dwtcAYRNJkbpnzhQhdfz.'
  ),
(
    8,
    'atharv@gmail.com',
    1,
    '$2b$10$XmN./InkUwSQveHw0uIwqeP8xu0jL2bou6RZaq9zvVIz98Q6upULm'
  ),
(
    9,
    'yusraansari@gmail.com',
    1,
    '$2b$10$4XCFK39EuXbuAUPZP4hlNus6G26ygRh8mcGeEPRnjswx6GGaMK9/K'
  ),
(
    10,
    'navin@gmail.com',
    1,
    '$2b$10$uHKEKy/xC.HSh.3TDcGTeuXvgROUoe5k4x7i10CAo2lqgc22giEzW'
  ),
(
    11,
    'user@gmail.com',
    2,
    '$2b$10$svZAHZRZHEyKynJ5o5212u0HlOOXxEkic5rRddMcR.Km7cN5etWnq'
  ),
(
    12,
    'riddhipagal@gmail.com',
    2,
    '$2b$10$7DZe.9r3coNy3vSXIbIj6e7gIuSbHt3UKsW.DfxLgaFMf0L5TFJpm'
  ),
(
    13,
    'vjti@gmail.com',
    2,
    '$2b$10$5VCI1rAMTqKRJhgRgiEk.eQ8f74GAtfkVHCwSz5kANy6Lbf90Vlte'
  ),
(
    14,
    'eventlink@gmail.com',
    3,
    '$2b$10$qEpQ9Muk.iEcLmXQWCK6M.wnBLM7GzqNmXt.7zsaIkuHzpgmv2TQ6'
  ),
(
    16,
    'vaishnavi@gmail.com',
    2,
    '$2b$10$O2lBe1bQElWHUzsYQVI6COM9wbMyhSjy5zfKMh95CoqkesjW6Sd5m'
  );
/*!40000 ALTER TABLE `users` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;
-- Dump completed on 2023-09-30 21:07:35