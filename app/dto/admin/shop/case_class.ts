
import {
    IsInt,
    Allow,
    IsString,
    Min,
    ArrayNotEmpty
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PageGetDto ,CreateBaseDto } from '../../comm';


export class CreateCaseClassDto  extends CreateBaseDto  {

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


export class UpdateCaseClassDto extends CreateCaseClassDto {
    @IsInt()
    @Expose()
    id: number;

}


export class QueryCaseClassDto extends PageGetDto {

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

export class DeleteCaseClassDto {
    @ArrayNotEmpty()
    @Expose()
    ids: number[];
  }