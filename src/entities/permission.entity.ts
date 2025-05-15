import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RolEntity } from './rol.entity';

@Entity()
export class Permiso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => RolEntity, rol => rol.permisos)
  rol: RolEntity;
}

