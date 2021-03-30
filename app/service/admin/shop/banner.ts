import BaseService from '../../base';
import * as _ from 'lodash';
import { CreateBannerDto, QueryBannerDto, UpdateBannerDto } from '../../../dto/admin/shop/Banner';
// import { In } from 'typeorm';

/**
 * 焦点图service
 */
export default class ShopBannerService extends BaseService {

  /**
   * 创建
   */
  async add(model:CreateBannerDto) {
    await this.getRepo().admin.shop.Banner.insert(model);
  }

    /**
   * 删除
   */
  async delete(ids:number[]) {
    await this.getRepo().admin.shop.Banner.delete(ids);
  }

  
  /**
   * 修改
   */
  async update(model:UpdateBannerDto) {
    await this.getRepo().admin.shop.Banner.update(model.id,model);
  }

  /**
   * 分页查询
   */
  async page(query:QueryBannerDto) {
    const {limit,title,page,startTime,endTime,id,status,lang} = query
    const result = await this.getRepo().admin.shop.Banner.createQueryBuilder('banner')
      .where( title ?  `banner.title like '%${title}%'` : '1 = 1')
      .andWhere( id ?  `bnner.id = ${id}` : '1 = 1')
      .andWhere( status>-1? `banner.status = ${status}` : '1 = 1')
      .andWhere( startTime? `banner.createTime >= '${startTime}'` : '1 = 1')
      .andWhere( endTime? `banner.createTime <= '${endTime}'` : '1 = 1')
      .andWhere( lang?  `banner.lang = '${lang}'` : '1 = 1')
      .orderBy({
        'banner.sort':'ASC',
        'banner.id': 'DESC'
      })
      .offset(page * limit)
      .limit(limit)
      .getManyAndCount();
    return result;
  }


  
  /**
   * 分页查询
   */
  async list(query:QueryBannerDto) {
    const {lang} = query
    const result = await this.getRepo().admin.shop.Banner.createQueryBuilder('banner')
      .where('banner.status = 1')
      .andWhere( lang ?  `banner.lang = '${lang}'` : '1 = 1')
      .orderBy({
        'banner.sort':'ASC',
        'banner.id': 'DESC'
      })
      .getMany();
    return result;
  }

    /**
   * 信息
   * @param id
   */
  async info(id: number) {
    const model: any = await this.getRepo().admin.shop.Banner.findOne(id);
    if (_.isEmpty(model)) {
      throw new Error('焦点图id有误');
    }
    return { ...model };
  }

}