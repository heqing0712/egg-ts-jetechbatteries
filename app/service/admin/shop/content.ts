import BaseService from '../../base';
import * as _ from 'lodash';
import { CreateContentDto, InfoContentDto, QueryContentDto, UpdateContentDto } from '../../../dto/admin/shop/content';
// import { In } from 'typeorm';

/**
 * 内容service
 */
export default class ShopContentService extends BaseService {

  /**
   * 创建
   */
  async add(model:CreateContentDto) {
    await this.getRepo().admin.shop.Content.insert(model);
  }

    /**
   * 删除
   */
  async delete(ids:number[]) {
    await this.getRepo().admin.shop.Content.delete(ids);
  }

  
  /**
   * 修改
   */
  async update(model:UpdateContentDto) {
    await this.getRepo().admin.shop.Content.update(model.id,model);
  }

  /**
   * 分页查询
   */
  async page(query:QueryContentDto) {
    const {limit,title,page,startTime,endTime,id,uuid,lang,status} = query

    const result = await this.getRepo().admin.shop.Content.createQueryBuilder('content')
      .where( title ?  `content.title like '%${title}%'` : '1 = 1')
      .andWhere( id ?  `content.id = ${id}` : '1 = 1')
      .andWhere( uuid ?  `content.uuid = ${uuid}` : '1 = 1')
      .andWhere( lang ?  `content.lang = '${lang}'` : '1 = 1')
      .andWhere( status>-1? `content.status = ${status}` : '1 = 1')
      .andWhere( startTime? `content.createTime >= '${startTime}'` : '1 = 1')
      .andWhere( endTime? `content.createTime <= '${endTime}'` : '1 = 1')
      .orderBy('content.sort','ASC')
      .offset(page * limit)
      .limit(limit)
      .getManyAndCount();
    return result;
  }


    /**
   * 分页查询
   */
  async list(query:QueryContentDto) {
    const {lang} = query
    const result = await this.getRepo().admin.shop.Content.createQueryBuilder('content')
      .where('content.status = 1')
      .andWhere( lang?  `content.lang = '${lang}'` : '1 = 1')
      .orderBy('content.sort','ASC')
      .getMany();
    return result;
  }




    /**
   * 信息
   * @param id
   */
  async info(query: InfoContentDto) {
    const _query = query.id?  {id:query.id}:{identifier:query.identifier}
    const model: any = await this.getRepo().admin.shop.Content.findOne(_query );
    if (_.isEmpty(model)) {
      throw new Error('参数有误');
    }
    return { ...model };
  }


}