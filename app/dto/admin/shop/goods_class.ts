
import {
    IsInt,
    Allow,
    IsString,
    Min,
    ArrayNotEmpty
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PageGetDto ,CreateBaseDto } from '../../comm';


export class CreateGoodsClassDto  extends CreateBaseDto  {

    @IsString()
    @Expose()
    name: string;

    @IsInt()
    @Min(0)
    @Expose()
    pid: number;

    @Allow()
    @Expose()
    url: string;

    @Allow()
    @Expose()
    imgs: string;
}


export class UpdateGoodsClassDto extends CreateGoodsClassDto {
    @IsInt()
    @Expose()
    id: number;

}


export class QueryGoodsClassDto extends PageGetDto {

    @Allow()
    @Expose()
    lang: string;
    
    @Allow()
    @Expose()
    name: string;

    @Type(() => Number)
    @Expose()
    pid: number;
}

export class DeleteGoodsClassDto {
    @ArrayNotEmpty()
    @Expose()
    ids: number[];
  }