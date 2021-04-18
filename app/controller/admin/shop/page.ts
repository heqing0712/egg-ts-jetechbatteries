import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreatePageDto, DeletePageDto, InfoPageDto, QueryPageDto, UpdatePageDto } from '../../../dto/admin/shop/page';

export default class ShopPageController extends BaseController {

  /**
   * @api {post} /admin/shop/page/add 新增内容
   * @apiGroup 内容
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/page/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreatePageDto>(CreatePageDto);
    await this.service.admin.shop.page.add(dto);
    this.res();
  }


      /**
   * @api {post} /admin/shop/page/update 修改内容
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/page/update', 'put')
  async update() {
    const dto = await this.ctx.validate<UpdatePageDto>(UpdatePageDto);
    await this.service.admin.shop.page.update(dto);
    this.res();
  }


    
  /**
   * @api {delete} /admin/shop/page/delete 删除内容
   * @apiGroup 删除内容
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 内容id
   */
  @AdminRoute('/shop/page/delete', 'delete')
  async delete() {
    const dto = await this.ctx.validate<DeletePageDto>(DeletePageDto);
    await this.service.admin.shop.page.delete(dto.ids);
    this.res();
  }

  
    /**
   * @api {get} /admin/shop/page/page 内容分页
   * @apiGroup 内容分页
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/page/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryPageDto>(QueryPageDto, this.getQuery());
    dto.page -=1
    const result = await this.service.admin.shop.page.page(dto)
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
   * @api {get} /admin/shop/page/info 获取内容信息
   * @apiGroup 商品信息
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {Goods} data 对象
   */
  @AdminRoute('/shop/page/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoPageDto>(InfoPageDto, this.getQuery());
 
    const result = await this.service.admin.shop.page.info(dto)
    this.res({
      data: result
    })
  }

}