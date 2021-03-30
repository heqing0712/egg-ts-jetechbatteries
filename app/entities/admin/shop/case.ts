import { Entity,  Column} from 'typeorm';
import { ShopBaseEntity  } from '../../base';


@Entity({ name: 'shop_case' })
export default class ShopCase extends ShopBaseEntity {
 

  @Column({ type: 'int',default:0})
  categoryId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  price: number;

  @Column({name:"original_price"})
  originalPrice: number;

  @Column()
  weight: number;

  @Column()
  imgs: string;

  @Column()
  features: string;

  @Column()
  spec: string;
  
  @Column()
  number: string;

  @Column()
  faq: string;

  @Column()
  keyword: string;

  @Column()
  remark: string;

  @Column()
  url: string;

  @Column({  type: 'int',  default: 0 })
  hits: number;

  

}

