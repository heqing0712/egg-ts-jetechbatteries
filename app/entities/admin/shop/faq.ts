import { Entity, Column} from 'typeorm';
import { ShopBaseEntity } from '../../base';


@Entity({ name: 'shop_faq' })
export default class ShopFaq extends ShopBaseEntity {
 
 
  @Column()
  title: string;
 
  @Column()
  content: string;

  @Column()
  identifier:string;


}

