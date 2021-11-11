const fs = require('fs')
const path = require('path')

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
function travelCallback (filePath, to) {
  copyFileStream(filePath, path.join(to,filePath.toString().replace(/\\/g, '-').replace(/:/g, '')))
  console.log('[Done]:', filePath)
}
// 遍历复制文件夹目录
function travel(srcDir, distDir) {
  const from = path.resolve(srcDir)
  const to = path.resolve(distDir)
  fs.stat(from, (err, stats) => {
    if (err) {
      return console.log('err:', err) 
    }
    if (!stats.isDirectory()) {
      // 是文件的话，复制文件
      travelCallback(from, to)
      return
    }
    fs.readdir(from, (err, files) => {
      if(err) {
        return console.log('errorfile:', err)
      }
      files.forEach(file => {
        travel(path.join(from, file), to, travelCallback)
      })
    })
  })
  
}
return {
  checkDistFolder,
  travel
}