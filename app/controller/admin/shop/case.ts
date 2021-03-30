import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateCaseDto, DeleteCaseDto, InfoCaseDto, QueryCaseDto, UpdateCaseDto } from '../../../dto/admin/shop/case';
 
 
export default class ShopCaseController extends BaseController {

    /**
   * @api {post} /admin/shop/case/add 新增商品分类
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/case/uploadimg', 'post')
  async uploadimg() {
    //await Upload(this.ctx)
    const file = this.ctx.request.files[0]
    const data = await this.service.admin.comm.file.uploadFile(file)
    this.res({
      data
    });
  }


  /**
   * @api {post} /admin/shop/case/add 新增商品分类
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/case/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateCaseDto>(CreateCaseDto);
    await this.service.admin.shop.case.add(dto);
    this.res();
  }

  
    /**
   * @api {post} /admin/shop/case/update 修改商品分类
   * @apiGroup 修改商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/case/update', 'put')
  async update() {
    const dto = await this.ctx.validate<UpdateCaseDto>(UpdateCaseDto);
    await this.service.admin.shop.case.update(dto);
    this.res();
  }

    
  /**
   * @api {delete} /admin/shop/case/delete 删除商品
   * @apiGroup 删除商品
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} ids 商品id数组
   */
  @AdminRoute('/shop/case/delete', 'delete')
  async delete() {
    const dto = await this.ctx.validate<DeleteCaseDto>(DeleteCaseDto);
    await this.service.admin.shop.case.delete(dto.ids);
    this.res();
  }


  
    /**
   * @api {get} /admin/web/case/page 获取商品分类列表
   * @apiGroup 商品分类列表
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {Case[]} data.list 用户列表
   */
  @AdminRoute('/shop/case/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryCaseDto>(QueryCaseDto, this.getQuery());
    dto.page -=1
    const result = await this.service.admin.shop.case.page(dto)
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
   * @api {get} /admin/shop/case/info 获取商品信息
   * @apiGroup 商品信息
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {Case} data 商品对象
   */
  @AdminRoute('/shop/case/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoCaseDto>(InfoCaseDto, this.getQuery());
 
    const result = await this.service.admin.shop.case.info(dto.id)
    this.res({
      data: result
    })
  }
}