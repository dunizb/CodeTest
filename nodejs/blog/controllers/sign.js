'use strict';

// 登陆注册
const express = require('express')
const sign =module.exports= express.Router()

// 指定访问的前缀
sign.prefix = '/sign'

// action
sign.get('/in', (req, res) =>{
  res.send('登陆成功')
})


sign.get('/out', (req, res) =>{
  res.send('注销成功')
})