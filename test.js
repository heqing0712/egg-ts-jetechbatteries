"use strict";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./app/libs/egg-ueditor/lib/config');
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
// 处理Ueditor上传保存路径
function setFullPath(dest) {
    const date = new Date();
    const map = {
        t: date.getTime(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
    };
    dest = dest.replace(/\{([ymdhis])+\}|\{time\}|\{rand:(\d+)\}/g, function (all, t, r) {
        let v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        }
        else if (t === 'y') {
            return (date.getFullYear() + '').substr(6 - all.length);
        }
        else if (all === '{time}') {
            return map.t;
        }
        else if (r >= 0) {
            return Math.random().toString().substr(2, r);
        }
        return all;
    });
    return dest;
}
const publicDir = 'public';
let dir = setFullPath(config['imagePathFormat']);
dir = path.join(publicDir, dir);
console.log(dir);
mkdirsSync(dir);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDhEQUE4RDtBQUM5RCxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsOERBQThEO0FBQzlELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU3Qiw4REFBOEQ7QUFDOUQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFFNUQsV0FBVztBQUNYLFNBQVMsVUFBVSxDQUFDLE9BQWU7SUFDbkMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7UUFDbkMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0QsQ0FBQztBQUVELGtCQUFrQjtBQUNsQixTQUFTLFdBQVcsQ0FBQyxJQUFJO0lBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFFeEIsTUFBTSxHQUFHLEdBQUc7UUFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNqQixDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7UUFDdEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDakIsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDbEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDcEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7S0FDckIsQ0FBQztJQUVGLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLDBDQUEwQyxFQUFFLFVBQVMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2hGLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNuQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQixDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDWixDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsT0FBTyxDQUFDLENBQUM7U0FDVjthQUFNLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pEO2FBQU0sSUFBSSxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNkO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFFaEIsQ0FBQztBQUVELE1BQU0sU0FBUyxHQUFFLFFBQVEsQ0FBQTtBQUN6QixJQUFLLEdBQUcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtBQUVqRCxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNoQixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMifQ==