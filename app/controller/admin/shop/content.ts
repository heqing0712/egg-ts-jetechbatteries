import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateContentDto, DeleteContentDto, InfoContentDto, QueryContentDto, UpdateContentDto } from '../../../dto/admin/shop/content';

export default class ShopContentController extends BaseController {

  /**
   * @api {post} /admin/shop/content/add 新增内容
   * @apiGroup 内容
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/content/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateContentDto>(CreateContentDto);
    await this.service.admin.shop.content.add(dto);
    this.res();
  }


      /**
   * @api {post} /admin/shop/content/update 修改内容
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/content/update', 'put')
  async update() {
    const dto = await this.ctx.validate<UpdateContentDto>(UpdateContentDto);
    await this.service.admin.shop.content.update(dto);
    this.res();
  }


    
  /**
   * @api {delete} /admin/shop/content/delete 删除内容
   * @apiGroup 删除内容
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 内容id
   */
  @AdminRoute('/shop/content/delete', 'delete')
  async delete() {
    const dto = await this.ctx.validate<DeleteContentDto>(DeleteContentDto);
    await this.service.admin.shop.content.delete(dto.ids);
    this.res();
  }

  
    /**
   * @api {get} /admin/shop/content/page 内容分页
   * @apiGroup 内容分页
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/content/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryContentDto>(QueryContentDto, this.getQuery());
    dto.page -=1
    const result = await this.service.admin.shop.content.page(dto)
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
   * @api {get} /admin/shop/content/info 获取内容信息
   * @apiGroup 商品信息
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {Goods} data 对象
   */
  @AdminRoute('/shop/content/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoContentDto>(InfoContentDto, this.getQuery());
 
    const result = await this.service.admin.shop.content.info(dto)
    this.res({
      data: result
    })
  }

}