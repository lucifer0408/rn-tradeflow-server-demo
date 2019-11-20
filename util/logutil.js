const chalk = require('chalk')
const minLength = 50

function strlen(str) {
    var len = 0
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++
        } else {
            len += 2
        }
    }
    return len;
}

function getHeader(type, content) {
    let header = type
    const contentLength = strlen(content)
    const lineWidth = (minLength > contentLength ? minLength : contentLength)

    for (let i = 0; i < lineWidth - type.length; i++) {
        header += '-'
    }

    return header
}

function getFooter(content) {
    let footer = ''
    const contentLength = strlen(content)
    const lineWidth = (minLength > contentLength ? minLength : contentLength)

    for (let i = 0; i < lineWidth; i++) {
        footer += '-'
    }

    return footer
}

function getPostFix(content) {
    let postfix = ''
    const contentLength = strlen(content)
    const postFixLength = (minLength > contentLength ? (minLength - contentLength) : 0)

    for (let i = 0; i < postFixLength; i++) {
        postfix += ' '
    }

    return postfix
}

module.exports = {
    log(content) {
        console.log('|' + getHeader('', content) + '|')
        console.log('|' + content + getPostFix(content) + '|')
        console.log('|' + getFooter(content) + '|')
        console.log()
    },
    warn(content) {
        console.log(chalk.yellow('|' + getHeader('Warn', content) + '|'))
        console.log(chalk.yellow('|' + content + getPostFix(content) + '|'))
        console.log(chalk.yellow('|' + getFooter(content) + '|'))
        console.log()
    },
    error(content) {
        console.log(chalk.red('|' + getHeader('Error', content) + '|'))
        console.log(chalk.red('|' + content + getPostFix(content) + '|'))
        console.log(chalk.red('|' + getFooter(content) + '|'))
        console.log()
    },
    success(content) {
        console.log(chalk.green('|' + getHeader('Success', content) + '|'))
        console.log(chalk.green('|' + content + getPostFix(content) + '|'))
        console.log(chalk.green('|' + getFooter(content) + '|'))
        console.log()
    }
}