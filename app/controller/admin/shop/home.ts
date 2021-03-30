import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateHomeDto, DeleteHomeDto, InfoHomeDto, QueryHomeDto, UpdateHomeDto } from '../../../dto/admin/shop/home';

export default class ShopHomeController extends BaseController {

  /**
   * @api {post} /admin/shop/home/add 新增内容
   * @apiGroup 内容
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/home/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateHomeDto>(CreateHomeDto);
    await this.service.admin.shop.home.add(dto);
    this.res();
  }


      /**
   * @api {post} /admin/shop/home/update 修改内容
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/home/update', 'put')
  async update() {
    const dto = await this.ctx.validate<UpdateHomeDto>(UpdateHomeDto);
    await this.service.admin.shop.home.update(dto);
    this.res();
  }


    
  /**
   * @api {delete} /admin/shop/home/delete 删除内容
   * @apiGroup 删除内容
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 内容id
   */
  @AdminRoute('/shop/home/delete', 'delete')
  async delete() {
    const dto = await this.ctx.validate<DeleteHomeDto>(DeleteHomeDto);
    await this.service.admin.shop.home.delete(dto.ids);
    this.res();
  }

  
    /**
   * @api {get} /admin/shop/home/page 内容分页
   * @apiGroup 内容分页
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/home/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryHomeDto>(QueryHomeDto, this.getQuery());
    dto.page -=1
    const result = await this.service.admin.shop.home.page(dto)
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
   * @api {get} /admin/shop/home/info 获取内容信息
   * @apiGroup 商品信息
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {Goods} data 对象
   */
  @AdminRoute('/shop/home/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoHomeDto>(InfoHomeDto, this.getQuery());
 
    const result = await this.service.admin.shop.home.info(dto.id)
    this.res({
      data: result
    })
  }

}