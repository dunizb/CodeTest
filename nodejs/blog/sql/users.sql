/*
Navicat MySQL Data Transfer

Source Server         : localTest
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2016-10-11 14:17:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `slug` varchar(30) NOT NULL DEFAULT '' COMMENT '用户别名',
  `username` varchar(30) DEFAULT NULL COMMENT '用户名，登陆用的',
  `password` varchar(30) DEFAULT NULL,
  `nickname` varchar(30) DEFAULT NULL COMMENT '昵称',
  `email` varchar(50) DEFAULT '' COMMENT '邮箱',
  `status` varchar(30) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(255) DEFAULT NULL COMMENT '用户的角色',
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'huoqishi', 'huoqishi', '123123', '火骑士空空', '', null, '2016-10-08 11:09:47', 'admin', null);
INSERT INTO `users` VALUES ('2', 'tianyaren', 'tianyaren', '123223', '天涯人', '', null, '2016-10-09 07:41:53', '', null);
