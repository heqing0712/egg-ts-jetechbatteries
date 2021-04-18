const fs = require('fs')
const path = require('path')


import BaseService from '../../base';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Config = require('../../../libs/egg-ueditor/lib/config');


/**
 * 文件服务
 */
export default class FileService extends BaseService {

    // 获取路径
    setFullPath(dest: string) {
        const date = new Date();

        const map = {
            t: date.getTime(), // 时间戳
            m: date.getMonth() + 1, // 月份
            d: date.getDate(), // 日
            h: date.getHours(), // 时
            i: date.getMinutes(), // 分
            s: date.getSeconds(), // 秒
        };

        dest = dest.replace(/\{([ymdhis])+\}|\{time\}|\{rand:(\d+)\}/g, function (all, t, r) {
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

    // 同步创建文件目录
    mkdirsSync(dirname: string) {
        if (fs.existsSync(dirname)) {
            return true;
        }
        if (this.mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }



    // 创建上传路径
    mkUploadDir(uploadType = 'image'){
        let dir
        const publicDir = 'public'
        let configDir = Config[uploadType +'PathFormat']
        if(!configDir){
            configDir = Config['filePathFormat']
        }
        dir = this.setFullPath(configDir)
        dir = path.join(publicDir, dir);
        this.mkdirsSync(dir)
        return dir
    }


    /**
     * 单文件上传
     * @param file  要上传的文件
     * @return {Promise<{fileName: *, url: string}>}
     */
    async uploadFile(file: any) {
        // 读取文件
        let fileData = fs.readFileSync(file.filepath)

        // 将文件存到指定位置
         const folderPath = this.mkUploadDir()

        // 拼接文件路径
        let filePath = path.join(folderPath, file.filename) // 拼接文件路径

        fs.writeFileSync(filePath, fileData)

        // 返回文件信息
        return {
            fileName: file.filename,
            url:Config.baseUrl + '/'+filePath.replace(/\\/g,'/')
        }
    }

}