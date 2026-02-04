import { IsString, IsNumber, IsEnum, IsOptional, Min, Max } from 'class-validator';

export class CreateStarterHorseDto {
  @IsString()
  name: string;

  @IsEnum(['stallion', 'mare', 'gelding'])
  gender: string;

  @IsOptional()
  @IsNumber()
  @Min(40)
  @Max(80)
  minPotential?: number;

  @IsOptional()
  @IsNumber()
  @Min(40)
  @Max(80)
  maxPotential?: number;
}

export class TrainHorseDto {
  @IsString()
  horseId: string;

  @IsString()
  skillId: string;

  @IsNumber()
  @IsEnum([5, 15, 30, 60])
  duration: number;
}

export class UpdateHorseHousingDto {
  @IsEnum(['pasture', 'stall'])
  housing: string;
}

export class HorseResponseDto {
  id: string;
  name: string;
  age: number;
  gender: string;
  genes: any;
  training: any;
  skills: any;
  mentalState: any;
  housing: string;
  satisfaction: any;
  bonds: any[];
  visualGenetics: any;
  sire?: any;
  dam?: any;
  generation: number;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
