import { Application } from 'egg';
import { initRouter } from './decorator/router_register';
//const ueditor = require('egg-ueditor')
//const ueditor = require('./libs/egg-ueditor/lib/uploadx')
//const ueditor = require('./libs/egg-ueditor')
export default (app: Application) => {
  // const { controller, router } = app;
  // router.all('/a', controller.welcome.index);
  // 使用@Route进行注册路由
  //app.router.all('/ueditor', ueditor());
   

  initRouter(app);
};
