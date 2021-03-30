import { Entity, Column} from 'typeorm';
import { ShopBaseEntity } from '../../base';


@Entity({ name: 'shop_home' })
export default class ShopHome extends ShopBaseEntity {
 
 
  @Column()
  title: string;
 
  @Column()
  content: string;

  @Column()
  identifier:string;


}

