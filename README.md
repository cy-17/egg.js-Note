https://www.eggjs.org/zh-CN/basics

安装egg.js

```
全局切换镜像： 
npm config set registry https://registry.npm.taobao.org
```

我们推荐直接使用脚手架，只需几条简单指令，即可快速生成项目（`npm >=6.1.0`）:

```js
mkdir egg-example && cd egg-example
//创建egg项目：npm init egg --type=simple 如果直接执行可能会报错，加上淘宝镜像一起执行就好了
npm init egg --type=simple --registry https://registry.npm.taobao.org
npm i
```

启动项目:

```
npm run dev
open http://localhost:7001
```

## 创建控制器

```js
async index() {
    const { ctx } = this;
    // 获取路由get传值参数（路由:id）
    ctx.params;
    // 获取url的问号get传值参数
    ctx.query;
    // 响应
    ctx.body = '响应';
    // 状态码
	ctx.status = 201;
}
```

# 关闭csrf开启跨域
（post请求会跨域）
文档：https://www.npmjs.com/package/egg-cors

- 安装  npm i egg-cors --save
- 配置插件

```js
// {app_root}/config/plugin.js
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
```

- config / config.default.js 目录下配置

```js
  config.security = {
    // 关闭 csrf
    csrf: {
      enable: false,
    },
     // 跨域白名单
    domainWhiteList: [ 'http://localhost:3000' ],
  };
  // 允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT, POST, DELETE, PATCH'
  };
```

# 