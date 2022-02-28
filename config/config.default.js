/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1579788120104_5194';

  // add your middleware config here 访问路由的时候会首先找的中间件
  config.middleware = [ 'errorHandler' ];
  // 中间件配置
  config.errorHandler = {
    // enable: false,// 控制中间件是否开启。
    // match: ["/user/list", '/user/read'],// 设置只有符合某些规则的请求才会经过这个中间件（匹配路由）
    // ignore: ['/user/list']// 设置符合某些规则的请求不经过这个中间件。
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 关闭csrf开启跨域
  config.security = {
    // 关闭 csrf
    csrf: {
      enable: false,
    },
    // 跨域白名单
    domainWhiteList: [],
  };
  // 允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT, POST, DELETE, PATCH',
  };

  // 数据库
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '1234',
    port: 3306,
    database: 'eggapi',
    // 中国时区
    timezone: '+08:00',
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳 created_at updated_at
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      // paranoid: true,
      // 创建时间戳
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      // deletedAt: 'deleted_at',
      // 所有驼峰命名格式化
      underscored: true,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
