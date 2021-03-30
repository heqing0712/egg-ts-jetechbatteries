import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateGoodsDto, DeleteGoodsDto, InfoGoodsDto, QueryGoodsDto, UpdateGoodsDto } from '../../../dto/admin/shop/goods';
 
 
export default class ShopGoodsController extends BaseController {

    /**
   * @api {post} /admin/shop/goods/add 新增商品分类
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/goods/uploadimg', 'post')
  async uploadimg() {
    //await Upload(this.ctx)
    const file = this.ctx.request.files[0]
    const data = await this.service.admin.comm.file.uploadFile(file)
    this.res({
      data
    });
  }


  /**
   * @api {post} /admin/shop/goods/add 新增商品分类
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/goods/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateGoodsDto>(CreateGoodsDto);
    await this.service.admin.shop.goods.add(dto);
    this.res();
  }

  
    /**
   * @api {post} /admin/shop/goods/update 修改商品分类
   * @apiGroup 修改商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/goods/update', 'put')
  async update() {
    const dto = await this.ctx.validate<UpdateGoodsDto>(UpdateGoodsDto);
    await this.service.admin.shop.goods.update(dto);
    this.res();
  }

    
  /**
   * @api {delete} /admin/shop/goods/delete 删除商品
   * @apiGroup 删除商品
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} ids 商品id数组
   */
  @AdminRoute('/shop/goods/delete', 'delete')
  async delete() {
    const dto = await this.ctx.validate<DeleteGoodsDto>(DeleteGoodsDto);
    await this.service.admin.shop.goods.delete(dto.ids);
    this.res();
  }


  
    /**
   * @api {get} /admin/web/goods/page 获取商品分类列表
   * @apiGroup 商品分类列表
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {Goods[]} data.list 用户列表
   */
  @AdminRoute('/shop/goods/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryGoodsDto>(QueryGoodsDto, this.getQuery());
    dto.page -=1
    const result = await this.service.admin.shop.goods.page(dto)
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
   * @api {get} /admin/shop/goods/info 获取商品信息
   * @apiGroup 商品信息
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {Goods} data 商品对象
   */
  @AdminRoute('/shop/goods/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoGoodsDto>(InfoGoodsDto, this.getQuery());
 
    const result = await this.service.admin.shop.goods.info(dto.id)
    this.res({
      data: result
    })
  }
}