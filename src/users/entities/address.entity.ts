import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity()
export class Address extends AbstractEntity<Address> {
  @Column()
  vaultAccountId: number;

  @Column()
  address: string;

  @Column({
    default: true,
  })
  autoRefuel?: boolean;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
