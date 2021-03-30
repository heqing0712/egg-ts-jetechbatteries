import {
  IsInt,
  IsOptional,
  Min,
  Allow,
  IsString,
} from 'class-validator';
import { Expose , Type} from 'class-transformer';

export class CreateBaseDto{

  @IsString()
  @Expose()
  lang: string;

  @IsOptional()
  @Allow()
  @Type(() => Number)
  @Expose()
  sort: number;

  
  @IsOptional()
  @Allow()
  @Type(() => Number)
  @Expose()
  status: number;
}

export class PagePostDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Expose()
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Expose()
  page: number;
}

/**
 * 由于query获取的参数只能为string，所以要区分开
 */
export class PageGetDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
 //@Transform(v => parseInt(String(v)), { toClassOnly: true })
  @Expose()
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  //@Transform(v => parseInt(String(v)), { toClassOnly: true })
  @Expose()
  page: number;

  @Allow()
  @Expose()
  startTime:string;

  @Allow()
  @Expose()
  endTime:string;


  @IsOptional()
  @Allow()
  @Type(() => Number)
  @Expose()
  status: number;
}
