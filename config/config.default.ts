import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';
import * as fs from 'fs';
import {ValidationError} from 'class-validator';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '0.0.0.0',
    }
};

  /**
   * typeorm 配置
   * 文档：https://www.npmjs.com/package/egg-ts-typeorm
   */
  config.typeorm = {
    client: {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'sf_admin_jetechenergy',
      synchronize: false,
      logging: true,
      // timezone: '+08:00',
      /**
       * JavaScript对数据库中int和bigint的区别对待：
       * 刚开始开发中，线下测试数据库id字段采用int，数据库SELECT操作返回的结果是Number，但是使用bigint，数据库返回的为String，
       * 初步猜想是因为bigint的值范围会超过Number，所以采用String。但是这样会对我们业务产生巨大影戏那个，一方面，DTO校验会无法通过，另一方面，问题1中的业务逻辑会受影响。
       * 经过查找各方文档，解决方案是在数据库连接配置中配置：
       * "supportBigNumbers": false
       * 可以配置这个的原因是我们的业务ID距离Number的上线远远达不到，所以可以用这种方式让
       * bigint也返回Number。
       * 但是这样配置，TypeOrm插入操作的返回值中的identifiers字段中的id还是String，所以问题1中的处理方式也要对String进行parseInt操作。
       */
      supportBigNumbers: false,
    },
  };


  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597893009804_8539';

  // 配置网站图标 可为网络图标
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(__dirname, '../favicon.ico')),
  };

  // add your egg config in here
  config.middleware = [ 'adminReqLog', 'execption', 'adminAuthority' ];

  config.aesSecret = {
    admin: 'hXuLvp6zmhahtW1kf21DpYxm',
    front: 'eECRYHR5Er93BijVlkMz9CIn',
  };

  config.jwt = {
    secret: 'INnyQ50BEE6AITQraIaDGooJ',
  };

  // Root角色对应ID
  config.rootRoleId = 1;

  /**
   * 框架内置了国际化（I18n）支持，由 egg-i18n 插件提供。
   * 更多配置参考 @{Link:https://github.com/eggjs/egg-i18n}
   */
  config.i18n = {
    defaultLocale: 'zh-CN',
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // https://eggjs.org/zh-cn/core/security.html
  config.security = {
    // 配合egg-cors使用
    domainWhiteList: [ 'https://vue-admin-9girha1607536ebb-1258100541.tcloudbaseapp.com' ],
    csrf: {
      // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      enable: true,
      ignoreJSON: true,
    },
  };

  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  
  
  // bull config
  config.bull = {
    default: {
      redis: {
        port: 6379,
        host: '127.0.0.1',
        password: '123456',
        db: 0,
      },
      prefix: 'admin:task',
    },
  };

  /**
   * egg-global-header
   * https://github.com/eggjs/egg-global-header
   */
  config.globalHeader = {
    'Powered-by': 'sf_admin',
  };

  /**
   * CORS
   * https://github.com/eggjs/egg-cors
   */

  // 模板渲染配置
  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  // static config
  config.static = {
    prefix: '/static/',
    dir:[
      path.join(appInfo.baseDir, 'public'),
      {
        prefix:'/static/',
        dir: path.join(appInfo.baseDir, 'public/admin/static')
      }
    ],
    dynamic: true,
    preload: false,
    // maxAge: 31536000,
    maxAge: 0,
    buffer: false,
  };

  /**
   * https://eggjs.org/zh-cn/basics/controller.html#获取上传的文件
   */
  config.multipart = {
    mode: 'file',
  };


  // 配置 class-transformer options
  config.classValidator = {
    classTransformOptions: {
      excludeExtraneousValues: false
    },
    // 自定义错误处理
    handleError: (ctx, errors:ValidationError[]) => {
      // 做你想做的事情，第一个参数为Context，第二个参数为ValidationError[]
      
      const errorMsgList:any = []
      errors.forEach((error:ValidationError)=>{
        const errList:string[] = []
         for(const d in error.constraints ){
          errList.push(error.constraints[d])
         }
         //参数 ${error.property}(${error.value}) 
         errorMsgList.push(`${errList.join(',')}`)
      })

      ctx.throw(400, `参数异常,${errorMsgList.join(',')}`);
    }
  }



  // https://eggjs.org/zh-cn/core/error-handling.html
  config.onerror = {
    // all(err: any, ctx: any) {
    //   // 在此处定义针对所有响应类型的错误处理方法
    //   // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    //   ctx.set('Content-Type', 'application/json');
    //   // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
    //   const status = err.status || 500;
    //   const message = status === 500 && ctx.app.config.env === 'prod' ? 'Server internal exception, please try again later' : err.message;
    //   ctx.body = JSON.stringify({
    //     errorCode: err.errorCode || 500,
    //     message,
    //   });
    // },
  };

  exports.cors = {
    enable: true,
    package: 'egg-cors'
  }


  /**
   * redis 配置
   * https://github.com/eggjs/egg-redis
   */
  config.redis = {
    clients: {
      // instanceName. See below
      admin: {
        port: 6379,
        host: '127.0.0.1',
        password: '123456',
        db: 0,
      },
      app: {
        port: 6379,
        host: '127.0.0.1',
        password: '123456',
        db: 1,
      },
    },
  };

  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      // ignore: ctx => {
      //   if(ctx.request.url.indexOf('/ueditor')>-1){
      //     return true;
      //   }
      //   return false; 
      // },
      enable:false
    }
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
