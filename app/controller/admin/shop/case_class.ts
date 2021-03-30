import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateCaseClassDto, DeleteCaseClassDto, QueryCaseClassDto, UpdateCaseClassDto } from '../../../dto/admin/shop/case_class';

export default class ShopCaseClassController extends BaseController {

    
  /**
   * @api {post} /admin/shop/case-class/add 新增商品分类
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number} pid 分类父id
   * @apiParam {String} name 分类名称
   * @apiParam {Number} sort 分类排序
   */
  @AdminRoute('/shop/case-class/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateCaseClassDto>(CreateCaseClassDto);
    await this.service.admin.shop.caseClass.add(dto);
    this.res();
  }


    /**
   * @api {post} /admin/shop/case-class/update 修改商品分类
   * @apiGroup 商品分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number} id 分类id
   * @apiParam {Number} pid 分类父id
   * @apiParam {String} name 分类名称
   * @apiParam {Number} sort 分类排序
   */
  @AdminRoute('/shop/case-class/update', 'put')
  async update() {
    const dto = await this.ctx.validate<UpdateCaseClassDto>(UpdateCaseClassDto);
    await this.service.admin.shop.caseClass.update(dto);
    this.res();
  }


    /**
   * @api {get} /admin/shop/case-class/page 获取商品分类列表
   * @apiGroup 商品分类列表
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number} pid 分类父id
   * @apiSuccess {CaseClass[]} data.list 用户列表
   */
  @AdminRoute('/shop/case-class/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryCaseClassDto>(QueryCaseClassDto, this.getQuery());
    dto.page -=1
    const result = await this.service.admin.shop.caseClass.page(dto)
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
   * @api {get} /admin/shop/case-class/list 获取所有商品分类
   * @apiGroup 商品分类列表
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number} pid 分类父id
   * @apiSuccess {CaseClass[]} data.list 用户列表
   */
  @AdminRoute('/shop/case-class/list', 'get')
  async list() {
    const dto = await this.ctx.validate<QueryCaseClassDto>(QueryCaseClassDto, this.getQuery());
    const result = await this.service.admin.shop.caseClass.list(dto)
    this.res({
      data: result
    })
  }

  /**
   * @api {delete} /admin/shop/case-class/delete 删除分类
   * @apiGroup 删除分类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 分类id
   */
  @AdminRoute('/shop/case-class/delete', 'delete')
  async delete() {
    const dto = await this.ctx.validate<DeleteCaseClassDto>(DeleteCaseClassDto);
    await this.service.admin.shop.caseClass.delete(dto.ids);
    this.res();
  }
}