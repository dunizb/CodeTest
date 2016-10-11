/*
Navicat MySQL Data Transfer

Source Server         : localTest
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2016-10-11 14:17:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(20) DEFAULT NULL,
  `author_email` varchar(30) DEFAULT NULL,
  `author_ip` varchar(255) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `support` int(11) DEFAULT '0' COMMENT '点赞数',
  `oppose` int(11) DEFAULT '0' COMMENT '不点赞数',
  `created` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '该条评论创建时间',
  `post_id` bigint(20) DEFAULT NULL COMMENT '评论所属文章的id',
  `parent_id` bigint(11) DEFAULT '0' COMMENT '父级评论的id',
  `user_id` bigint(11) DEFAULT NULL COMMENT '评论者的id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', 'huoqishi', 'huoqishi@isc.net', '192.168.1.1', '小伙子写的不错哦！', null, '0', '0', '2016-10-08 19:28:27', '3', '0', '1');
INSERT INTO `comments` VALUES ('2', 'sinopia', 'sinopia@tt.net', '192.168.1.199', '哈哈哈哈，加油!', null, '0', '0', '2016-10-08 19:57:39', '3', '0', null);
INSERT INTO `comments` VALUES ('4', 'xiaoming', 'kk', '::ffff:127.0.0.1', '哈哈只', null, '0', '0', null, '4', '0', null);
INSERT INTO `comments` VALUES ('5', 'xiaoming', 'kk', '::ffff:127.0.0.1', '哈哈只', null, '0', '0', null, '4', '0', null);
INSERT INTO `comments` VALUES ('6', 'xiaoming', 'kk', '::ffff:127.0.0.1', '哈哈只', null, '0', '0', null, '4', '0', null);
INSERT INTO `comments` VALUES ('7', 'xiaoming', 'kk', '::ffff:127.0.0.1', '哈哈只', null, '0', '0', null, '4', '0', null);
INSERT INTO `comments` VALUES ('8', 'xiaoming', 'kk', '::ffff:127.0.0.1', '哈哈只', null, '0', '0', null, '4', '0', null);
INSERT INTO `comments` VALUES ('9', 'q', 'f', '::ffff:127.0.0.1', 'a', null, '0', '0', null, '4', '0', null);
