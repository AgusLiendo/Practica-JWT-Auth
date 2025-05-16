import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RolEntity } from 'src/entities/rol.entity';
import { In } from 'typeorm';
import { Permiso } from 'src/entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolRegisterDTO } from 'src/interfaces/rol-register.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RolEntity) private readonly roleRepository: Repository<RolEntity>,
        @InjectRepository(Permiso) private readonly permissionRepository: Repository<Permiso>,
    ){}

    
    
    async createRole(dto: RolRegisterDTO): Promise<RolEntity>{
        const perms = await this.permissionRepository.findBy({ id: In(dto.permissions) });
        if (perms.length !== dto.permissions.length) {
            throw new Error('El permiso no existe');
        }
        const newRole = this.roleRepository.create(dto);
        newRole.permisos = perms;
        return await this.roleRepository.save(newRole);
    }

    async findAll(): Promise<RolEntity[]> {
        return await this.roleRepository.find({ relations: ['permisos'] });
    }
}
