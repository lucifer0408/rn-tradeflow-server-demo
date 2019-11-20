const express = require('express');
const app = express();
const router = require('./service-routers')

const LogUtil = require('./util/logutil');

const process = require('process');

const bodyParser = require('body-parser');

// 首先获取启动参数
if (process.argv.length < 3 || process.argv[2] === 'dev') {
  LogUtil.log('以dev模式启动，允许跨域');
  // 以dev模式启动，允许跨域
  //设置跨域请求
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Credentials','true')
    next()
  });
} else {
  // 否则不允许跨域
  LogUtil.log('以生产模式启动，不允许跨域');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 处理路由
app.use('/service', router)

const server = app.use(express.static('./admin')).listen(10086, () => {
  const port = server.address().port

  LogUtil.success('挡板服务启动成功，访问地址为 http://localhost:' + port + '/ ')
});
