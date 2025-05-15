import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Permiso } from "./permission.entity"
import { UserEntity } from './user.entity';

@Entity()
export class RolEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;
    
    @Column()
    name: string;

    @OneToMany(() => Permiso, permiso => permiso.rol, {cascade: true})
    permisos: Permiso[];

    @OneToMany(() => UserEntity, user => user.rol, {cascade: true})
    user: UserEntity[];
}