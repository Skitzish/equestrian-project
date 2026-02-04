import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Horse, HorseDocument } from '../horses/schemas/horse.schema';
import { HorsesService } from '../horses/horses.service';
import { UsersService } from '../users/users.service';
import { BreedHorsesDto } from './dto/breeding.dto';
import { breedVisualGenetics } from '../../../shared/visual-genetics/color-breeding';

// Import shared breeding logic
import {
  breedGenes,
  inheritPersonality,
  validateBreeding,
  VisualGenetics,
} from '../../../shared';
import { Counter, CounterDocument } from 'src/common/schemas/counter.schema';

@Injectable()
export class BreedingService {
  constructor(
    @InjectModel(Horse.name) private horseModel: Model<HorseDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>,
    private horsesService: HorsesService,
    private usersService: UsersService,
  ) {}

  async breed(userId: string, breedDto: BreedHorsesDto): Promise<HorseDocument> {
    const user = await this.usersService.findOne(userId);
    
    // Get sire and dam
    const sire = await this.horsesService.findOne(breedDto.sireId, userId);
    const dam = await this.horsesService.findOne(breedDto.damId, userId);
    
    // Validate breeding using shared module
    const validation = validateBreeding(
      sire.age,
      dam.age,
      sire.gender,
      dam.gender,
    );
    
    if (!validation.canBreed) {
      throw new BadRequestException(validation.reason);
    }
    
    // Check stable capacity
    const horseCount = await this.horseModel.countDocuments({ ownerId: user._id });
    const maxStableSize = parseInt(process.env.MAX_STABLE_SIZE) || 10;
    
    if (horseCount >= maxStableSize) {
      throw new ConflictException(`Stable is full (max ${maxStableSize} horses)`);
    }
    
    // Check breeding cost
    const breedingCost = 5000;
    if (user.money < breedingCost) {
      throw new BadRequestException('Not enough money for breeding');
    }
    
    // Breed genes using shared module
    const foalGenes = breedGenes(sire.genes, dam.genes);
    const sireVisualGenetics = sire.visualGenetics as any as VisualGenetics;
    const damVisualGenetics = dam.visualGenetics as any as VisualGenetics;
    const foalVisualGenetics = breedVisualGenetics(sireVisualGenetics, damVisualGenetics);

    // Inherit personality using shared module
    const foalPersonality = inheritPersonality(
      sire.mentalState.personality as any,
      dam.mentalState.personality as any,
    );
    
    // Determine foal gender (50/50)
    const foalGender = Math.random() < 0.5 ? 'stallion' : 'mare';
    
    // Create foal
    const foal = new this.horseModel({
      horseId: await this.getNextHorseID(),
      name: breedDto.foalName,
      age: 0,
      gender: foalGender,
      ownerId: user._id,
      genes: foalGenes,
      training: {
        strength: 0,
        speed: 0,
        agility: 0,
        balance: 0,
        stamina: 0,
        movement: 0,
        tempo: 0,
        bravery: 0,
        competitiveness: 0,
        flexibility: 0,
        intelligence: 0,
        loyalty: 0,
        sociability: 0,
        stolidity: 0,
      },
      skills: new Map(),
      mentalState: {
        personality: foalPersonality,
        mood: 'Apathetic',
        fatigue: 0,
      },
      housing: 'pasture',
      satisfaction: {
        exercise: { current: 0, required: 0 },
        stimulation: { current: 0, required: 0 },
        nutrition: { current: 100, required: 80 },
        socialization: { current: 0, required: 0 },
      },
      bonds: [],
      visualGenetics: foalVisualGenetics,
      sire: {
        id: sire._id.toString(),
        name: sire.name,
      },
      dam: {
        id: dam._id.toString(),
        name: dam.name,
      },
      generation: Math.max(sire.generation, dam.generation) + 1,
      birthDate: new Date(),
    });
    
    await foal.save();
    
    // Deduct breeding cost
    await this.usersService.spendMoney(userId, breedingCost);
    
    return foal;
  }

  private async getNextHorseID(): Promise<number> {
    const counter = await this.counterModel.findOneAndUpdate(
      { name: 'horseId' },
      { $inc: { value: 1} },
      { new: true, upsert: true }
    );
  
    return counter.value;
  }
}

