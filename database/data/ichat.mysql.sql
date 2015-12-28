DROP USER 'tchat102'@'localhost';
CREATE USER 'tchat102'@'localhost' IDENTIFIED BY 'tchat102++';
DROP DATABASE IF EXISTS tchat102;
CREATE DATABASE tchat102 DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
GRANT ALL PRIVILEGES ON tchat102.* to 'tchat102'@'localhost' WITH GRANT OPTION;
USE tchat102;

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


DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('2014_10_12_000000_create_users_table',1),('2014_10_12_100000_create_password_resets_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--

DROP TABLE IF EXISTS `tc_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tc_action` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(1000) NOT NULL,
  `action_type` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',  
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `tc_chat`
--

DROP TABLE IF EXISTS `tc_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tc_chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',  
  `type_id` int(11),
  `chat_youtube_url` varchar(1000),
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL DEFAULT "",
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `chat_creator_id` (`creator_id`),
  CONSTRAINT `chat_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `tc_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `tc_chat_action``
--
DROP TABLE IF EXISTS `tc_chat_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tc_chat_action` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chat_id` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `action_order` int(11) NOT NULL DEFAULT '1',
  `action_period` int(11) NOT NULL DEFAULT '25',
  `description` varchar(500) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',  
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `chat_action_chat_id` (`chat_id`),
  KEY `chat_action_action_id` (`action_id`),
  CONSTRAINT `chat_action_chat_id` FOREIGN KEY (`chat_id`) REFERENCES `tc_chat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chat_action_action_id` FOREIGN KEY (`action_id`) REFERENCES `tc_action` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `tc_chat_assignment`
--
DROP TABLE IF EXISTS `tc_chat_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tc_chat_assignment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chat_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',  
  `assignee_id` int(11) NOT NULL,
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `chat_assignment_chat_id` (`chat_id`),
  KEY `chat_assignment_assignee_id` (`assignee_id`),
  CONSTRAINT `chat_assignment_chat_id` FOREIGN KEY (`chat_id`) REFERENCES `tc_chat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chat_assignment_assignee_id` FOREIGN KEY (`assignee_id`) REFERENCES `tc_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `tc_chat_assignment`
--
DROP TABLE IF EXISTS `tc_chat_invite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tc_chat_invite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chat_id` int(11) NOT NULL,
  `codename` varchar(500) NOT NULL,
  `passcode` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',  
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `chat_invite_chat_id` (`chat_id`),
  CONSTRAINT `chat_invite_chat_id` FOREIGN KEY (`chat_id`) REFERENCES `tc_chat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `tc_user`
--
DROP TABLE IF EXISTS `tc_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tc_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastname` varchar(100) NOT NULL DEFAULT '',
  `firstname` varchar(100) NOT NULL DEFAULT '',
  `welcome_message` varchar(1000) NOT NULL DEFAULT '',
  `summary` varchar(1000) NOT NULL DEFAULT '',
  `experience` varchar(1000) NOT NULL DEFAULT '',
  `interests` varchar(1000) NOT NULL DEFAULT '',
  `favorite_quote` varchar(1000) NOT NULL DEFAULT '',
  `avatar_url` varchar(200) NOT NULL DEFAULT 'gb_default_avatar.png',
  `gender` varchar(3) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `phone_number` varchar(20) NOT NULL DEFAULT '',
  `address` varchar(255) NOT NULL DEFAULT '',
  `superuser` int(1) NOT NULL DEFAULT '0',
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `gb_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- ------------------Initial Users ------------------
load data local infile 'C:/xampp/htdocs/tchat102/database/data/Initializers/User.txt'
    into table tchat102.tc_user
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
     (`id`, `email`, `password`, `remember_token`, `lastname`, `firstname`, `welcome_message`, `summary`, `experience`, `interests`, `favorite_quote`, `avatar_url`, `gender`, `birthdate`, `phone_number`, `address`, `superuser`, `status`);


-- ------------------ Action ----------------
load data local infile 'C:/xampp/htdocs/tchat102/database/data/Initializers/Action.txt'
    into table tchat102.tc_action
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`,	`action`,	`action_type`,	`privacy`,	`status`);

-- ------------------ Chat ----------------
load data local infile 'C:/xampp/htdocs/tchat102/database/data/Initializers/Chat.txt'
    into table tchat102.tc_chat
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`creator_id`,	`created_at`,	`type_id`,	`chat_youtube_url`,	`title`,	`description`,	`privacy`, `order`,	`status`);

-- ------------------ Action ----------------
load data local infile 'C:/xampp/htdocs/tchat102/database/data/Initializers/ChatAction.txt'
    into table tchat102.tc_chat_action
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`,	`chat_id`,	`action_id`,	`action_order`,	`action_period`,	`description`,	`privacy`, `order`,	`status`);
