import { Context } from 'egg';
import * as _ from 'lodash';

// 无需token的地址
const noTokenUrl = [
  '/admin/captcha/img',
  '/admin/login',
  '/admin/editor/ueditor'
];

const noPermUrl = [
  '/admin/permmenu',
  '/admin/person',
  '/admin/logout',
];


/**
 * Admin权限验证中间件，只检测/admin开头请求
 * Token验证通过会把当前解析的Token解析把对象挂载到ctx.token上,token对象例如{ uid, pv }
 */
export default function AdminAuthority(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { url } = ctx;
    let statusCode = 200;
    let errorCode = 0;
    const checkPerm = false

    const token = ctx.get('Authorization');
    if (_.startsWith(url, '/admin')) {
      if (noTokenUrl.includes(url.split('?')[0])) {
        await next();
        return;
      }
      try {
        ctx.token = ctx.helper.jwtVerify(token);
      } catch (e) {
        statusCode = 401;
        errorCode = 11001;
      }
    
      if (ctx.token) {
        if (noPermUrl.includes(url.split('?')[0])) {
          await next();
          return;
        }
        const pv = await ctx.service.admin.comm.verify.getRedisPasswordVersionById(ctx.token.uid);
        if (pv !== `${ctx.token.pv}`) {
          // 判断密码版本，防止登录时更改密码还在允许使用
          errorCode = 11002;
          statusCode = 401;
        } else {
          const redisToken = await ctx.service.admin.comm.verify.getRedisTokenById(ctx.token.uid);
          // 查询token是否一致
          if (token !== redisToken) {
            errorCode = 11002;
            statusCode = 401;
          } 
          
          else if(checkPerm){
            // 遍历权限是否包含该url，不包含则无访问权限
            let perms = await ctx.service.admin.comm.verify.getRedisPermsById(ctx.token.uid);
            if (_.isEmpty(perms)) {
              errorCode = 11001;
              statusCode = 403;
            } else {
              // 将sys:admin:user等转换成sys/admin/user
              perms = JSON.parse(perms!).map(e => {
                return e.replace(/:/g, '/');
              });
              if (!perms!.includes(url.split('?')[0].replace('/admin/', ''))) {
                errorCode = 11003;
                statusCode = 403;
              }
            }
          }
        }
      }
      if (statusCode > 200) {
        ctx.status = 200;
        ctx.body = {
          code: errorCode,
          message: ctx.helper.getErrorMessageByCode(`${errorCode}`),
        };
        return;
      }
    }
    // has perms, pass
    await next();
  };
}
