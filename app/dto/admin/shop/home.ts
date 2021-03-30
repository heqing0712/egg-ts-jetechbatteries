
import {
    IsInt,
    Allow,
    IsString,
    ArrayNotEmpty,
    IsOptional
} from 'class-validator';
import { Expose ,Type} from 'class-transformer';
import { PageGetDto ,CreateBaseDto} from '../../comm';


export class CreateHomeDto extends CreateBaseDto {

    @IsString()
    @Expose()
    title: string;

    @Allow()
    @Expose()
    content: string;
    
    @Allow()
    @Expose()
    identifier:string;


}

export class UpdateHomeDto extends CreateHomeDto {
    @IsInt()
    @Expose()
    id: number;
}

export class QueryHomeDto extends PageGetDto {
    
    @Allow()
    @Expose()
    lang: string;

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
}

export class DeleteHomeDto {
    @ArrayNotEmpty()
    @Expose()
    ids: number[];
  }

  export class InfoHomeDto {
    @IsInt()
    @Type(() => Number)
    @Expose()
    id: number;
  }