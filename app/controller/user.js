'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 用户列表
  async index() {
    // 拿到数据
    let result = [];

    // 【应用】验证用户登录状态时抛出异常就不用return再判断
    this.ctx.throw(500, '故意出错');

    // 分页功能
    const page = this.ctx.query.page ? parseInt(this.ctx.query.page) : 1;// 获取url的?page=页码
    const limit = 5;// 限制每页5条数据
    const offset = (page - 1) * 5;// 偏移多少页，获取从offset开始的limit条数据
    // 查询多个
    const Op = this.app.Sequelize.Op; // 固定写法，使用数据库查询的Op方法
    result = await this.app.model.User.findAll({
      where: {
      //   sex: '男',
      //   username: {
      //     [Op.like]: '%用户%', // like：模糊匹配
      //   },
      //   id: {
      //     [Op.gt]: 6, // id>6
      //   },
      },
      // attributes: ['id', 'username', 'sex'],
      attributes: {
        // 按照条件检索时排除检索password字段的内容
        exclude: [ 'password' ],
      },
      order: [
        [ 'updated_at', 'DESC' ],
        [ 'id', 'DESC' ],
      ],
      offset,
      limit,
    });
    // 查询多个并计数
    // result = await this.app.model.User.findAndCountAll();

    // 获取url的问号get传值参数，如http://127.0.0.1:7001/user/list?page=1
    // this.ctx.query.page;
    // 响应
    this.ctx.body = {
      msg: 'ok',
      data: result,
    };
    // 修改状态码
    // this.ctx.status = 200;
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
    const id = parseInt(this.ctx.params.id);
    // let detail = demo.find(item => item.id == id);

    // 通过主键查询单个数据
    // const detail = await this.app.model.User.findByPk(id);
    // if (!detail) {
    //   return this.ctx.body = {
    //     msg: 'fail',
    //     data: '用户不存在',
    //   };
    // }

    // 查询单个，多个要求
    const detail = await this.app.model.User.findOne({
      where: {
        id,
        sex: '女',
      },
    });

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


  // http://127.0.0.1:7001/user/update/1
  async update() {
    const id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0;
    // 拿到这条记录
    const data = await this.app.model.User.findByPk(id);
    if (!data) {
      return this.ctx.body = {
        msg: 'fail',
        data: '该记录不存在',
      };
    }

    data.username = '被修改了';

    data.sex = '男';

    // 限制只能修改username字段，无法修改数据库中的其他的字段
    // 【应用】：限制不能修改密码字段
    // let res = await data.save({
    //     fields: ['username']
    // });

    const params = this.ctx.request.body;
    const res = await data.update(params, {
      fields: [ 'username' ],
    });

    this.ctx.body = {
      msg: 'ok',
      data: res,
    };

  }


  async destroy() {
    // 删除单个
    // let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0;
    // let data = await this.app.model.User.findByPk(id);
    // if (!data) {
    //     return this.ctx.body = {
    //         msg: "fail",
    //         data: "该记录不存在"
    //     };
    // }
    // let res = await data.destroy();
    // this.ctx.body = {
    //     msg: "ok",
    //     data: res
    // };

    // 批量删除
    const Op = this.app.model.Sequelize.Op;
    const res = await this.app.model.User.destroy({
      where: {
        id: {
          [Op.lte]: 7,
        },
      },
    });
    this.ctx.body = {
      msg: 'ok',
      data: res,
    };
  }
}

module.exports = UserController;
