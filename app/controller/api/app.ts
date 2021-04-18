import BaseController from '../base';
 
import shopSettings from '../../entities/admin/shop/settings';
import { Route } from '../../decorator/router_register';
import { QueryBannerDto } from '../../dto/admin/shop/banner';
import { QueryContentDto } from '../../dto/admin/shop/content';
// import { QueryGoodsClassDto } from '../../dto/admin/shop/goods_class';
import { InfoGoodsDto, InfoGoodsxDto, QueryGoodsDto  } from '../../dto/admin/shop/goods';
import { QueryGoodsClassDto } from '../../dto/admin/shop/goods_class';
import { InfoPageDto } from '../../dto/admin/shop/page';
import { QueryHomeDto } from '../../dto/admin/shop/home';
import { CreateMessageDto } from '../../dto/admin/shop/Message';
import { InfoCaseDto, InfoCasexDto, QueryCaseDto } from '../../dto/admin/shop/case';
import { QueryCaseClassDto } from '../../dto/admin/shop/case_class';
const fs = require('fs')
const path = require('path')


export default class AppController extends BaseController {


  @Route('/page/admin', 'get')
  async pageAdmin() {
    const { ctx } = this
    ctx.response.type = 'html'
    ctx.body = fs.readFileSync(path.resolve(__dirname, '../../../public/admin/index.html'))
  }

  @Route('/api/test', 'get')
  async test() {
    this.res({
      data: {
        t: +new Date().getTime(),
        name: 'xiaohe'
      }
    });
  }

  @Route('/api/web/header', 'get')
  async getHeader() {
    const data = await this.service.admin.shop.content.info(3)
    this.res({
      data: data.content
    });
  }

  @Route('/api/web/footer', 'get')
  async getFooter() {
    const data = await this.service.admin.shop.content.info(1)
    this.res({
      data: data.content
    });
  }

  @Route('/api/web/case-banner', 'get')
  async getCaseBanner() {
    const data = await this.service.admin.shop.content.info(3)
    this.res({
      data: data.content
    });
  }

  @Route('/api/web/product-banner', 'get')
  async getproductBanner() {
    const data = await this.service.admin.shop.content.info(1)
    this.res({
      data: data.content
    });
  }


  @Route('/api/web/config', 'get')
  async getConfig() {
    let config: shopSettings
    let {lang} = this.getQuery()
    if(!lang){
      lang = 'en'
    }
    config = await this.service.admin.shop.settings.info(lang === 'en' ? 1: 2);
    this.res({
      data: config
    });
  }
  
  @Route('/api/web/banner/list', 'get')
  async getBanner(){
    const dto = await this.ctx.validate<QueryBannerDto>(QueryBannerDto, this.getQuery());
    if(!dto.lang){
      dto.lang="en"
    }
    const result = await this.service.admin.shop.banner.list(dto)
    this.res({
      data: result
    });
  }

  @Route('/api/web/content/list', 'get')
  async getContent(){
    const dto = await this.ctx.validate<QueryContentDto>(QueryContentDto, this.getQuery());
    if(!dto.lang){
      dto.lang="en"
    }
    const result = await this.service.admin.shop.content.list(dto)
    this.res({
      data: result
    });
  }

  @Route('/api/web/home/list', 'get')
  async getHomeList(){
    const dto = await this.ctx.validate<QueryHomeDto>(QueryHomeDto, this.getQuery());
    if(!dto.lang){
      dto.lang="en"
    }
    const result = await this.service.admin.shop.home.list(dto)
    this.res({
      data: result
    });
  }



  @Route('/api/web/goodsclass/list', 'get')
  async getGoodsClassList(){
    const dto = await this.ctx.validate<QueryGoodsClassDto>(QueryGoodsClassDto, this.getQuery());
    if(!dto.lang){
      dto.lang="en"
    }
    const result = await this.service.admin.shop.goodsClass.list(dto)
    this.res({
      data: result
    });
  }

  @Route('/api/web/caseclass/list', 'get')
  async getCaseClassList(){
    const dto = await this.ctx.validate<QueryCaseClassDto>(QueryCaseClassDto, this.getQuery());
    if(!dto.lang){
      dto.lang="en"
    }
    const result = await this.service.admin.shop.caseClass.list(dto)
    this.res({
      data: result
    });
  }

 
  @Route('/api/web/goods/list', 'get')
  async getGoodsList(){
    const dto = await this.ctx.validate<QueryGoodsDto>(QueryGoodsDto, this.getQuery());
    if(!dto.lang){
      dto.lang="en"
    }
    let result;
    if(dto.goodsClassUrl ){
      result =  await this.service.admin.shop.goods.listByGoodsClassUrl(dto.goodsClassUrl)
    }
    else{
      result =  await this.service.admin.shop.goods.list(dto)
    }
    this.res({
      data: result
    });
  }


  @Route('/api/web/case/list', 'get')
  async getcaseList(){
    const dto = await this.ctx.validate<QueryCaseDto>(QueryCaseDto, this.getQuery());
    if(!dto.lang){
      dto.lang="en"
    }
    let result;
    if(dto.caseClassUrl ){
      result =  await this.service.admin.shop.case.listByCaseClassUrl(dto.caseClassUrl)
    }
    else{
      result =  await this.service.admin.shop.case.list(dto)
    }
    this.res({
      data: result
    });
  }


  @Route('/api/web/goods/', 'get')
  async getGoods(){
    const dto = await this.ctx.validate<InfoGoodsDto>(InfoGoodsDto, this.getQuery());
    const result = await this.service.admin.shop.goods.info(dto.id)
    this.res({
      data: result
    });
  }

  @Route('/api/web/goodsx/', 'get')
  async getGoodsx(){
    const dto = await this.ctx.validate<InfoGoodsxDto>(InfoGoodsxDto, this.getQuery());
    const result = await this.service.admin.shop.goods.infoByUrl(dto.url,dto.lang)
    this.res({
      data: result
    });
  }

  @Route('/api/web/case/', 'get')
  async getCase(){
    const dto = await this.ctx.validate<InfoCaseDto>(InfoCaseDto, this.getQuery());
    const result = await this.service.admin.shop.case.info(dto.id)
    this.res({
      data: result
    });
  }

  @Route('/api/web/casex/', 'get')
  async getCasex(){
    const dto = await this.ctx.validate<InfoCasexDto>(InfoCasexDto, this.getQuery());
    const result = await this.service.admin.shop.case.infoByUrl(dto.url,dto.lang)
    this.res({
      data: result
    });
  }

  @Route('/api/web/goodsclass', 'get')
  async getGoodsClass(id:number){
    const result = await this.service.admin.shop.goodsClass.info(id)
    this.res({
      data: result
    });
  }

  @Route('/api/web/caseclass', 'get')
  async getCaseClass(id:number){
    const result = await this.service.admin.shop.caseClass.info(id)
    this.res({
      data: result
    });
  }

  @Route('/api/web/page', 'get')
  async getPage(){
    const dto = await this.ctx.validate<InfoPageDto>(InfoPageDto, this.getQuery());
    const result = await this.service.admin.shop.page.info(dto.id)
    this.res({
      data: result
    });
  }
 

  
 
  @Route('/api/web/message', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateMessageDto>(CreateMessageDto);
    const result = await this.service.admin.shop.message.add(dto);
    this.res({
      data:result ? true: false
    });
  }


}
