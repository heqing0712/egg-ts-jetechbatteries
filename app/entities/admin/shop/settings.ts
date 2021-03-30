import { Entity,  Column} from 'typeorm';
import { ShopBaseEntity  } from '../../base';


@Entity({ name: 'shop_settings' })
export default class ShopSettings extends ShopBaseEntity {
 
  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  keyword: string;
 
  @Column()
  description: string;

  @Column()
  about: string;

  @Column()
  contact: string;

  @Column()
  notice: string;

  @Column()
  video: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  tel: string;

  @Column()
  url: string;

  @Column()
  header: string;

  @Column()
  footer: string;
}

