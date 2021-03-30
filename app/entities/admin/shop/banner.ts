import { Entity, Column} from 'typeorm';
import { ShopBaseEntity } from '../../base';


@Entity({ name: 'shop_banner' })
export default class ShopBanner extends ShopBaseEntity {
 
 
  @Column()
  title: string;
 
  @Column()
  imgs: string;

  @Column()
  url: string;
 
 

}

