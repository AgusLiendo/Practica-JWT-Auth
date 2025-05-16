import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permiso } from '../entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionRegisterDTO } from 'src/interfaces/permission-register.dto';

@Injectable()
export class PermissionService {
    constructor(
    @InjectRepository(Permiso) private readonly permissionRepository: Repository<Permiso>,
    ) {}

    async createPermission(permission: PermissionRegisterDTO): Promise<Permiso> {
        const newPermission = this.permissionRepository.create(permission);
        return await this.permissionRepository.save(newPermission);
    }

    async findAll(): Promise<Permiso[]> {
        return await this.permissionRepository.find();
    }
    
}
