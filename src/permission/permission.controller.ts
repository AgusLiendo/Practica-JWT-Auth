import { Controller, Get, Post, Body } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionRegisterDTO } from 'src/interfaces/permission-register.dto';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Get()
    async getAllPermissions() {
        return await this.permissionService.findAll();
    }

    @Post()
    createPermission(@Body() dto: PermissionRegisterDTO) {
        return this.permissionService.createPermission(dto);
    }

}
