import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateBannerDto, DeleteBannerDto, InfoBannerDto, QueryBannerDto, UpdateBannerDto } from '../../../dto/admin/shop/banner';

export default class ShopBannerController extends BaseController {

  /**
   * @api {post} /admin/shop/banner/add 新增
   * @apiGroup 焦点图
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/banner/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateBannerDto>(CreateBannerDto);
    await this.service.admin.shop.banner.add(dto);
    this.res();
  }


      /**
   * @api {post} /admin/shop/banner/update 修改
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/banner/update', 'put')
  async update() {
    const dto = await this.ctx.validate<UpdateBannerDto>(UpdateBannerDto);
    await this.service.admin.shop.banner.update(dto);
    this.res();
  }

    /**
   * @api {get} /admin/shop/banner/page 焦点图分页
   * @apiGroup 内容分页
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/banner/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryBannerDto>(QueryBannerDto, this.getQuery());
    dto.page -=1
    const result = await this.service.admin.shop.banner.page(dto)
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
   * @api {delete} /admin/shop/banner/delete 删除
   * @apiGroup 删除内容
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 内容id
   */
  @AdminRoute('/shop/banner/delete', 'delete')
  async delete() {
    const dto = await this.ctx.validate<DeleteBannerDto>(DeleteBannerDto);
    await this.service.admin.shop.banner.delete(dto.ids);
    this.res();
  }

   /**
   * @api {get} /admin/shop/banner/info 获取焦点图信息
   * @apiGroup 焦点图信息
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {Goods} data 对象
   */
  @AdminRoute('/shop/banner/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoBannerDto>(InfoBannerDto, this.getQuery());
 
    const result = await this.service.admin.shop.banner.info(dto.id)
    this.res({
      data: result
    })
  }

}