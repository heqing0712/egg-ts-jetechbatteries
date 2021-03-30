import BaseService from '../../base';
import * as _ from 'lodash';
import { CreateHomeDto, QueryHomeDto, UpdateHomeDto } from '../../../dto/admin/shop/home';
// import { In } from 'typeorm';

/**
 * 内容service
 */
export default class ShopHomeService extends BaseService {

  /**
   * 创建
   */
  async add(model:CreateHomeDto) {
    await this.getRepo().admin.shop.Home.insert(model);
  }

    /**
   * 删除
   */
  async delete(ids:number[]) {
    await this.getRepo().admin.shop.Home.delete(ids);
  }

  
  /**
   * 修改
   */
  async update(model:UpdateHomeDto) {
    await this.getRepo().admin.shop.Home.update(model.id,model);
  }

  /**
   * 分页查询
   */
  async page(query:QueryHomeDto) {
    const {limit,title,page,startTime,endTime,id,uuid,lang,status} = query

    const result = await this.getRepo().admin.shop.Home.createQueryBuilder('home')
      .where( title ?  `home.title like '%${title}%'` : '1 = 1')
      .andWhere( id ?  `home.id = ${id}` : '1 = 1')
      .andWhere( uuid ?  `home.uuid = ${uuid}` : '1 = 1')
      .andWhere( lang ?  `home.lang = '${lang}'` : '1 = 1')
      .andWhere( startTime? `home.createTime >= '${startTime}'` : '1 = 1')
      .andWhere( endTime? `home.createTime <= '${endTime}'` : '1 = 1')
      .andWhere( status>-1? `page.status = ${status}` : '1 = 1')
      .orderBy('home.sort','ASC')
      .offset(page * limit)
      .limit(limit)
      .getManyAndCount();
    return result;
  }


    /**
   * 分页查询
   */
  async list(query:QueryHomeDto) {
    const {lang} = query
    const result = await this.getRepo().admin.shop.Home.createQueryBuilder('home')
      .where('home.status = 1')
      .andWhere( lang?  `home.lang = '${lang}'` : '1 = 1')
      .orderBy('home.sort','ASC')
      .getMany();
    return result;
  }




    /**
   * 信息
   * @param id
   */
  async info(id: number) {
    const model: any = await this.getRepo().admin.shop.Home.findOne(id);
    if (_.isEmpty(model)) {
      throw new Error('内容id有误');
    }
    return { ...model };
  }


}