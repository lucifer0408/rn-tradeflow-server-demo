/**
 * 生成系统路由配置
 * @author Lucifer
 * */
const path = require('path')
const fs = require('fs')

// 后端路由配置的基础路径
const routeBasePath = path.resolve(__dirname, '../router')
// 后端路由的汇总文件
const routeDestPath = path.resolve(__dirname, '../service-routers.js')

/**
 * 获取后端路由配置汇总
 * @author Lucifer
 * */
function getServiceRouters(routerPath, basePath) {
  const filelist = fs.readdirSync(routerPath)
  const result = {}

  filelist.map(filepath => {
    const fileAbsolutePath = routerPath + '/' + filepath
    const fileRelativePath = basePath + '/' + filepath

    if (fs.statSync(fileAbsolutePath).isDirectory()) {
      Object.assign(result, getServiceRouters(fileAbsolutePath, fileRelativePath))
    } else {
      Object.assign(result, JSON.parse(`{"${filepath.substr(0, filepath.lastIndexOf('\.js'))}": "${fileRelativePath}"}`))
    }
  })

  return result
}

let routerContent = `
const express = require('express')
const router = express.Router()
`

const routers = getServiceRouters(routeBasePath, './router')
// 遍历routers，逐条生成路由汇总文件中的内容
Object.keys(routers).forEach(key => {
  // console.log(key, routers[key])
  routerContent += `
const ${key} = require('${routers[key]}')
router.use('/${key}', ${key})
  `
})

routerContent += `
module.exports = router
`

fs.writeFileSync(routeDestPath, routerContent, { encoding: 'UTF-8' })
