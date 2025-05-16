import { Controller, Post , Get, Body, UseGuards} from '@nestjs/common';
import { RoleService } from './role.service';
import { RolRegisterDTO } from 'src/interfaces/rol-register.dto';
import { RolEntity } from 'src/entities/rol.entity';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import {Permissions} from 'src/middlewares/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/middlewares/permissions.middleware';

@Controller('role')
@UseGuards(AuthGuard, PermissionsGuard)
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    @Permissions(['Create_Role'])
    create(@Body() dto: RolRegisterDTO) {
        return this.roleService.createRole(dto);
    }

    @Get()
    findAll(): Promise<RolEntity[]> {
        return this.roleService.findAll();
    }

}
