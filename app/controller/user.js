'use strict';

const Controller = require('egg').Controller;

// 假装是数据库获取来的数据：
const demo = [{
  id: 1,
  username: '用户名1',
  nickname: '昵称',
  sex: '男',
}, {
  id: 2,
  username: '用户名2',
  nickname: '昵称',
  sex: '男',
}, {
  id: 3,
  username: '用户名3',
  nickname: '昵称',
  sex: '男',
}, {
  id: 4,
  username: '用户名4',
  nickname: '昵称',
  sex: '男',
}];
class UserController extends Controller {
  // 用户列表
  async index() {
    // 拿到数据
    const result = demo;
    // 获取url的问号get传值参数，如http://127.0.0.1:7001/user/list?page=1
    this.ctx.query.page;
    // 响应
    this.ctx.body = {
      msg: 'ok',
      data: result,
    };
    // 修改状态码
    this.ctx.status = 201;
  }


  // 通过获取id来读取其用户数据:
  // 访问http://127.0.0.1:7001/user/read/1得：
  //   {
  //     "msg": "ok",
  //     "data": {
  //         "id": 1,
  //         "username": "用户名1",
  //         "nickname": "昵称",
  //         "sex": "男"
  //     }
  // }
  async read() {
    // 获取url中的id值
    const id = this.ctx.params.id;
    // 在数据中找到用户信息
    const detail = demo.find(item => item.id === Number(id));
    this.ctx.body = {
      msg: 'ok',
      data: detail,
    };
  }


  // 创建用户
  async create() {
    // 写入数据库

    // 新增单个
    // const res = await this.app.model.User.create({
    //   username: 'ceshi',
    //   password: '123456',
    //   sex: '男',
    // });

    // 批量新增
    const res = await this.app.model.User.bulkCreate([
      {
        username: '用户1',
        password: '密码1',
        sex: '男',
      },
      {
        username: '用户2',
        password: '密码2',
        sex: '男',
      },
      {
        username: '用户3',
        password: '密码3',
        sex: '男',
      },
      {
        username: '用户4',
        password: '密码4',
        sex: '男',
      },
      {
        username: '用户5',
        password: '密码5',
        sex: '男',
      },
      {
        username: '用户6',
        password: '密码6',
        sex: '男',
      },
    ]);

    // 参数验证
    // 成功
    this.ctx.body = res;

  }
}

module.exports = UserController;
