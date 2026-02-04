import { IsString, IsIn } from 'class-validator';

export class DoChoreDto {
    @IsString()
    @IsIn(['muck_stalls', 'water_horses', 'fill_hay_nets'])
    choreId: string;
}