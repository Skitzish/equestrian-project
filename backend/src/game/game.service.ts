import { BadRequestException, Injectable } from '@nestjs/common';
import { HorsesService } from '../horses/horses.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class GameService {
  constructor(
    private horsesService: HorsesService,
    private usersService: UsersService,
  ) {}

  async advanceDay(userId: string) {
    return this.horsesService.advanceDay(userId);
  }

  async getGameState(userId: string) {
    const user = await this.usersService.findOne(userId);
    const horses = await this.horsesService.findAll(userId);
    
    return {
      currentDay: user.currentDay,
      timeRemainingToday: user.timeRemainingToday,
      money: user.money,
      trainerSkillLevel: user.trainerSkillLevel,
      horseCount: horses.length,
      horses: horses.map(horse => this.horsesService.toResponseDto(horse)),
    };
  }

  async doChore(userId: string, choreId: string): Promise<any>{
    const user = await this.usersService.findOne(userId);

    // Define chores
    const chores = {
      muck_stalls: { name: 'Muck Stalls', duration: 60, payment: 32 },
      water_horses: { name: 'Water Horses', duration: 15, payment: 8 },
      fill_hay_nets: { name: 'Fill Hay Nets', duration: 30, payment: 16 }
    };

    const chore = chores[choreId];
    if(!chore) {
      throw new BadRequestException('Invalid Chore');
    }

    // Check if user has enough time
    if (user.timeRemainingToday < chore.duration) {
      throw new BadRequestException(
        `Not enough time remaining. Need ${chore.duration} minutes, have ${user.timeRemainingToday} minutes left.`
      );
    }

    // Deduct time and add money
    user.timeRemainingToday -= chore.duration;
    user.money += chore.payment;
    await user.save();

    return{
      success: true,
      choreName: chore.name,
      timeSpent: chore.duration,
      moneyEarned: chore.payment,
      timeRemaining: user.timeRemainingToday,
      newBalance: user.money
    };
  }
}
