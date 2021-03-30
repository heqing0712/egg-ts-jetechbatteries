
import {
    IsInt,
    Allow,
    ArrayNotEmpty,
    IsOptional
} from 'class-validator';
import { Expose ,Type} from 'class-transformer';
import { PageGetDto ,CreateBaseDto} from '../../comm';


export class CreateBannerDto extends CreateBaseDto {

    @Allow()
    @Expose()
    title: string;

    @Allow()
    @Expose()
    imgs: string;

    @Allow()
    @Expose()
    url: string;

 
 
}

export class UpdateBannerDto extends CreateBannerDto {
    @IsInt()
    @Expose()
    id: number;
}

export class QueryBannerDto extends PageGetDto {

    @Allow()
    @Expose()
    title: string;

    @Allow()
    @Expose()
    uuid: string;

    @IsOptional()
    @Allow()
    @Type(() => Number)
    @Expose()
    id: number;

    @Allow()
    @Expose()
    lang: string;
}

export class DeleteBannerDto {
    @ArrayNotEmpty()
    @Expose()
    ids: number[];
  }

  export class InfoBannerDto {
    @IsInt()
    @Type(() => Number)
    @Expose()
    id: number;
  }