const express = require('express')
const sysparamRouter = express.Router()

const LogUtil = require('../../util/logutil')

const execSQL = require('../../framework/database')

sysparamRouter.post('/getparam', (req, res) => {
  LogUtil.log('查询系统参数')
  execSQL('select * from tradeflow_param where paramkey = ?', ['recoverytime'], result => {
    if (result && result.length > 0) {
      res.send(result[0])
    } else {
      result.send({})
    }
  })
})

sysparamRouter.post('/addparam', (req, res) => {
  LogUtil.log('新增系统参数')
  const paramkey = req.body.paramkey ? req.body.paramkey : ''
  const paramvalue = req.body.paramvalue ? req.body.paramvalue : ''
  const paramdesc = req.body.paramdesc ? req.body.paramdesc : ''
  execSQL('insert tradeflow_param (paramkey, paramvalue, paramdesc) values (?, ?, ?)', [paramkey, paramvalue, paramdesc], result => {
    LogUtil.success(JSON.stringify(result))
    res.send(result)
  })
})

module.exports = sysparamRouter
