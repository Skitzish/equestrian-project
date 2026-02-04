import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { GameService } from './game.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DoChoreDto } from './dto/do-chorse.dto';
import { Body, Req } from '@nestjs/common';

@Controller('game')
@UseGuards(JwtAuthGuard)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('advance-day')
  async advanceDay(@Request() req) {
    return this.gameService.advanceDay(req.user.userId);
  }

  @Post('do-chore')
  async doChore(@Body() doChoreDto: DoChoreDto, @Req() req){
    return this.gameService.doChore(req.user.userId, doChoreDto.choreId);
  }

  @Get('state')
  async getGameState(@Request() req) {
    return this.gameService.getGameState(req.user.userId);
  }
}
