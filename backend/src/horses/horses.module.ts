import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HorsesController } from './horses.controller';
import { HorsesService } from './horses.service';
import { Horse, HorseSchema } from './schemas/horse.schema';
import { UsersModule } from '../users/users.module';
import { Counter, CounterSchema } from '../common/schemas/counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Horse.name, schema: HorseSchema },
      { name: Counter.name, schema: CounterSchema }
    ]),
    UsersModule,
  ],
  controllers: [HorsesController],
  providers: [HorsesService],
  exports: [HorsesService],
})
export class HorsesModule {}
