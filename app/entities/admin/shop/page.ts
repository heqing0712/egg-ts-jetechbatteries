import { Entity, Column} from 'typeorm';
import { ShopBaseEntity } from '../../base';


@Entity({ name: 'shop_page' })
export default class ShopPage extends ShopBaseEntity {
 
 
  @Column()
  title: string;
 
  @Column()
  content: string;



}

