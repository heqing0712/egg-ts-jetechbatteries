import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateFaqDto, DeleteFaqDto, InfoFaqDto, QueryFaqDto, UpdateFaqDto } from '../../../dto/admin/shop/faq';

export default class ShopFaqController extends BaseController {

  /**
   * @api {post} /admin/shop/faq/add 新增内容
   * @apiGroup 内容
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/faq/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateFaqDto>(CreateFaqDto);
    await this.service.admin.shop.faq.add(dto);
    this.res();
  }


  /**
   * @api {post} /admin/shop/faq/update 修改内容
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/faq/update', 'put')
  async update() {
    const dto = await this.ctx.validate<UpdateFaqDto>(UpdateFaqDto);
    await this.service.admin.shop.faq.update(dto);
    this.res();
  }


    
  /**
   * @api {delete} /admin/shop/faq/delete 删除内容
   * @apiGroup 删除内容
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 内容id
   */
  @AdminRoute('/shop/faq/delete', 'delete')
  async delete() {
    const dto = await this.ctx.validate<DeleteFaqDto>(DeleteFaqDto);
    await this.service.admin.shop.faq.delete(dto.ids);
    this.res();
  }

  
    /**
   * @api {get} /admin/shop/faq/page 内容分页
   * @apiGroup 内容分页
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/faq/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryFaqDto>(QueryFaqDto, this.getQuery());
    dto.page -=1
    const result = await this.service.admin.shop.faq.page(dto)
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
   * @api {get} /admin/shop/faq/info 获取内容信息
   * @apiGroup 商品信息
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {Goods} data 对象
   */
  @AdminRoute('/shop/faq/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoFaqDto>(InfoFaqDto, this.getQuery());
    const result = await this.service.admin.shop.faq.info(dto.id)
    this.res({
      data: result
    })
  }

}