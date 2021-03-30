
import {
    IsInt,
    Allow,
    IsString,
    Min,
    ArrayNotEmpty
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PageGetDto,CreateBaseDto  } from '../../comm';


export class CreateCaseDto extends CreateBaseDto {

    @IsInt()
    @Min(0)
    @Expose()
    categoryId: number;

    @IsString()
    @Expose()
    title: string;

    @Allow()
    @Expose()
    description: string;

    @Allow()
    @Expose()
    content: string;

    @Allow()
    @Expose()
    price: number;
    
    @Allow()
    @Expose()
    originalPrice: number;

    @Allow()
    @Expose()
    weight: number;

    @Allow()
    @Expose()
    number: string;

    @Allow()
    @Expose()
    imgs: string;

    @Allow()
    @Expose()
    features: string;

    @Allow()
    @Expose()
    spec: string;

    @Allow()
    @Expose()
    faq: string;

    @Allow()
    @Expose()
    keyword: string;

    @Allow()
    @Expose()
    remark: string;

    @Allow()
    @Expose()
    url: string;

    @Allow()
    @Expose()
    hits: number;
 
}


export class UpdateCaseDto extends CreateCaseDto {
    @IsInt()
    @Expose()
    id: number;

}

export class QueryCaseDto extends PageGetDto {

    @Allow()
    @Expose()
    title: string;

    @Allow()
    @Expose()
    lang:string;

    @Type(() => Number)
    @Expose()
    categoryId: number;

    @Allow()
    @Expose()
    caseClassUrl: string;
 
}

export class DeleteCaseDto {
    @ArrayNotEmpty()
    @Expose()
    ids: number[];
}

export class InfoCaseDto {
    @IsInt()
    @Type(() => Number)
    @Expose()
    id: number;

    @Allow()
    @Expose()
    url:string;
    
    @Allow()
    @Expose()
    lang:string;
  }

  export class InfoCasexDto {

    @Allow()
    @Expose()
    url:string;
    
    @Allow()
    @Expose()
    lang:string;
  }


export class smallCaseDto extends CreateBaseDto{
    @Allow()
    @Expose()
    id: number;

    @Allow()
    @Expose()
    categoryId: number;
    
    @Allow()
    @IsString()
    @Expose()
    title: string;

    @Allow()
    @Expose()
    price: number;

    
    @Allow()
    @Expose()
    originalPrice: number;

    @Allow()
    @Expose()
    weight: number;

    @Allow()
    @Expose()
    number: string;

    @Allow()
    @Expose()
    imgs: string;

    
    @Allow()
    @Expose()
    url: string;
}
  