const { tradeflow } = require('../conf')
const fs = require('fs')
const path = require('path')

const fileBasePath = path.resolve(tradeflow.basePath)

const { getCurrentDate } = require('./dateutil')
const LogUtil = require('./logutil')

module.exports = {
  saveFile(source, dest) {
    const currentDate = getCurrentDate()
    const currentDatePath = `${fileBasePath}/${currentDate}`
    if (!fs.existsSync(currentDatePath)) {
      fs.mkdirSync(currentDatePath, { recursive: true })
    }

    const fileAbsolutePath = `${currentDatePath}/${dest}`
    fs.writeFileSync(fileAbsolutePath, source, { encoding: 'UTF-8' })
    return fileAbsolutePath.substr(fileBasePath.length)
  },
  readFile(filepath) {
    const fileAbsolutePath = `${fileBasePath}/${filepath}`
    const content = fs.readFileSync(fileAbsolutePath, { encoding: 'UTF-8' })
    return content
  }
}
