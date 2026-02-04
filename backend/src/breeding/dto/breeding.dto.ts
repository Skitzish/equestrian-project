import { IsString } from 'class-validator';

export class BreedHorsesDto {
  @IsString()
  sireId: string;

  @IsString()
  damId: string;

  @IsString()
  foalName: string;
}
