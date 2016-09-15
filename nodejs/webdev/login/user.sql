/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50612
Source Host           : localhost:3306
Source Database       : mydb

Target Server Type    : MYSQL
Target Server Version : 50612
File Encoding         : 65001

Date: 2016-09-14 16:35:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'admin1234', '26');
INSERT INTO `user` VALUES ('2', 'qqqq', 'qq', '12');
INSERT INTO `user` VALUES ('3', 'zhangsan', '123', '12');
INSERT INTO `user` VALUES ('4', 'lisi', '123456', '12');
INSERT INTO `user` VALUES ('5', 'lisi', '123456', '12');
INSERT INTO `user` VALUES ('6', 'lisi', '123456', '12');
