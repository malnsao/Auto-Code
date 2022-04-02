const path = require('path');
const rootpath = path.resolve('./');
module.exports = {
  /** 页面模板路径 */
  sourcePagePath: path.join(__dirname, 'template'),
  /** 生成页面路径 */
  targetPagePath: `${rootpath}/src/pages`,

  /** API模板路径 */
  sourceApiPath: path.join(__dirname, 'api'),
  /** 生成页面路径 */
  targetApiPath: `${rootpath}/src/api`,

  /** 路由路径 */
  sourceRouterPath: `${rootpath}/src/routers`,

  /** 配置文件路径 */
  configPath: `${rootpath}/autoCodeConfig.yaml`,
};
