import BaseService from '../../base';
import * as _ from 'lodash';
import { CreateCaseDto, QueryCaseDto, smallCaseDto, UpdateCaseDto } from '../../../dto/admin/shop/case';

import { plainToClass  } from 'class-transformer';
import ShopCase from '../../../entities/admin/shop/case';
// import { In } from 'typeorm';

/**
 * 系统部门Service
 */
export default class ShopCaseService extends BaseService {

  /**
   * 修改分类
   */
  async add(model:CreateCaseDto) {
    await this.getRepo().admin.shop.Case.insert(model);
  }

    /**
   * 删除分类
   */
  async delete(ids:number[]) {
    await this.getRepo().admin.shop.Case.delete(ids);
  }

  
  /**
   * 修改分类
   */
  async update(model:UpdateCaseDto) {
    await this.getRepo().admin.shop.Case.update(model.id,model);
  }

  /**
   * 案例分类分页
   */
  async page(query:QueryCaseDto) {
    const {limit,title,page,startTime,endTime,lang,status} = query
    const result = await this.getRepo().admin.shop.Case.createQueryBuilder('case')
      .where( title ?  `case.title like '%${title}%'` : '1 = 1')
      .andWhere( lang?  `case.lang = '${lang}'` : '1 = 1')
      .andWhere( startTime? `case.createTime >= '${startTime}'` : '1 = 1')
      .andWhere( endTime? `case.createTime <= '${endTime}'` : '1 = 1')
      .andWhere( status>-1? `case.status = ${status}` : '1 = 1')
      .orderBy({
        'case.sort':'ASC',
        'case.id': 'DESC'
      })
      .offset(page * limit)
      .limit(limit)
      .getManyAndCount();
    return result;
  }


  /**
   * 所有
   */
  async list(query:QueryCaseDto) {
    const {lang,categoryId,title} = query
     let result = await this.getRepo().admin.shop.Case.createQueryBuilder('case')
      .where('case.status = 1')
      .andWhere(categoryId?  `case.categoryId = ${categoryId}` : '1 = 1')
      .andWhere( title ?  `case.title like '%${title}%'` : '1 = 1')
      .andWhere( lang?  `case.lang = '${lang}'` : '1 = 1')
      .orderBy({
        'case.sort':'ASC',
        'case.id': 'DESC'
      })
      .getMany();
    const resultX:Array<smallCaseDto > = result.map(d=>{
      return plainToClass(smallCaseDto,d,{strategy:'excludeAll'})
    })
    return resultX;
  }


  /**
   * 通过分类url返回分类案例列表
   * @param url 
   */
  async  listByCaseClassUrl(url:string){
      const caseClassModel:ShopCase = await this.service.admin.shop.caseClass.getModelByUrl(url)
      let result:Array<smallCaseDto>=[]
      if(!_.isEmpty(caseClassModel)){
        result = await this.list(plainToClass(QueryCaseDto,{categoryId:caseClassModel.id}))
      }
      return {
        caseList:result,
        caseClass:caseClassModel
      }
  }
  
  /**
   * 查找案例信息
   * @param id 案例id
   */
  async info(id: number) {
    const model: any = await this.getRepo().admin.shop.Case.findOne(id);
    if (_.isEmpty(model)) {
      throw new Error('案例id有误');
    }
    return { ...model };
  }

    /**
   * 查找案例信息
   * @param url 案例url
   */
  async infoByUrl(url:string,lang:string) {
    const model: any = await this.getRepo().admin.shop.Case.findOne({url,lang});
    if (_.isEmpty(model)) {
      throw new Error('案例id有误');
    }
    return { ...model };
  }


}