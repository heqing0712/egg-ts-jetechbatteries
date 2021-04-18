
import {
    IsInt,
    Allow,
    IsString,
    Min,
    ArrayNotEmpty,
    IsOptional
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PageGetDto, CreateBaseDto } from '../../comm';


export class CreateGoodsDto extends CreateBaseDto {

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

    @Allow()
    @Type(() => Number)
    @Expose()
    hot: number;

}


export class UpdateGoodsDto extends CreateGoodsDto {
    @IsInt()
    @Expose()
    id: number;

}

export class QueryGoodsDto extends PageGetDto {

    @Allow()
    @Expose()
    title: string;

    @Allow()
    @Expose()
    lang: string;

    @Type(() => Number)
    @Expose()
    categoryId: number;

    @Allow()
    @Expose()
    goodsClassUrl: string;

    @IsOptional()
    @Allow()
    @Type(() => Number)
    @Expose()
    hot: number;
}

export class DeleteGoodsDto {
    @ArrayNotEmpty()
    @Expose()
    ids: number[];
}

export class InfoGoodsDto {
    @IsInt()
    @Type(() => Number)
    @Expose()
    id: number;

}
export class InfoGoodsxDto {
    @Allow()
    @Expose()
    url: string;

    @Allow()
    @Expose()
    lang: string;
}

export class smallGoodsDto extends CreateBaseDto {
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

      
    @IsOptional()
    @Allow()
    @Type(() => Number)
    @Expose()
    hot: number;
}
