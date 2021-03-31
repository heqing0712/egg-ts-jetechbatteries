// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require('koa-multer');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const makeError = require('./lib/make-error');

// 默认静态目录
let publicDir = '';

// 同步创建文件目录
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
}

// 获取文件后缀
function getSuffix(filename) {
  return filename.substr(filename.lastIndexOf('.')).toLowerCase();
}

// function allowAll(req, file, cb) {
//   cb(null, true);
// }

// 默认存储方式
const diskStorage = multer.diskStorage({
  // 文件保存路径
  destination(req, file, cb) {
    let dir = '';
    let type = 'file';
    file.mimetype.replace(/image|video/g, v => {
      // eslint-disable-next-line no-return-assign
      return type = v;
    });
    dir = path.join(publicDir, 'upload', type);
    mkdirsSync(dir);
    cb(null, dir);
  },
  // 修改文件名称，时间戳+6位随机数
  filename(req, file, cb) {
    cb(null, Date.now() + (Math.random().toString().substr(2, 6)) + getSuffix(file.originalname));
  },
});

function getOptions(options = {}) {
  let storage;
  publicDir = path.resolve(options.dir || 'public');


  if (options.storage) {
    storage = options.storage;
  } else {
    storage = diskStorage;
  }

  const allowfiles = options.allowfiles || '*'; // 文件类型，['.jpg', '.png']
  const fileFilter = (req, file, cb) => {
    if (allowfiles === '*' || allowfiles.includes(getSuffix(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  };
  const fields = options.fields || [{ name: 'upfile', maxCount: 1 }];
  const filesLeft = Object.create(null);
  const preservePath = options.preservePath;
  fields.forEach(function(field) {
    if (typeof field.maxCount === 'number') {
      filesLeft[field.name] = field.maxCount;
    } else {
      filesLeft[field.name] = Infinity;
    }
  });

  function wrappedFileFilter(req, file, cb) {
    if ((filesLeft[file.fieldname] || 0) <= 0) {
      return cb(makeError('LIMIT_UNEXPECTED_FILE', file.fieldname));
    }

    filesLeft[file.fieldname] -= 1;
    fileFilter(req, file, cb);
  }


  return {
    preservePath,
    storage,
    fileFilter: wrappedFileFilter,
    limits: {
      files: 20, // 单次上传文件最大数量
      fileSize: 2 * 1024 * 1024, // 文件最大长度 (字节单位)
    },
    fileStrategy: 'VALUE',
  };
}


exports = module.exports = getOptions;
