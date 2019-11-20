module.exports = {
  // 数据库配置
  mysql: {
    host: '127.0.0.1',
    port: 3306,
    username: 'tradeflow',
    password: 'Agree.2019',
    database: 'tradeflow',
    connectionLimit: 50
  },
  tradeflow: {
    // 流程的配置文件保存的基础路径
    basePath: '/home/npm/apps/files'
  }
}
