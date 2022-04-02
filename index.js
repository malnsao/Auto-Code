const fs = require('fs');
const yaml = require('js-yaml');
const {
  sourcePagePath,
  targetPagePath,
  configPath,
  sourceApiPath,
  targetApiPath,
  sourceRouterPath,
} = require('./filePath');
const createPage = require('./createPage');
const createApi = require('./createApi');
const { readAndWriteRoute } = require('./taskStream');

function readConfig () {
  const fileContents = fs.readFileSync(configPath, { encoding: 'utf8' });
  const data = yaml.load(fileContents);
  const jsonTemp = JSON.parse(JSON.stringify(data));
  const routes = [];
  jsonTemp[0].forEach((item) => routes.push(item.name));
  return {
    jsonTemp,
    routes,
  };
}

module.exports = function run () {
  const { jsonTemp, routes } = readConfig();
  jsonTemp[0].forEach((item) => {
    createPage(sourcePagePath, `${targetPagePath}/${item.name}`, {
      apiName: item.name,
      columns: item.columns,
      constance: item.constance,
    });
    createApi(sourceApiPath, `${targetApiPath}/${item.name}`, { api: item.api });
  });
  readAndWriteRoute(sourceRouterPath, routes);
};
