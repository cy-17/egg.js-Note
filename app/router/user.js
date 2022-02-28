/* eslint-disable strict */
module.exports = app => {
  const { router, controller } = app;

  router.get('/user/list', controller.user.index);
  router.get('/user/read/:id', controller.user.read);

  // post请求不可以在浏览器中直接访问，所以要用postman调试
  router.post('/user/create', controller.user.create);
  // 修改
  router.post('/user/update/:id', controller.user.update);
  // 删除
  router.post('/user/delete/:id', controller.user.destroy);
  // router.get('/user/delete', controller.user.destroy);
};
