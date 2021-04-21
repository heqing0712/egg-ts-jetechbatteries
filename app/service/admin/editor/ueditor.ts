
import BaseService from '../../base';
import config from './config'
const path = require('path')
const fs = require('fs')

// 获取文件后缀
function getSuffix(filename:string) {
    return filename.substr(filename.lastIndexOf('.')).toLowerCase();
}

// 同步遍历文件
function  eachFileSync(dir:string, findOneFile) {
const stats = fs.statSync(dir);
if (stats.isDirectory()) {
    fs.readdirSync(dir).forEach(file => {
        eachFileSync(path.join(dir, file), findOneFile);
    });
} else {
    findOneFile(dir, stats);
}
}
  

/**
 * 文件服务
 */
export default class UeditorService extends BaseService {


    // 文件上传
    async filesUpload() {
        try {
            const file = this.ctx.request.files[0];
            const resInfo = await this.service.admin.comm.file.uploadFile(file);
            return Object.assign({ state: 'SUCCESS' }, resInfo);
        }
        catch (e) {
            return Object.assign({ state: 'FAIL' }, e);
        }

    }

    // 文件管理
    async filesMange({listType}){
        const publicDir = config.publicDir;
        const {start,action} = this.ctx.query;
        const actionName:string = listType[action];
        const files:object[] = [];
        eachFileSync(path.join(publicDir, config[actionName + 'ManagerListPath']), (file, stat) => {
          if (config[actionName + 'ManagerAllowFiles'].includes(getSuffix(file))) {
            const url:string =  config.baseUrl +'/' + file.replace(/\\/g, '\/');
            const mtime:any = stat.mtimeMs;
            files.push({ url, mtime });
          }
        });
        const _start = Number(start)

        return {
            list: files.slice(_start, _start + config[actionName + 'ManagerListSize']),
            start,
            total: files.length,
            state: 'SUCCESS',
          };
    }

    // 百度编辑器控制器
    async ueController() {
        let result = {};
        const ctx = this.ctx;
        const conf = config;
        const { action } = ctx.query;
        const uploadType = {
            [conf.imageActionName]: 'image',
            [conf.scrawlActionName]: 'scrawl',
            [conf.catcherActionName]: 'catcher',
            [conf.videoActionName]: 'video',
            [conf.fileActionName]: 'file',
        };
        const listType = {
            [conf.imageManagerActionName]: 'image',
            [conf.fileManagerActionName]: 'file',
        };


        // 上传文件
        if (Object.keys(uploadType).includes(action)) {
            try {
                switch (action) {
                    // 涂鸦类型图片
                    case conf.scrawlActionName:

                        break;
                    // 抓取远程图片
                    case conf.catcherActionName:
               
                      break;
                    // 表单上传图片、文件
                    default:
                        result = await this.filesUpload()
                }
            } catch (err) {
                result = { state: err.message };
            }

        }
        // 获取图片/文件列表
        else if (Object.keys(listType).includes(action)) {
            result = await this.filesMange({
                listType
            })
        }
        // 返回Ueditor配置给前端
        else if (action === 'config') {
            result = conf;
        } else {
            result = { state: 'FAIL' };
        }

        return result
    }

}