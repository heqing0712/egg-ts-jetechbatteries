import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateSettingsDto, DeleteSettingsDto, InfoSettingsDto, QuerySettingsDto, UpdateSettingsDto } from '../../../dto/admin/shop/Settings';

export default class ShopSettingsController extends BaseController {

  /**
   * @api {post} /admin/shop/Settings/add 新增配置
   * @apiGroup 配置
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/settings/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateSettingsDto>(CreateSettingsDto);
    await this.service.admin.shop.settings.add(dto);
    this.res();
  }

  /**
   * @api {post} /admin/shop/settings/update 修改配置
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/settings/update', 'put')
  async update() {
    const dto = await this.ctx.validate<UpdateSettingsDto>(UpdateSettingsDto);
    await this.service.admin.shop.settings.update(dto);
    this.res();
  }
  
  /**
   * @api {delete} /admin/shop/Settings/delete 删除配置
   * @apiGroup 删除配置
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 配置id
   */
  @AdminRoute('/shop/settings/delete', 'delete')
  async delete() {
    const dto = await this.ctx.validate<DeleteSettingsDto>(DeleteSettingsDto);
    await this.service.admin.shop.settings.delete(dto.ids);
    this.res();
  }



    
    /**
   * @api {get} /admin/shop/settings/page 配置分页
   * @apiGroup 配置分页
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/settings/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QuerySettingsDto>(QuerySettingsDto, this.getQuery());
    dto.page -=1
    const result = await this.service.admin.shop.settings.page(dto)
    this.res({
      data:{
        list:result[0],
        pagination:{
          total:result[1],
          page:dto.page+1,
          size:dto.limit
        }
      }
    })
  }

        /**
   * @api {get} /admin/shop/settings/info 获取配置信息
   * @apiGroup 商品信息
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {Settings} data 对象
   */
  @AdminRoute('/shop/settings/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoSettingsDto>(InfoSettingsDto, this.getQuery());
 
    const result = await this.service.admin.shop.settings.info(dto.id)
    this.res({
      data: result
    })
  }

}