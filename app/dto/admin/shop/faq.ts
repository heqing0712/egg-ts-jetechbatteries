
import {
    IsInt,
    Allow,
    IsString,
    ArrayNotEmpty,
    IsOptional
} from 'class-validator';
import { Expose ,Type} from 'class-transformer';
import { PageGetDto ,CreateBaseDto} from '../../comm';


export class CreateFaqDto extends CreateBaseDto {

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

export class UpdateFaqDto extends CreateFaqDto {
    @IsInt()
    @Expose()
    id: number;
}

export class QueryFaqDto extends PageGetDto {
    
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

export class DeleteFaqDto {
    @ArrayNotEmpty()
    @Expose()
    ids: number[];
  }

  export class InfoFaqDto {
    @IsInt()
    @Type(() => Number)
    @Expose()
    id: number;
  }