async function creatCpt() {
    try {
     await exists(); // 检测文件夹
     await readFile(); // 读取模板内容
     await writeFile(await readFile()); //写入组件
    }
    catch (err) {
     console.error(err);
    }
   }