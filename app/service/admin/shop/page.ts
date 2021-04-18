import BaseService from '../../base';
import * as _ from 'lodash';
import { CreatePageDto, InfoPageDto, QueryPageDto, UpdatePageDto } from '../../../dto/admin/shop/page';
// import { In } from 'typeorm';

/**
 * 内容service
 */
export default class ShopPageService extends BaseService {

  /**
   * 创建
   */
  async add(model:CreatePageDto) {
    await this.getRepo().admin.shop.Page.insert(model);
  }

    /**
   * 删除
   */
  async delete(ids:number[]) {
    await this.getRepo().admin.shop.Page.delete(ids);
  }

  
  /**
   * 修改
   */
  async update(model:UpdatePageDto) {
    await this.getRepo().admin.shop.Page.update(model.id,model);
  }

  /**
   * 分页查询
   */
  async page(query:QueryPageDto) {
    const {limit,title,page,startTime,endTime,id,uuid,lang } = query

    const result = await this.getRepo().admin.shop.Page.createQueryBuilder('page')
      .where( title ?  `page.title like '%${title}%'` : '1 = 1')
      .andWhere( id ?  `page.id = ${id}` : '1 = 1')
      .andWhere( uuid ?  `page.uuid = ${uuid}` : '1 = 1') 
      .andWhere( lang ?  `page.lang = '${lang}'` : '1 = 1')
      .andWhere( startTime? `page.createTime >= '${startTime}'` : '1 = 1')
      .andWhere( endTime? `page.createTime <= '${endTime}'` : '1 = 1')
      .orderBy('page.sort','ASC')
      .offset(page * limit)
      .limit(limit)
      .getManyAndCount();
    return result;
  }


    /**
   * 分页查询
   */
  async list(query:QueryPageDto) {
    const {lang} = query
    const result = await this.getRepo().admin.shop.Page.createQueryBuilder('page')
      .where('page.status = 1')
      .andWhere( lang?  `page.lang = '${lang}'` : '1 = 1')
      .orderBy('page.sort','ASC')
      .getMany();
    return result;
  }


    /**
   * 信息
   * @param id
   */
  async info(query:InfoPageDto) {
    const _query = query.id?  {id:query.id}:{identifier:query.identifier}
    const model: any = await this.getRepo().admin.shop.Page.findOne(_query);
    if (_.isEmpty(model)) {
      throw new Error('内容id有误');
    }
    return { ...model };
  }

  



}