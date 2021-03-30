import { Entity, Column} from 'typeorm';
import { ShopBaseEntity } from '../../base';
 

@Entity({ name: 'shop_goods_class' })
export default class ShopGoodsClass extends ShopBaseEntity {

  @Column({ name: 'pid', nullable: true })
  pid: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  imgs: string;


}

