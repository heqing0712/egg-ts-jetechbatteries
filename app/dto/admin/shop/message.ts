
import {
    IsInt,
    Allow,
    ArrayNotEmpty,
    IsOptional
} from 'class-validator';
import { Expose ,Type} from 'class-transformer';
import { PageGetDto ,CreateBaseDto} from '../../comm';


export class CreateMessageDto extends CreateBaseDto {

    @Allow()
    @Expose()
    name: string;

    @Allow()
    @Expose()
    email: string;

    @Allow()
    @Expose()
    mobile: string;

    @Allow()
    @Expose()
    address: string;

    @Allow()
    @Expose()
    goodsName: string;

    @IsOptional()
    @Allow()
    @Type(() => Number)
    @Expose()
    qty: number;

    @Allow()
    @Expose()
    unit: string;

    @Allow()
    @Expose()
    specification: string;

    @IsOptional()
    @Allow()
    @Type(() => Number)
    @Expose()
    status: number;

    @IsOptional()
    @Allow()
    @Type(() => Number)
    @Expose()
    sort: number;

}

export class UpdateMessageDto extends CreateMessageDto {
    @IsInt()
    @Expose()
    id: number;
}

export class QueryMessageDto extends PageGetDto {

    @Allow()
    @Expose()
    name: string;

    @Allow()
    @Expose()
    mobile: string;

    @Allow()
    @Expose()
    email: string;

    @Allow()
    @Expose()
    goodsName: string;
}

export class DeleteMessageDto {
    @ArrayNotEmpty()
    @Expose()
    ids: number[];
  }