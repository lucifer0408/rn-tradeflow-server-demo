const connection = require('./db')
const LogUtil = require('../../util/logutil')

/**
 * 执行SQL语句
 * @author Lucifer
 * @param sql 需要执行的SQL语句
 * @param param 参数，格式为数组
 * @param success 成功的回调函数
 * @param failure 失败的回调函数
 * */
module.exports = (sql, param, success, failure) => {
  if (!param) {
    param = []
  }

  connection().then(connect => {
    connect.query(sql, param, (err, result) => {
      if (err) {
        LogUtil.error(err)
        if (failure) {
          failure(err)
        }
      } else {
        if (success) {
          success(result)
        }
      }
      connect.release()
    })
  }).catch(err => {
    LogUtil.error(err)
    if (failure) {
      failure(err)
    }
    connect.release()
  })

}
