const express = require('express')
const tradeflowRouter = express.Router()

const LogUtil = require('../../util/logutil')
const FileUtil = require('../../util/fileutil')
const { getCurrentTime } = require('../../util/dateutil')

const execSQL = require('../../framework/database')

/**
 * 查询交易配置列表
 * @author Lucifer
 * */
tradeflowRouter.post('/queryTradeflowList', (req, res) => {
  LogUtil.log('查询交易配置列表')
  execSQL('select * from tradeflow_config', [], result => {
    res.send(result)
  })
})

/**
 * 查询交易配置详情
 * @author Lucifer
 * @param tradecode 交易码
 * */
tradeflowRouter.post('/getTradeflowConfig', (req, res) => {
  LogUtil.log('查询交易配置详情')
  const tradecode = req.body.tradecode ? req.body.tradecode : ''
  execSQL('select * from tradeflow_config where tradecode = ?', [tradecode], result => {
    result = result[0]
    result.tradeconfig = FileUtil.readFile(result.savepath)

    res.send(result)
  })
})

/**
 * 上传交易
 * @author Lucifer
 * @param tradecode 交易码
 * @param tradename 交易名称
 * @param tradeContent 交易流程配置详情
 * */
tradeflowRouter.post('/uploadTradeflow', (req, res) => {
  LogUtil.log('上传交易')
  const tradecode = req.body.tradecode
  const tradename = req.body.tradename
  const tradecontent = req.body.tradecontent

  execSQL('select * from tradeflow_config where tradecode = ?', [tradecode], result => {
    if (!result || result.length === 0) {
      // 没有查询到匹配的交易
      result = {}
      result.tradecode = tradecode
      result.tradename = tradename
      result.savepath = FileUtil.saveFile(tradecontent, `${tradecode}.json`)
      result.uploadtime = getCurrentTime()
      execSQL('insert tradeflow_config (tradecode, tradename, savepath, uploadtime) values (?, ?, ?, ?)', [result.tradecode, result.tradename, result.savepath, result.uploadtime], saveresult => {
        res.send({status: 200})
      })
    } else {
      result = result[0]
      result.tradename = tradename

      const filepath = FileUtil.saveFile(tradecontent, `${tradecode}.json`)
      result.savepath = filepath
      result.updatetime = getCurrentTime()

      execSQL('update tradeflow_config set tradename = ?, savepath = ?, updatetime = ? where tradecode = ?', [result.tradename, result.savepath, result.updatetime, result.tradecode], updateresult => {
        res.send({status: 200})
      })
    }
  })
})

/**
 * 删除交易
 * @author Lucifer
 * @param tradecode 交易码
 * */
tradeflowRouter.post('/deleteTradeflow', (req, res) => {
  LogUtil.log('删除交易')
  const tradecode = req.body.tradecode

  execSQL('delete from tradeflow_config where tradecode = ?', [tradecode], result => {
    res.send({status: 200})
  })
})

module.exports = tradeflowRouter
