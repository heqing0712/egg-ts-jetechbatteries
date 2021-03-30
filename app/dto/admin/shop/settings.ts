
import {
    IsInt,
    Allow,
    IsString,
    ArrayNotEmpty,
    IsOptional
} from 'class-validator';
import { Expose ,Type} from 'class-transformer';
import { PageGetDto ,CreateBaseDto} from '../../comm';


export class CreateSettingsDto extends CreateBaseDto {

    @IsString()
    @Expose()
    title: string;

    @Allow()
    @Expose()
    name: string;

    @Allow()
    @Expose()
    url: string;

    @Allow()
    @Expose()
    logo: string;

    @Allow()
    @Expose()
    keyword: string;

    @Allow()
    @Expose()
    description: string;

    @Allow()
    @Expose()
    about: string;

    @Allow()
    @Expose()
    notice: string;

    @Allow()
    @Expose()
    contact: string;

    @Allow()
    @Expose()
    video: string;

    @Allow()
    @Expose()
    email: string;

    @Allow()
    @Expose()
    mobile: string;

    @Allow()
    @Expose()
    tel: string;

    @Allow()
    @Expose()
    header: string;

    @Allow()
    @Expose()
    footer: string;

    
}

export class UpdateSettingsDto extends CreateSettingsDto {
    @IsInt()
    @Expose()
    id: number;
}

export class QuerySettingsDto extends PageGetDto {


    @Allow()
    @Expose()
    uuid: string;

    @IsOptional()
    @Allow()
    @Type(() => Number)
    @Expose()
    id: number;

    @IsOptional()
    @Allow()
    @Expose()
    name:string

    @Allow()
    @Expose()
    lang:string;
}

 

export class DeleteSettingsDto {
    @ArrayNotEmpty()
    @Expose()
    ids: number[];
  }

  export class InfoSettingsDto {
    @IsInt()
    @Type(() => Number)
    @Expose()
    id: number;
  }