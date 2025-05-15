import { UserI } from '../interfaces/user.interface';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { RolEntity } from "./rol.entity"

@Entity('users')
export class UserEntity extends BaseEntity implements UserI {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({unique:true})
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => RolEntity, rol => rol.id)
  rol: RolEntity;

  get permissionCodes() {
    return ['create-users', 'list-products'];
  }
}
