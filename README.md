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

#
