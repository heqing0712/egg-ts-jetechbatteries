import { Entity,Column} from 'typeorm';
import { ShopBaseEntity } from '../../base';


@Entity({ name: 'shop_message' })
export default class ShopMessage extends ShopBaseEntity {

  @Column()
  name: string;
 
  @Column()
  email: string;

  @Column()
  mobile: string;
 
  @Column()
  address: string;

  @Column()
  goodsName: string;


  @Column()
  qty: number;

  @Column()
  unit: string;

  @Column()
  specification: string;


}

