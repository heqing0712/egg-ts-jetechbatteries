import BaseService from '../../base';
import { UAParser } from 'ua-parser-js';

/**
 * 在线用户Service
 */
export default class SysOnlineService extends BaseService {

  async list() {
    const onlineUserIds: string[] = await this.getAdminRedis().keys('admin:token:*');
    const formatNumberIds: number[] = onlineUserIds.map(e => {
      const uid = e.split('admin:token:')[1];
      return parseInt(uid);
    });
    return await this.findLastLoginInfo(formatNumberIds);
  }

  /**
   * 根据用户id列表查找最近登录信息和用户信息
   */
  async findLastLoginInfo(ids: number[]) {
    const result = await this.ctx.ormManager.query(`
    SELECT n.*, u.username
      FROM sys_login_log n
      INNER JOIN (
        SELECT user_id, MAX(createTime) AS createTime
        FROM sys_login_log GROUP BY user_id
      ) AS max USING (user_id, createTime)
      INNER JOIN sys_user u ON n.user_id = u.id
      WHERE n.user_id IN (?)
    `, [ ids ]);
    if (result) {
      const parser = new UAParser();
      return result.map(e => {
        const u = parser.setUA(e.ua).getResult();
        return {
          id: e.user_id,
          ip: e.ip,
          username: e.username,
          isCurrent: this.ctx.token.uid === e.user_id,
          time: e.createTime,
          status: 1,
          os: `${u.os.name} ${u.os.version}`,
          browser: `${u.browser.name} ${u.browser.version}`,
          disable: this.ctx.token.uid === e.user_id || e.user_id === this.config.rootRoleId,
        };
      });
    }
    return [];
  }

}
