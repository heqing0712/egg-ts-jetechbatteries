// eslint-disable-next-line @typescript-eslint/no-var-requires
const makeError = require('./lib/make-error');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const makeMiddleware = require('./lib/make-middleware');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const diskStorage = require('./storage/disk');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const memoryStorage = require('./storage/memory');

function allowAll(req, file, cb) {
  cb(null, true);
}

function Multer(options) {
  if (options.storage) {
    this.storage = options.storage;
  } else if (options.dest) {
    this.storage = diskStorage({ destination: options.dest });
  } else {
    this.storage = memoryStorage();
  }

  this.limits = options.limits;
  this.preservePath = options.preservePath;
  this.fileFilter = options.fileFilter || allowAll;
}

Multer.prototype._makeMiddleware = function(fields, fileStrategy) {
  function setup() {
    const fileFilter = this.fileFilter;
    const filesLeft = Object.create(null);
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
      limits: this.limits,
      preservePath: this.preservePath,
      storage: this.storage,
      fileFilter: wrappedFileFilter,
      fileStrategy,
    };
  }

  return makeMiddleware(setup.bind(this));
};

Multer.prototype.single = function(name) {
  return this._makeMiddleware([{ name, maxCount: 1 }], 'VALUE');
};

Multer.prototype.array = function(name, maxCount) {
  return this._makeMiddleware([{ name, maxCount }], 'ARRAY');
};

Multer.prototype.fields = function(fields) {
  return this._makeMiddleware(fields, 'OBJECT');
};

Multer.prototype.none = function() {
  return this._makeMiddleware([], 'NONE');
};

Multer.prototype.any = function() {
  function setup() {
    return {
      limits: this.limits,
      preservePath: this.preservePath,
      storage: this.storage,
      fileFilter: this.fileFilter,
      fileStrategy: 'ARRAY',
    };
  }

  return makeMiddleware(setup.bind(this));
};

function multer(options) {
  if (options === undefined) {
    return new Multer({});
  }

  if (typeof options === 'object' && options !== null) {
    return new Multer(options);
  }

  throw new TypeError('Expected object for argument options');
}

module.exports = multer;
module.exports.diskStorage = diskStorage;
module.exports.memoryStorage = memoryStorage;
