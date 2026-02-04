import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { HorsesService } from './horses.service';
import { CreateStarterHorseDto, TrainHorseDto, UpdateHorseHousingDto } from './dto/horse.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RenameHorseDto } from './dto/update-horse.dto';
import { Req } from '@nestjs/common';

@Controller('horses')
@UseGuards(JwtAuthGuard)
export class HorsesController {
  constructor(private readonly horsesService: HorsesService) {}

  @Post()
  async create(@Request() req, @Body() createHorseDto: CreateStarterHorseDto) {
    const horse = await this.horsesService.create(req.user.userId, createHorseDto);
    return this.horsesService.toResponseDto(horse);
  }

  @Get()
  async findAll(@Request() req) {
    const horses = await this.horsesService.findAll(req.user.userId);
    return horses.map(horse => this.horsesService.toResponseDto(horse));
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const horse = await this.horsesService.findOne(id, req.user.userId);
    return this.horsesService.toResponseDto(horse);
  }

  @Post('train')
  async train(@Request() req, @Body() trainDto: TrainHorseDto) {
    return this.horsesService.train(req.user.userId, trainDto);
  }

  @Put(':id/rename')
  async rename(
    @Param('id') id: string,
    @Body() renameDto: RenameHorseDto,
    @Req() req,
  ) {
    const horse = await this.horsesService.rename(id, req.user.userId, renameDto.name);
    return this.horsesService.toResponseDto(horse);
  }

  @Put(':id/housing')
  async updateHousing(
    @Request() req,
    @Param('id') id: string,
    @Body() updateHousingDto: UpdateHorseHousingDto,
  ) {
    const horse = await this.horsesService.updateHousing(
      id,
      req.user.userId,
      updateHousingDto.housing,
    );
    return this.horsesService.toResponseDto(horse);
  }
}
