/* eslint-disable strict */
// 拦截捕获异常
module.exports = (option, app) => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (error) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', error, ctx);

      // 根据错误码来判断出了什么错误，对应错误的错误码可以在postman获取
      ctx.status = error.status;
      if (ctx.status === 422) {
        return ctx.body = {
          msg: 'fail',
          data: error.errors,
        };
      }
      ctx.body = {
        msg: 'fail',
        data: error.message,
      };
    }
  };
};
