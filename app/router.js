'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 2、创建list接口
  router.get('/list', controller.home.list);
  // 3、访问http://127.0.0.1:7001/list，得到：
  //   {
  //     "msg": "ok",
  //     "data": [
  //         1,
  //         2,
  //         3,
  //         4,
  //         5,
  //         6,
  //         7
  //     ]
  // }

  router.get('/user/list', controller.user.index);
  router.get('/user/read/:id', controller.user.read);

  // post请求不可以在浏览器中直接访问，所以要用postman调试
  router.post('/user/create', controller.user.create);

};
