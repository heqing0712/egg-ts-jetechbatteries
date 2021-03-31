
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require('koa-multer');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const multer = require('../../multer-master');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const makeMiddleware = require('../../multer-master/multer/lib/make-middlewarex');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const getOptions = require('../../multer-master/multer/get-options');

function makePromise(ctx, next, _options) {
  const options = getOptions(_options);
  return new Promise((resolve, reject) => {
    makeMiddleware(ctx.req, options, err => {
      err ? reject(err) : resolve(ctx);
    });
  }).then(next);
}


// 处理Ueditor上传保存路径
function setFullPath(dest) {
  const date = new Date();

  const map = {
    t: date.getTime(), // 时间戳
    m: date.getMonth() + 1, // 月份
    d: date.getDate(), // 日
    h: date.getHours(), // 时
    i: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
  };

  dest = dest.replace(/\{([ymdhis])+\}|\{time\}|\{rand:(\d+)\}/g, function(all, t, r) {
    let v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(6 - all.length);
    } else if (all === '{time}') {
      return map.t;
    } else if (r >= 0) {
      return Math.random().toString().substr(2, r);
    }
    return all;
  });

  return dest;
}

const ueditor = function(dir, options) {

  if (typeof dir === 'object') {
    options = dir;
    dir = '';
  }

  let ueOpts = [];
  if (typeof dir === 'object') {
    if (Array.isArray(dir)) {
      ueOpts = dir;
    } else {
      options = dir;
      ueOpts.push(dir || 'public');
      ueOpts.push('public');
    }
  } else {
    ueOpts.push(dir || 'public');
    ueOpts.push('public');
  }

  const publicDir = path.resolve(ueOpts[0]);
  // const publicUrlDir = ueOpts[1];
  const conf = Object.assign({}, config, options || {});
  const uploadType = {
    [conf.imageActionName]: 'image',
    [conf.scrawlActionName]: 'scrawl',
    [conf.catcherActionName]: 'catcher',
    [conf.videoActionName]: 'video',
    [conf.fileActionName]: 'file',
  };
  // const listType = {
  //   [conf.imageManagerActionName]: 'image',
  //   [conf.fileManagerActionName]: 'file',
  // };

  // 文件上传限制
  const limits = {
    fields: 10, // 非文件字段的数量
    fileSize: 500 * 1024, // 文件大小 单位 b
    files: 1, // 文件数量
  };


  // Ueditor Controller
  return async (ctx, next) => {
    let result = {};
    const resInfo = {};
    const { action } = ctx.query;
    const allowfiles = conf.imageAllowFiles;

    if (Object.keys(uploadType).includes(action)) {
      const actionName = uploadType[action];
      const pathFormat = setFullPath(conf[actionName + 'PathFormat']).split('/');
      // const filename = pathFormat.pop();

      // 上传文件存放路径、及文件命名
      const storage = multer.diskStorage({
        destination: path.join(publicDir, ...pathFormat),
        filename(req, file, cb) {
          const type = file.originalname.split('.')[1];
          cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
        },
      });


      await makePromise(ctx, next, { storage, limits, allowfiles });


      // const uploadx = () => {
      //   return multer({ storage, limits });
      // };
      // const multerObj = uploadx();
      // const pm = await multerObj.single('upfile');
      // await pm(ctx, next);


      resInfo.url = '';
      result = Object.assign({ state: 'SUCCESS' }, resInfo);

    } else if (action === 'config') {
      result = conf;
    } else {
      result = { state: 'FAIL' };
    }


    ctx.body = JSON.stringify(result);
  };
};
exports = module.exports = ueditor;
