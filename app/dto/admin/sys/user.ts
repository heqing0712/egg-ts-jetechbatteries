import {
  IsInt,
  Length,
  Matches,
  Allow,
  IsEmail,
  ArrayNotEmpty,
  ValidateIf,
  IsOptional,
  IsIn,
  IsNumberString,
} from 'class-validator';
import { Expose,Type } from 'class-transformer';
import { PageGetDto } from '../../comm';

export class CreateUserDto {
  @IsInt()
  @Expose()
  departmentId: number;

  @Allow()
  @Expose()
  name: string;


  @Matches(/^[a-z0-9A-Z]+$/)
  @Length(6, 20,{message: '用户名长度为 6 ~ 20 个字符'})
  @Expose()
  username: string;

  @Allow()
  @Expose()
  nickName: string;

  // @ArrayNotEmpty()
  @Allow()
  @Expose()
  roles: number[];

  @Allow()
  @Expose()
  remark: string;

  @ValidateIf((_o, v) => { return !(v === '' || v === undefined || v === null); })
  @IsEmail()
  @Expose()
  email: string;

  @Allow()
  @Expose()
  phone: string;

  @IsOptional()
  @IsIn([ 0, 1 ])
  @Expose()
  status: number;
}

export class UpdateUserDto extends CreateUserDto {
  @IsInt()
  @Expose()
  id: number;
}

export class InfoUserDto {
  @IsNumberString()
  @Expose()
  userId: string;
}

export class DeleteUserDto {
  @ArrayNotEmpty()
  @Expose()
  userIds: number[];
}

export class QueryUserDto extends PageGetDto {
  @Allow()
  @Expose()
  id: number;
  
  @Allow()
  @Type(() => Number)
  @Expose()
  status: number;
    
  @Allow()
  @Expose()
  username: string;

  @Allow()
  @Expose()
  nickName: string;

  @Allow()
  @Expose()
  name: string;


  @Allow()
  @Expose()
  email: string;

  @Allow()
  @Type(() => Number)
  @Expose()
  departmentId: number;

}
