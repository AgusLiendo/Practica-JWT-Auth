import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
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

    @ManyToMany(() => Permiso, permiso => permiso.rol, {cascade: true})
    @JoinTable({name: 'rol_permisos', joinColumn: {name: 'rolId', referencedColumnName: 'id'}, inverseJoinColumn: {name: 'permisoId', referencedColumnName: 'id'}})  
    permisos: Permiso[];

    @OneToMany(() => UserEntity, user => user.rol, {cascade: true})
    user: UserEntity[];
}

