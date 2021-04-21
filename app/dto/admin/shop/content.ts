
import {
    IsInt,
    Allow,
    IsString,
    ArrayNotEmpty,
    IsOptional
} from 'class-validator';
import { Expose ,Type} from 'class-transformer';
import { PageGetDto ,CreateBaseDto} from '../../comm';


export class CreateContentDto extends CreateBaseDto {

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

export class UpdateContentDto extends CreateContentDto {
    @IsInt()
    @Expose()
    id: number;
}

export class QueryContentDto extends PageGetDto {
    
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

export class DeleteContentDto {
    @ArrayNotEmpty()
    @Expose()
    ids: number[];
  }

  export class InfoContentDto {
  
    @IsOptional()
    @Allow()
    @Type(() => Number)
    @Allow()
    @Expose()
    id: number;

    
    @Allow()
    @Expose()
    identifier:string;
  }

 