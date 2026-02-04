import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { HorsesModule } from '../horses/horses.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [HorsesModule, UsersModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
