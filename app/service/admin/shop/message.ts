import BaseService from '../../base';
import * as _ from 'lodash';
import { CreateMessageDto, QueryMessageDto, UpdateMessageDto } from '../../../dto/admin/shop/Message';
// import { In } from 'typeorm';

/**
 * 内容service
 */
export default class ShopMessageService extends BaseService {

  /**
   * 创建
   */
  async add(model:CreateMessageDto) {
   return  await this.getRepo().admin.shop.Message.insert(model);
  }

    /**
   * 删除
   */
  async delete(ids:number[]) {
   return await this.getRepo().admin.shop.Message.delete(ids);
  }

  
  /**
   * 修改
   */
  async update(model:UpdateMessageDto) {
   return await this.getRepo().admin.shop.Message.update(model.id,model);
  }

  /**
   * 分页查询
   */
  async page(query:QueryMessageDto) {
    const {limit,name,page,startTime,endTime,goodsName} = query

    const result = await this.getRepo().admin.shop.Message.createQueryBuilder('message')
      .where( goodsName ?  `message.goodsName like '%${goodsName}%'` : '1 = 1')
      .andWhere( name ?  `message.name like '%${name}%'` : '1 = 1')
      .andWhere( startTime? `message.createTime >= '${startTime}'` : '1 = 1')
      .andWhere( endTime? `message.createTime <= '${endTime}'` : '1 = 1')
      .offset(page * limit)
      .limit(limit)
      .getManyAndCount();
    return result;
  }



}