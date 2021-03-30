import BaseService from '../../base';
import * as _ from 'lodash';
import { CreateCaseClassDto, QueryCaseClassDto, UpdateCaseClassDto } from '../../../dto/admin/shop/case_class';
// import { In } from 'typeorm';

/**
 * 系统部门Service
 */
export default class ShopCaseClassService extends BaseService {

  /**
   * 分类
   */
  async add(model:CreateCaseClassDto) {
    await this.getRepo().admin.shop.CaseClass.save(model);
  }

    /**
   * 删除分类
   */
  async delete(ids:number[]) {
    await this.getRepo().admin.shop.CaseClass.delete(ids);
  }

  
  /**
   * 修改分类
   */
  async update(model:UpdateCaseClassDto) {
    await this.getRepo().admin.shop.CaseClass.update(model.id,model);
  }

  /**
   * 商品分类分页
   */
  async page(query:QueryCaseClassDto) {
    //const {id,limit,createTime,email,username,name,page, departmentId} = query
    const {limit,name,page,startTime,endTime,lang} = query

    const result = await this.getRepo().admin.shop.CaseClass.createQueryBuilder('case_class')
      .where( name ?  `case_class.name like '%${name}%'` : '1 = 1')
      .andWhere( lang?  `case_class.lang = '${lang}'` : '1 = 1')
      .andWhere( startTime? `case_class.createTime >= '${startTime}'` : '1 = 1')
      .andWhere( endTime? `case_class.createTime <= '${endTime}'` : '1 = 1')
      .addOrderBy('case_class.sort', 'ASC')
      .offset(page * limit)
      .limit(limit)
      .getManyAndCount();
    return result;
  }

  /**
   * 所有商品分类
   */
  async list(query:QueryCaseClassDto) {
    const {lang} = query
    const result = await this.getRepo().admin.shop.CaseClass.createQueryBuilder('case_class')
      .andWhere( lang ?  `case_class.lang = '${lang}'` : '1 = 1')
      .orderBy('case_class.sort', 'ASC')
      .getMany();
    return result;
  }

  /**
   * 通过url查收商品分类
   * @param url 
   */
  async getModelByUrl(url:string){
    const model: any = await this.getRepo().admin.shop.CaseClass.findOne({url});
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
    const model: any = await this.getRepo().admin.shop.CaseClass.findOne(id);
    if (_.isEmpty(model)) {
      return null
    }
    return { ...model };
  }


}