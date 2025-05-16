import { UserI } from '../interfaces/user.interface';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
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
  @JoinColumn({ name: 'rolId' })
  rol: RolEntity;

  get permissionCodes() {
    return this.rol.permisos.map(permiso => permiso.code);
  }
 


}
