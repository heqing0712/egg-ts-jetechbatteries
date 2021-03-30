// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./app/libs/egg-ueditor/lib/config');

// 同步创建文件目录
function mkdirsSync(dirname: string) {
if (fs.existsSync(dirname)) {
    return true;
}
if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
}
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

const publicDir ='public'
let  dir = setFullPath(config['imagePathFormat'])

dir = path.join(publicDir, dir);
console.log(dir)
mkdirsSync(dir);
