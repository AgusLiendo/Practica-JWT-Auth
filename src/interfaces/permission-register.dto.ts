import { IsString, IsNotEmpty } from 'class-validator';

export class PermissionRegisterDTO {
    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}