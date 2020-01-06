#! /usr/local/bin/node

console.log('starting....')

/**
 * 1.找到当前执行名的路径 拿到 webpack.config.js 
 */
const path = require('path');
// config 配置文件
const config = require(path.resolve('webpack.config.js'));

const Compiler = require('../lib/Compiler.js');
const compiler = new Compiler(config);

// 标识运行编译
compiler.run();