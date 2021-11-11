#!/usr/bin/env node

'use strict'
const { program } = require('commander')
const fs = require('fs')
const path = require('path')

// 模版文件夹
const srcDir = path.join(__dirname, 'template-react-storybook-rollup-compnents')
// 检查目标文件夹是否存在
function checkDistFolder(dir) {
    const distDir = path.resolve(dir)
    if (!fs.existsSync(path.resolve(distDir))) {
      fs.mkdirSync(distDir)
    }
    return distDir
}
// 复制文件
function copyFileStream (from, to) {
  fs.createReadStream(path.resolve(from)).pipe(fs.createWriteStream(path.resolve(to)))
}
// 复制的回调
function travelCallback (from, to) {
  copyFileStream(from, to)
  console.log('[Done]:', from, '--->', to)
}
// 遍历复制文件夹目录
function travel(srcDir, distDir) {
  const from = path.resolve(srcDir)
  let to = path.resolve(distDir)
  fs.stat(from, (err, stats) => {
    if (err) {
      return console.log('err:', err) 
    }
    if (!stats.isDirectory()) {
      // 是文件的话，复制文件
      travelCallback(from, to)
      return
    }
    to = checkDistFolder(to)
    fs.readdir(from, (err, files) => {
      if(err) {
        return console.log('errorfile:', err)
      }
      files.forEach(file => {
        travel(path.join(from, file), path.join(to, file), travelCallback)
      })
    })
  })
}

program
.command('clone')
.action(() => {
    const projectName = process.argv.slice(process.argv.length-1)
    if (projectName) {
        // 创建文件夹
        console.log('运行文件所在的目录:', __dirname)
        console.log('当前命令所在的目录:', process.cwd())
        const distDir = checkDistFolder(projectName[0])
        travel(srcDir, distDir)
    }
    console.log('下载完成4')
})
console.log('b')
program.parse(process.argv)
console.log(process.argv.slice(2))