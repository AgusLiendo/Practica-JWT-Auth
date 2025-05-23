import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';

export class RolRegisterDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    permissions: number[];
}