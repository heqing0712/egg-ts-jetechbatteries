import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateGoodsClassDto, DeleteGoodsClassDto, QueryGoodsClassDto, UpdateGoodsClassDto } from '../../../dto/admin/shop/goods_class';

export default class ShopGoodsClassController extends BaseController {

    
  /**
   * @api {post} /admin/shop/goods-class/add 新增商品分类
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number} pid 分类父id
   * @apiParam {String} name 分类名称
   * @apiParam {Number} sort 分类排序
   */
  @AdminRoute('/shop/goods-class/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateGoodsClassDto>(CreateGoodsClassDto);
    await this.service.admin.shop.goodsClass.add(dto);
    this.res();
  }


    /**
   * @api {post} /admin/shop/goods-class/update 修改商品分类
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number} id 分类id
   * @apiParam {Number} pid 分类父id
   * @apiParam {String} name 分类名称
   * @apiParam {Number} sort 分类排序
   */
  @AdminRoute('/shop/goods-class/update', 'put')
  async update() {
    const dto = await this.ctx.validate<UpdateGoodsClassDto>(UpdateGoodsClassDto);
    await this.service.admin.shop.goodsClass.update(dto);
    this.res();
  }


    /**
   * @api {get} /admin/shop/goods-class/page 获取商品分类列表
   * @apiGroup 商品分类列表
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number} pid 分类父id
   * @apiSuccess {GoodsClass[]} data.list 用户列表
   */
  @AdminRoute('/shop/goods-class/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryGoodsClassDto>(QueryGoodsClassDto, this.getQuery());
    dto.page -=1
    const result = await this.service.admin.shop.goodsClass.page(dto)
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
   * @api {get} /admin/shop/goods-class/list 获取商品分类列表
   * @apiGroup 商品分类列表
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number} pid 分类父id
   * @apiSuccess {GoodsClass[]} data.list 用户列表
   */
  @AdminRoute('/shop/goods-class/list', 'get')
  async list() {
    const dto = await this.ctx.validate<QueryGoodsClassDto>(QueryGoodsClassDto, this.getQuery());
    dto.page -=1
    const result = await this.service.admin.shop.goodsClass.list(dto)
    this.res({
      data:  result
    })
  }


  
  /**
   * @api {delete} /admin/shop/goods-class/delete 删除分类
   * @apiGroup 删除分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 分类id
   */
  @AdminRoute('/shop/goods-class/delete', 'delete')
  async delete() {
    const dto = await this.ctx.validate<DeleteGoodsClassDto>(DeleteGoodsClassDto);
    await this.service.admin.shop.goodsClass.delete(dto.ids);
    this.res();
  }
}