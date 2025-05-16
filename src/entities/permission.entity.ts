import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { RolEntity } from './rol.entity';

@Entity()
export class Permiso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @ManyToMany(() => RolEntity, rol => rol.permisos)
  rol: RolEntity[];
}

