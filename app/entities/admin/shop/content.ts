import { Entity, Column} from 'typeorm';
import { ShopBaseEntity } from '../../base';


@Entity({ name: 'shop_content' })
export default class ShopContent extends ShopBaseEntity {
 
 
  @Column()
  title: string;
 
  @Column()
  content: string;

  @Column()
  identifier:string;


}

