const fs = require('fs');
const { readAndWriteComponent } = require('./taskStream');
/**
 * 文件遍历
 */
function createFile (sourcePath, targetPath, config) {
  fs.mkdir(targetPath, () => {
    // 根据文件路径读取文件，返回文件列表
    fs.readdir(sourcePath, function (err, files) {
      if (err) {
        throw err;
      }
      // 遍历读取到的文件列表
      files.forEach(function (filename) {
        const src = `${sourcePath}/${filename}`;
        const dst = `${targetPath}/${filename}`;

        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(src, function (err, stats) {
          if (err) {
            throw err;
          }
          readAndWriteComponent(src, dst, config);
        });
      });
    });
  });
}

module.exports = createFile;
