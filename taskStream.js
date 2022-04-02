const fs = require('fs');
const readline = require('readline');
const os = require('os');

function spaceStr (num) {
  let str = '';
  for (let index = 0; index < num; index++) {
    str += ' ';
  }
  return str;
}

/**
 *
 * @param {*} sourcePath 模板路径
 * @param {*} targetPath 目标路径
 *
 */
function stream (sourcePath, targetPath) {
  // 创建一个可读流
  const rs = fs.createReadStream(sourcePath);
  // 创建一个可写流
  const ws = fs.createWriteStream(targetPath);

  const objReadLine = readline.createInterface({
    input: rs,
  });

  return {
    ws,
    objReadLine,
  };
}

/**
 * 生成page
 * @param {*} sourcePath 模板路径
 * @param {*} targetPath 目标路径
 *
 */
function readAndWritePage (sourcePath, targetPath, { apiName, columns, constance } = {}) {
  let pageLine = 1;
  return new Promise((resolve) => {
    const { ws, objReadLine } = stream(sourcePath, targetPath);
    objReadLine.on('close', () => {
      pageLine = 1;
      console.log(`${targetPath} readline close...`);
      resolve(true);
    });
    objReadLine.on('line', (line) => {
      ws.write(line + os.EOL);
      if (sourcePath.indexOf('index.tsx') > -1) {
        if (pageLine === 10) {
          ws.write(`import { getList, del, edit, add } from '@/api/${apiName}/index';${os.EOL}`);
          ws.write(`import { IDataRow } from '@/api/${apiName}/type';${os.EOL}`);
        }
        if (pageLine === 55) {
          ws.write(`  const columns = [${os.EOL}`);
          for (const c of columns) {
            ws.write(`    {${os.EOL}`);
            ws.write(`      key: '${c.key}',${os.EOL}`);
            ws.write(`      header: intl('${c.header}'),${os.EOL}`);
            c.render && ws.write(`      render: ${c.render},${os.EOL}`);
            ws.write(`    },${os.EOL}`);
          }
          ws.write(`  ];${os.EOL} \n`);
        }
      }

      if (sourcePath.indexOf('constance.ts') > -1) {
        if (pageLine === 2) {
          ws.write(`\nexport const formData = { ${os.EOL}`);
          for (const c in constance) {
            ws.write(`${spaceStr(2)}${c}: { ${os.EOL}`);
            for (const cc in constance[c]) {
              if (constance[c][cc] instanceof Array) {
                ws.write(`${spaceStr(4)}${cc}: [${os.EOL}`);
                // eslint-disable-next-line max-depth
                for (const option of constance[c][cc]) {
                  ws.write(`${spaceStr(6)}{${os.EOL}`);
                  option.value && ws.write(`${spaceStr(8)}value: '${option.value}',${os.EOL}`);
                  option.text && ws.write(`${spaceStr(8)}text: intl('${option.text}'),${os.EOL}`);
                  option.disabled &&
                    ws.write(`${spaceStr(8)}disabled: ${option.disabled},${os.EOL}`);
                  ws.write(`${spaceStr(6)}},${os.EOL}`);
                }
                ws.write(`${spaceStr(4)}],${os.EOL}`);
                continue;
              }
              ws.write(`${spaceStr(4)}${cc}: ${constance[c][cc]}, ${os.EOL}`);
            }
            ws.write(`${spaceStr(2)}}, ${os.EOL}`);
          }
          ws.write(`}; ${os.EOL}`);
        }
      }
      pageLine++;
    });
  });
}

/**
 * 生成component
 * @param {*} sourcePath 模板路径
 * @param {*} targetPath 目标路径
 *
 */
function readAndWriteComponent (sourcePath, targetPath, { apiName, compData } = {}) {
  let componmentLine = 1;
  return new Promise((resolve) => {
    const { ws, objReadLine } = stream(sourcePath, targetPath, componmentLine);
    objReadLine.on('close', () => {
      componmentLine = 1;
      console.log(`${targetPath} readline close...`);
    });
    objReadLine.on('line', (line) => {
      ws.write(line + os.EOL);
      // if (componmentLine === 5) {
      //   ws.write(`import { IDataRow } from '@/api/${apiName}/type';${os.EOL}`);
      // }
      // if (componmentLine === 21) {
      //   for (const s of compData) {
      //     ws.write(`  /** ${s[3]} */${os.EOL}`);
      //     ws.write(
      //       `  const [${s[0]}, ${s[1]}] = useState<string>((info && info.${s[0]}) || '');${os.EOL}`,
      //     );
      //   }
      // }
      // if (componmentLine === 24 || componmentLine === 38 || componmentLine === 40) {
      //   for (const s of compData) {
      //     ws.write(`      ${s[0]},${os.EOL}`);
      //   }
      // }
      // if (componmentLine === 46) {
      //   for (const s of compData) {
      //     let formItem = `${spaceStr(6)}<Controller
      //   name="${s[0]}"
      //   control={control}
      //   rules={{
      //     validate: (value) => {
      //       if (!${s[0]}) {
      //         return intl('NO_EMPTY');
      //       }
      //       return undefined;
      //     },
      //   }}
      //   render={({ field, fieldState }) => (
      //     <Form.Item
      //       required
      //       label={intl('${s[4]}')}
      //       status={formState?.isValidating ? 'validating' : getStatus(fieldState)}
      //       message={errors?.${s[0]}?.message}
      //     >\n`;
      //     if (s[2] === 'Input') {
      //       formItem += `${spaceStr(12)}<${s[2]}
      //         size="full"
      //         value={${s[0]}}
      //         onChange={(value) => ${s[1]}(value)}
      //         autoComplete="off"
      //         placeholder={intl('ENTER_THE_REMARK')}
      //       />`;
      //       ws.write(`${formItem}${os.EOL}`);
      //     }
      //     if (s[2] === 'Select') {
      //       formItem += `${spaceStr(12)}<${s[2]}
      //         size="full"
      //         listWidth={200}
      //         appearance="button"
      //         options={[]}
      //         value={${s[0]}}
      //         onChange={(value) => ${s[1]}(value)}
      //       />`;
      //       ws.write(`${formItem}${os.EOL}`);
      //     }
      //     ws.write(`${spaceStr(10)}</Form.Item>${os.EOL}`);
      //     ws.write(`${spaceStr(8)})}${os.EOL}`);
      //     ws.write(`${spaceStr(6)}/>${os.EOL}`);
      //   }
      // }
      componmentLine++;
    });
  });
}

/**
 * 生成api
 * @param {*} sourcePath 模板路径
 * @param {*} targetPath 目标路径
 *
 */
function readAndWriteApi (sourcePath, targetPath, { api } = {}) {
  let apiLine = 1;
  return new Promise((resolve, reject) => {
    const { ws, objReadLine } = stream(sourcePath, targetPath);
    objReadLine.on('line', (line) => {
      ws.write(line + os.EOL);
      if (apiLine === 8) {
        ws.write(`    url: '${api[0].url}',${os.EOL}`);
      }
      if (apiLine === 16) {
        ws.write(`    url: '${api[1].url}',${os.EOL}`);
      }

      if (apiLine === 28) {
        ws.write(`    url: '${api[2].url}',${os.EOL}`);
      }

      if (apiLine === 40) {
        ws.write(`    url: '${api[3].url}',${os.EOL}`);
      }
      apiLine++;
    });

    objReadLine.on('close', () => {
      apiLine = 1;
      console.log(`${targetPath} readline close...`);
      resolve(true);
    });
  });
}
/**
 * 生成apiType
 * @param {*} sourcePath 模板路径
 * @param {*} targetPath 目标路径
 *
 */
function readAndWriteApiType (sourcePath, targetPath, { api } = {}) {
  let apiTypeLine = 1;
  return new Promise((resolve, reject) => {
    const { ws, objReadLine } = stream(sourcePath, targetPath);
    objReadLine.on('line', (line) => {
      ws.write(line + os.EOL);

      if (apiTypeLine === 5) {
        for (const a of api[0].req) {
          ws.write(`  /** ${a[2]} */${os.EOL}`);
          ws.write(`  ${a[0]}: ${a[1]};${os.EOL}`);
        }
      }
      if (apiTypeLine === 11) {
        for (const a of api[0].res) {
          ws.write(`  /** ${a[2]} */${os.EOL}`);
          ws.write(`  ${a[0]}: ${a[1]};${os.EOL}`);
        }
      }
      if (apiTypeLine === 22) {
        for (const a of api[1].req) {
          ws.write(`  /** ${a[2]} */${os.EOL}`);
          ws.write(`  ${a[0]}: ${a[1]};${os.EOL}`);
        }
      }
      if (apiTypeLine === 28) {
        for (const a of api[2].req) {
          ws.write(`  /** ${a[2]} */${os.EOL}`);
          ws.write(`  ${a[0]}: ${a[1]};${os.EOL}`);
        }
      }
      if (apiTypeLine === 34) {
        for (const a of api[3].req) {
          ws.write(`  /** ${a[2]} */${os.EOL}`);
          ws.write(`  ${a[0]}: ${a[1]};${os.EOL}`);
        }
      }
      apiTypeLine++;
    });
    objReadLine.on('close', () => {
      apiTypeLine = 1;
      console.log(`${targetPath} readline close...`);
      resolve(true);
    });
  });
}

/**
 * 添加路由
 * @param {*} sourcePath 模板路径
 * @param {*} targetPath 目标路径
 *
 */
function readAndWriteRoute (sourcePath, routeNames = []) {
  let routeLine = 1;
  const oldName = `${sourcePath}/index.ts`;
  const newName = `${sourcePath}/index.tsx`;
  fs.rename(oldName, newName, (err) => {
    if (err) {
      throw err;
    }
    // 创建一个可读流
    const rs = fs.createReadStream(newName);
    // 创建一个可写流
    const ws = fs.createWriteStream(oldName);

    const objReadLine = readline.createInterface({
      input: rs,
    });

    objReadLine.on('line', (line) => {
      ws.write(line + os.EOL);
      if (routeLine === 9) {
        for (const r of routeNames) {
          ws.write(`      {${os.EOL}`);
          ws.write(`        path: '/${r}',${os.EOL}`);
          ws.write(`        component: '@/pages/${r}',${os.EOL}`);
          ws.write(`      },${os.EOL}`);
        }
      }
      routeLine++;
    });

    objReadLine.on('close', () => {
      routeLine = 1;
      console.log(`${oldName} readline close...`);
      fs.unlinkSync(newName);
    });
  });
}

module.exports = {
  readAndWritePage,
  readAndWriteComponent,
  readAndWriteApi,
  readAndWriteApiType,
  readAndWriteRoute,
};
