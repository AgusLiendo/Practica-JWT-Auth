import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Permiso } from "./permission.entity"

@Entity("role")
export class RolEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;
    
    @Column()
    name: string;

    @OneToMany()
}