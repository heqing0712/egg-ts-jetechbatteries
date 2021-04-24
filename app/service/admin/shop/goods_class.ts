import BaseService from '../../base';
import * as _ from 'lodash';
import { CreateGoodsClassDto, QueryGoodsClassDto, UpdateGoodsClassDto } from '../../../dto/admin/shop/goods_class';
// import { In } from 'typeorm';

/**
 * 系统部门Service
 */
export default class ShopGoodsClassService extends BaseService {

  /**
   * 分类
   */
  async add(model:CreateGoodsClassDto) {
    await this.getRepo().admin.shop.GoodsClass.save(model);
  }

    /**
   * 删除分类
   */
  async delete(ids:number[]) {
    await this.getRepo().admin.shop.GoodsClass.delete(ids);
    await this.service.admin.shop.goods.deleteByGoodsClassIds(ids);
  }



  
  /**
   * 修改分类
   */
  async update(model:UpdateGoodsClassDto) {
    await this.getRepo().admin.shop.GoodsClass.update(model.id,model);
  }
 

  /**
   * 商品分类分页
   */
  async page(query:QueryGoodsClassDto) {
    //const {id,limit,createTime,email,username,name,page, departmentId} = query
    const {limit,name,page,startTime,endTime,lang} = query

    const result = await this.getRepo().admin.shop.GoodsClass.createQueryBuilder('goods_class')
      .where( name ?  `goods_class.name like '%${name}%'` : '1 = 1')
      .andWhere( lang?  `goods_class.lang = '${lang}'` : '1 = 1')
      .andWhere( startTime? `goods_class.createTime >= '${startTime}'` : '1 = 1')
      .andWhere( endTime? `goods_class.createTime <= '${endTime}'` : '1 = 1')
      .addOrderBy('goods_class.sort', 'ASC')
      .offset(page * limit)
      .limit(limit)
      .getManyAndCount();
    return result;
  }

  /**
   * 所有商品分类
   */
  async list(query:QueryGoodsClassDto) {
    const {lang} = query
    const result = await this.getRepo().admin.shop.GoodsClass.createQueryBuilder('goods_class')
      .andWhere( lang ?  `goods_class.lang = '${lang}'` : '1 = 1')
      .orderBy('goods_class.sort', 'ASC')
      .getMany();
    return result;
  }

  /**
   * 通过url查收商品分类
   * @param url 
   */
  async getModelByUrl(url:string){
    const model: any = await this.getRepo().admin.shop.GoodsClass.findOne({url});
    if (_.isEmpty(model)) {
      // throw new Error('商品分类参数有误');
      return null
    }
    return { ...model };
  }
  

    
  /**
   * 查找商品分类信息
   * @param id 商品id
   */
  async info(id: number) {
    const model: any = await this.getRepo().admin.shop.GoodsClass.findOne(id);
    if (_.isEmpty(model)) {
      return null
    }
    return { ...model };
  }


}