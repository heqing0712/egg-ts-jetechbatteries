import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';

/**
 * 通用功能控制器
 */
export default class editorUeditorController extends BaseController {

  /**
   * @api {get} /admin/editor/ueditor 百度编辑器公共接口
   * @apiGroup 登陆验证类
   * @apiUse BaseRes
   * @apiUse Auth
   */
  @AdminRoute('/editor/ueditor', 'all')
  async ueditor() {
 
    const result = await this.service.admin.editor.ueditor.ueController()
    this.ctx.body = result

  }

}