
const path = require('path')
const fs = require('fs')
const Busboy = require("busboy")

async function Upload(ctx) {
    const busboy = new Busboy({ headers: ctx.req.headers })
 
    // 后续处理
    ctx.req.pipe(busboy)

    // 监听文件解析事件
    busboy.on('file', function (fieldname, file, filename) {
        console.log('监听文件解析事件')
        console.log(`File [${fieldname}]: filename: ${filename}`)
        // 将文件保存到特定路径 
        file.pipe(fs.createWriteStream(path.join('public/images/',filename)))
        // 开始解析文件流
        file.on('data', function (data) {
            console.log(`File [${fieldname}] got ${data.length} bytes`)
        })
        // 解析文件结束 
        file.on('end', function () {
            console.log(`File [${fieldname}] Finishied`);
        })
    })

    // 监听请求中的字段
    busboy.on('field', function () {
        //console.log(`Field [${fieldname}]: value: ${inspect(val)}`);
    })
    // 监听结束事件
    busboy.on('finish', function () {
        console.log('Done parsing form!');
    })


}

 export default Upload