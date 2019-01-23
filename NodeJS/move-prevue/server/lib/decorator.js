const Router = require('koa-router')
const { resolve } = require('path')
// const _ = require('lodash')
const glob = require('glob')
const R = require('ramda')

const symbolPrefix = Symbol('prefix')
const routerMap = new Map()

const isArray = c => Array.isArray(c) ? c : [c]

export class Route {
  constructor (app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init () {
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)

    for (let [conf, controller] of routerMap) {
      const controllers = isArray(controller)
      let prefixPath = conf.target[symbolPrefix]
      if (prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path
      this.router[conf.method](routerPath, ...controllers)
    }

    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

const normalizePath = path => path.startsWith('/') ? path : `/${path}`

const router = conf => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path)

  routerMap.set({
    target: target,
    ...conf
  }, target[key])
}

export const controller = path => target => (target.prototype[symbolPrefix] = path)

export const get = path => router({
  method: 'get',
  path: path
})

export const post = path => router({
  method: 'post',
  path: path
})

export const put = path => router({
  method: 'put',
  path: path
})

export const del = path => router({
  method: 'delete',
  path: path
})

export const use = path => router({
  method: 'use',
  path: path
})

export const all = path => router({
  method: 'all',
  path: path
})

const decorate = (args, middleware) => {
  let [ target, key, descriptor ] = args

  target[key] = isArray(target[key])
  target[key].unshift(middleware)

  return descriptor
}

const convert = middleware => (...args) => decorate(args, middleware)

export const auth = convert(async (ctx, next) => {
  console.log('ctx.session.user')
  console.log(ctx.session.user)
  if (!ctx.session.user) {
    return (
      ctx.body = {
        success: false,
        code: 401,
        err: '登录信息失效，重新登录'
      }
    )
  }

  await next()
})

export const admin = roleExpected => convert(async (ctx, next) => {
  const { role } = ctx.session.user

  console.log('admin session')
  console.log(ctx.session.user)

  if (!role || role !== roleExpected) {
    return (
      ctx.body = {
        success: false,
        code: 403,
        err: '你没有权限，来错地方了'
      }
    )
  }

  await next()
})

export const required = rules => convert(async (ctx, next) => {
  let errors = []

  const checkRules = R.forEachObjIndexed(
    (value, key) => {
      errors = R.filter(i => !R.has(i, ctx, ctx.request[key]))(value)
    }
  )

  checkRules(rules)

  if (errors.length) {
    ctx.body = {
      success: false,
      code: 412,
      err: `${errors.join(',')} is required`
    }
  }

  await next()
})