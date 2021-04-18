import BaseService from '../../base';
import * as _ from 'lodash';
import { CreateFaqDto, QueryFaqDto, UpdateFaqDto } from '../../../dto/admin/shop/faq';
// import { In } from 'typeorm';

/**
 * 内容service
 */
export default class ShopFaqService extends BaseService {

  /**
   * 创建
   */
  async add(model:CreateFaqDto) {
    await this.getRepo().admin.shop.Faq.insert(model);
  }

    /**
   * 删除
   */
  async delete(ids:number[]) {
    await this.getRepo().admin.shop.Faq.delete(ids);
  }

  
  /**
   * 修改
   */
  async update(model:UpdateFaqDto) {
    await this.getRepo().admin.shop.Faq.update(model.id,model);
  }

  /**
   * 分页查询
   */
  async page(query:QueryFaqDto) {
    const {limit,title,page,startTime,endTime,id,uuid,lang,status} = query
    const result = await this.getRepo().admin.shop.Faq.createQueryBuilder('faq')
      .where( title ?  `faq.title like '%${title}%'` : '1 = 1')
      .andWhere( id ?  `faq.id = ${id}` : '1 = 1')
      .andWhere( uuid ?  `faq.uuid = ${uuid}` : '1 = 1')
      .andWhere( lang ?  `faq.lang = '${lang}'` : '1 = 1')
      .andWhere( status>-1? `faq.status = ${status}` : '1 = 1')
      .andWhere( startTime? `faq.createTime >= '${startTime}'` : '1 = 1')
      .andWhere( endTime? `faq.createTime <= '${endTime}'` : '1 = 1')
      .orderBy({
        'faq.sort':'ASC',
        'faq.id': 'DESC'
      })
      .offset(page * limit)
      .limit(limit)
      .getManyAndCount();
    return result;
  }


    /**
   * 分页查询
   */
  async list(query:QueryFaqDto) {
    const {lang} = query
    const result = await this.getRepo().admin.shop.Faq.createQueryBuilder('faq')
      .where('faq.status = 1')
      .andWhere( lang?  `faq.lang = '${lang}'` : '1 = 1')
      .orderBy({
        'faq.sort':'ASC',
        'faq.id': 'DESC'
      })
      .getMany();
    return result;
  }




    /**
   * 信息
   * @param id
   */
  async info(id: number) {
    const model: any = await this.getRepo().admin.shop.Faq.findOne(id);
    if (_.isEmpty(model)) {
      throw new Error('内容id有误');
    }
    return { ...model };
  }


}