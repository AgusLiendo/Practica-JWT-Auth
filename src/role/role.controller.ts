import { Controller, Post , Get, Body} from '@nestjs/common';
import { RoleService } from './role.service';
import { RolRegisterDTO } from 'src/interfaces/rol-register.dto';
import { RolEntity } from 'src/entities/rol.entity';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    create(@Body() dto: RolRegisterDTO) {
        return this.roleService.createRole(dto);
    }

    @Get()
    findAll(): Promise<RolEntity[]> {
        return this.roleService.findAll();
    }

}
