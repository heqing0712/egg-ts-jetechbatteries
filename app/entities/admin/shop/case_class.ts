import { Entity, Column} from 'typeorm';
import { ShopBaseEntity } from '../../base';
 

@Entity({ name: 'shop_case_class' })
export default class ShopCaseClass extends ShopBaseEntity {

  @Column({ name: 'pid', nullable: true })
  pid: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  imgs: string;


}

