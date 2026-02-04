import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BreedingService } from './breeding.service';
import { BreedHorsesDto } from './dto/breeding.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HorsesService } from '../horses/horses.service';

@Controller('breeding')
@UseGuards(JwtAuthGuard)
export class BreedingController {
  constructor(
    private readonly breedingService: BreedingService,
    private readonly horsesService: HorsesService,
  ) {}

  @Post()
  async breed(@Request() req, @Body() breedDto: BreedHorsesDto) {
    const foal = await this.breedingService.breed(req.user.userId, breedDto);
    return this.horsesService.toResponseDto(foal);
  }
}
