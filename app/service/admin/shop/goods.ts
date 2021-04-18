import BaseService from '../../base';
import * as _ from 'lodash';
import { CreateGoodsDto, QueryGoodsDto, smallGoodsDto, UpdateGoodsDto } from '../../../dto/admin/shop/goods';

import { plainToClass  } from 'class-transformer';
import ShopGoods from '../../../entities/admin/shop/goods';
// import { In } from 'typeorm';

/**
 * 系统部门Service
 */
export default class ShopGoodsService extends BaseService {

  /**
   * 修改分类
   */
  async add(model:CreateGoodsDto) {
    await this.getRepo().admin.shop.Goods.insert(model);
  }

    /**
   * 删除分类
   */
  async delete(ids:number[]) {
    await this.getRepo().admin.shop.Goods.delete(ids);
  }

  
  /**
   * 修改分类
   */
  async update(model:UpdateGoodsDto) {
    await this.getRepo().admin.shop.Goods.update(model.id,model);
  }

  /**
   * 商品分类分页
   */
  async page(query:QueryGoodsDto) {
    const {limit,title,page,startTime,endTime,lang,status} = query
    const result = await this.getRepo().admin.shop.Goods.createQueryBuilder('goods')
      .where( title ?  `goods.title like '%${title}%'` : '1 = 1')
      .andWhere( lang?  `goods.lang = '${lang}'` : '1 = 1')
      .andWhere( startTime? `goods.createTime >= '${startTime}'` : '1 = 1')
      .andWhere( endTime? `goods.createTime <= '${endTime}'` : '1 = 1')
      .andWhere( status>-1? `goods.status = ${status}` : '1 = 1')
      .orderBy({
        'goods.hot':'DESC',
        'goods.sort':'ASC',
        'goods.id': 'DESC'
      })
      .offset(page * limit)
      .limit(limit)
      .getManyAndCount();
    return result;
  }


  /**
   * 所有
   */
  async list(query:QueryGoodsDto) {
    const {lang,categoryId,title,hot} = query
     let result = await this.getRepo().admin.shop.Goods.createQueryBuilder('goods')
      .where('goods.status = 1')
      .andWhere(categoryId?  `goods.categoryId = ${categoryId}` : '1 = 1')
      .andWhere( title ?  `goods.title like '%${title}%'` : '1 = 1')
      .andWhere( hot!==undefined?  `goods.hot = ${hot}` : '1 = 1')
      .andWhere( lang?  `goods.lang = '${lang}'` : '1 = 1')
      .orderBy({
        'goods.sort':'ASC',
        'goods.id': 'DESC'
      })
      .getMany();
    const resultX:Array<smallGoodsDto > = result.map(d=>{
      return plainToClass(smallGoodsDto,d,{strategy:'excludeAll'})
    })
    return resultX;
  }


  /**
   * 通过分类url返回分类商品列表
   * @param url 
   */
  async  listByGoodsClassUrl(url:string){
      const goodsClassModel:ShopGoods = await this.service.admin.shop.goodsClass.getModelByUrl(url)
      let result:Array<smallGoodsDto>=[]
      if(!_.isEmpty(goodsClassModel)){
        result = await this.list(plainToClass(QueryGoodsDto,{categoryId:goodsClassModel.id}))
      }
      return {
        goodsList:result,
        goodsClass:goodsClassModel
      }
  }
  
  /**
   * 查找商品信息
   * @param id 商品id
   */
  async info(id: number) {
    const model: any = await this.getRepo().admin.shop.Goods.findOne(id);
    if (_.isEmpty(model)) {
      throw new Error('商品id有误');
    }
    return { ...model };
  }

    /**
   * 查找商品信息
   * @param url 商品url
   */
  async infoByUrl(url:string,lang:string) {
    const model: any = await this.getRepo().admin.shop.Goods.findOne({url,lang});
    if (_.isEmpty(model)) {
      throw new Error('商品id有误');
    }
    return { ...model };
  }

}