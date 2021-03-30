import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateMessageDto, DeleteMessageDto, QueryMessageDto } from '../../../dto/admin/shop/Message';

export default class ShopMessageController extends BaseController {

  /**
   * @api {post} /admin/shop/Message/add 新增内容
   * @apiGroup 内容
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/Message/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateMessageDto>(CreateMessageDto);
    await this.service.admin.shop.message.add(dto);
    this.res();
  }


  
    
  /**
   * @api {delete} /admin/shop/Message/delete 删除内容
   * @apiGroup 删除内容
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 内容id
   */
  @AdminRoute('/shop/message/delete', 'delete')
  async delete() {
    const dto = await this.ctx.validate<DeleteMessageDto>(DeleteMessageDto);
    await this.service.admin.shop.message.delete(dto.ids);
    this.res();
  }


      /**
   * @api {get} /shop/message/page 内容分页
   * @apiGroup 内容分页
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   */
  @AdminRoute('/shop/message/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryMessageDto>(QueryMessageDto, this.getQuery());
    dto.page -=1
    const result = await this.service.admin.shop.message.page(dto)
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

}