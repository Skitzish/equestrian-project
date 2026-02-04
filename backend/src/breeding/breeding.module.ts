import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BreedingController } from './breeding.controller';
import { BreedingService } from './breeding.service';
import { Horse, HorseSchema } from '../horses/schemas/horse.schema';
import { HorsesModule } from '../horses/horses.module';
import { UsersModule } from '../users/users.module';
import { Counter, CounterSchema } from '../common/schemas/counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Horse.name, schema: HorseSchema },
      { name: Counter.name, schema: CounterSchema }
    ]),
    HorsesModule,
    UsersModule,
  ],
  controllers: [BreedingController],
  providers: [BreedingService],
})
export class BreedingModule {}
