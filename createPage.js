const fs = require('fs');
const { readAndWritePage } = require('./taskStream');
const createComponent = require('./createComponent');

/**
 * 文件遍历
 */
function createFile (sourcePath, targetPath, config) {
  fs.readdir(sourcePath, function (err, files) {
    if (err) {
      throw err;
    }
    // 遍历读取到的文件列表
    files.forEach(function (filename) {
      const src = `${sourcePath}/${filename}`;
      const dst = `${targetPath}/${filename}`;

      // 根据文件路径获取文件信息，返回一个fs.Stats对象
      fs.stat(src, async function (err, stats) {
        if (err) {
          throw err;
        }
        const isFile = stats.isFile(); // 是文件
        const isDir = stats.isDirectory(); // 是文件夹
        // 判断是否为文件
        if (isFile) {
          await readAndWritePage(src, dst, config);
        } else if (isDir) {
          // if (!config.compData || config.compData.length === 0) {
          //   console.log('--------组件创建失败---------');
          //   return false;
          // }
          createComponent(src, dst, config);
        }
      });
    });
  });
}

/**
 * 判断文件夹是否存在
 */
function isFolderExisted (sourcePath, targetPath, expMap) {
  const isExisted = fs.existsSync(targetPath);
  if (isExisted) {
    createFile(sourcePath, targetPath, expMap);
  } else {
    fs.mkdir(targetPath, () => createFile(sourcePath, targetPath, expMap));
  }
}
module.exports = isFolderExisted;
