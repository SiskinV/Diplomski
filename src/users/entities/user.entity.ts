import { Column, Entity, OneToMany } from 'typeorm';
import { Address } from './address.entity';
import { AbstractEntity } from "../../database/abstract.entity";

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses: Address[];
}
