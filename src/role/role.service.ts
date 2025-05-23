import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { RolEntity } from 'src/entities/rol.entity';
import { Permiso } from 'src/entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolRegisterDTO } from 'src/interfaces/rol-register.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly roleRepository: Repository<RolEntity>,
        @InjectRepository(Permiso)
        private readonly permissionRepository: Repository<Permiso>
    ) { }

    async createRole(dto: RolRegisterDTO): Promise<RolEntity> {
        try {
            // Validate permissions data
            if (!dto.permissions || !Array.isArray(dto.permissions) || dto.permissions.length === 0) {
                throw new BadRequestException('Se requiere un array de IDs de permisos válidos');
            }

            // Ensure all permission IDs are numbers
            const permissionIds = dto.permissions.map(id => {
                const numId = Number(id);
                if (isNaN(numId)) {
                    throw new BadRequestException(`ID de permiso inválido: ${id}`);
                }
                return numId;
            });

            // Validate permissions exist
            const perms = await this.permissionRepository.findBy({
                id: In(permissionIds)
            });

            if (perms.length !== permissionIds.length) {
                throw new NotFoundException('Uno o más permisos no existen');
            }

            // Create and save the role
            const newRole = this.roleRepository.create({
                name: dto.name,
                code: dto.code
            });

            newRole.permisos = perms;
            return await this.roleRepository.save(newRole);
        } catch (error) {
            // Handle specific errors
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }

            // Log the error for debugging
            console.error('Error creating role:', error);

            // Handle database errors (like unique constraint violations)
            if (error.code === '23505') { // PostgreSQL unique violation code
                throw new BadRequestException('El código o nombre del rol ya existe');
            }

            // Handle other errors
            throw new BadRequestException(
                error.message || 'Error al crear el rol'
            );
        }
    }

    async findAll(): Promise<RolEntity[]> {
        return await this.roleRepository.find({ relations: ['permisos'] });
    }
}