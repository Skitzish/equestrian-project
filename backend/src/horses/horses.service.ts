import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Horse, HorseDocument } from './schemas/horse.schema';
import { CreateStarterHorseDto, TrainHorseDto, HorseResponseDto } from './dto/horse.dto';
import { UsersService } from '../users/users.service';
import { Counter, CounterDocument } from '../common/schemas/counter.schema';
import { generateRandomVisualGenetics } from '../../../shared';

// Import shared game logic
import {
  generateRandomGenes,
  generateRandomPersonality,
  applyTraining,
  validateSkillTraining,
  calculateDailyMood,
  reduceFatigue,
  calculateSatisfactionRequirements,
  resetDailySatisfaction,
  addSatisfaction,
  calculateTrainingSatisfaction,
  getSkill,
  SKILLS,
} from '../../../shared';

@Injectable()
export class HorsesService {
  constructor(
    @InjectModel(Horse.name) private horseModel: Model<HorseDocument>,
    @InjectModel(Counter.name) private CounterModel: Model<CounterDocument>,
    private usersService: UsersService,
  ) {}

  private async getNextHorseId(): Promise<number> {
    const counter = await this.CounterModel.findOneAndUpdate(
      { name: 'horseId' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    return counter.value;
  }

  async create(userId: string, createHorseDto: CreateStarterHorseDto): Promise<HorseDocument> {
    const user = await this.usersService.findOne(userId);
    
    // Check stable capacity
    const horseCount = await this.horseModel.countDocuments({ ownerId: user._id });
    const maxStableSize = parseInt(process.env.MAX_STABLE_SIZE) || 10;
    
    if (horseCount >= maxStableSize) {
      throw new ConflictException(`Stable is full (max ${maxStableSize} horses)`);
    }

    // Generate genes using shared module
    const minPotential = createHorseDto.minPotential || 50;
    const maxPotential = createHorseDto.maxPotential || 80;
    const genes = generateRandomGenes(minPotential, maxPotential);
    const personality = generateRandomPersonality();

    const horseId = await this.getNextHorseId();

    const visualGenetics = generateRandomVisualGenetics();

    // Create horse
    const horse = new this.horseModel({
      horseId,
      name: createHorseDto.name,
      age: 3, // Starter horses are 3 years old (training age)
      gender: createHorseDto.gender,
      ownerId: user._id,
      genes,
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
        personality,
        mood: 'Calm',
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
      visualGenetics,
      generation: 0,
      birthDate: new Date(),
    });

    return horse.save();
  }

  async findAll(userId: string): Promise<HorseDocument[]> {
    const user = await this.usersService.findOne(userId);
    return this.horseModel.find({ ownerId: user._id }).exec();
  }

  async findOne(id: string, userId: string): Promise<HorseDocument> {
    const user = await this.usersService.findOne(userId);
    const horse = await this.horseModel.findOne({ 
      horseId: parseInt(id),
       ownerId: user._id 
      });
    
    if (!horse) {
      throw new NotFoundException('Horse not found');
    }
    
    return horse;
  }

  async train(userId: string, trainDto: TrainHorseDto): Promise<any> {
    // Get horse
    const horse = await this.findOne(trainDto.horseId, userId);
    
    // Get user (trainer)
    const user = await this.usersService.findOne(userId);
    
    // Check if user has enough time
    if (user.timeRemainingToday < trainDto.duration) {
      throw new BadRequestException('Not enough time remaining today');
    }
    
    // Get skill definition
    const skillDef = getSkill(trainDto.skillId);
    if (!skillDef) {
      throw new BadRequestException(`Skill ${trainDto.skillId} not found`);
    }
    
    // Convert horse to shared module format
    const sharedHorse: any = {
      id: horse._id.toString(),
      name: horse.name,
      age: horse.age,
      gender: horse.gender,
      ownerId: horse.ownerId.toString(),
      genes: horse.genes,
      training: horse.training,
      skills: Object.fromEntries(horse.skills),
      mentalState: horse.mentalState,
      housing: horse.housing,
      satisfaction: horse.satisfaction,
      bonds: horse.bonds,
      sire: horse.sire,
      dam: horse.dam,
      generation: horse.generation,
      birthDate: horse.birthDate,
    };
    
    // Validate training using shared module
    const validation = validateSkillTraining(sharedHorse, trainDto.skillId);
    if (!validation.canTrain) {
      throw new BadRequestException(validation.reason);
    }
    
    // Create trainer object
    const trainer = {
      id: user._id.toString(),
      name: user.username,
      skillLevel: user.trainerSkillLevel,
    };
    
    // Apply training using shared module
    const result = applyTraining(
      sharedHorse,
      trainDto.skillId,
      trainDto.duration as any,
      trainer,
    );
    
    // Update horse in database
    const currentSkillLevel = horse.skills.get(trainDto.skillId) || 0;
    horse.skills.set(trainDto.skillId, Math.max(0, Math.min(100, currentSkillLevel + result.skillGained)));
    
    // Update stats
    for (const [stat, gain] of Object.entries(result.statsGained)) {
      const currentTraining = horse.training[stat as keyof typeof horse.training] || 0;
      horse.training[stat as keyof typeof horse.training] = Math.min(1.0, currentTraining + (gain as number));
    }
    
    // Update fatigue
    horse.mentalState.fatigue = Math.min(100, horse.mentalState.fatigue + result.fatigueGained);
    
    // Update mood if changed
    if (result.moodChanged && result.newMood) {
      if (result.newMood === 'Confused') {
        horse.mentalState.previousMood = horse.mentalState.mood;
        horse.mentalState.previousSkill = trainDto.skillId;
      }
      horse.mentalState.mood = result.newMood;
    }
    
    // Update satisfaction
    const satisfactionGained = calculateTrainingSatisfaction(
      trainDto.skillId,
      trainDto.duration,
      skillDef.isPhysical,
    );
    
    horse.satisfaction.exercise.current = Math.min(
      100,
      horse.satisfaction.exercise.current + satisfactionGained.exercise,
    );
    horse.satisfaction.stimulation.current = Math.min(
      100,
      horse.satisfaction.stimulation.current + satisfactionGained.stimulation,
    );
    horse.satisfaction.socialization.current = Math.min(
      100,
      horse.satisfaction.socialization.current + satisfactionGained.socialization,
    );
    
    await horse.save();
    
    // Deduct time from user
    await this.usersService.spendTime(userId, trainDto.duration);
    
    return {
      success: result.success,
      skillGained: result.skillGained,
      newSkillLevel: horse.skills.get(trainDto.skillId),
      statsGained: result.statsGained,
      fatigueGained: result.fatigueGained,
      moodChanged: result.moodChanged,
      newMood: result.newMood,
      message: result.message,
      timeRemaining: user.timeRemainingToday - trainDto.duration,
    };
  }

  async rename(id: string, userId: string, newName: string): Promise<HorseDocument> {
    const horse = await this.findOne(id, userId);

    horse.name = newName;
    await horse.save();

    return horse;
  }

  async updateHousing(id: string, userId: string, housing: string): Promise<HorseDocument> {
    const horse = await this.findOne(id, userId);
    
    horse.housing = housing;
    
    // Recalculate satisfaction requirements using shared module
    const sharedHorse: any = {
      ...horse.toObject(),
      id: horse._id.toString(),
      ownerId: horse.ownerId.toString(),
      skills: Object.fromEntries(horse.skills),
    };
    
    const newSatisfaction = calculateSatisfactionRequirements(sharedHorse);
    horse.satisfaction = newSatisfaction;
    
    return horse.save();
  }

  async advanceDay(userId: string): Promise<any> {
    const user = await this.usersService.findOne(userId);
    const horses = await this.findAll(userId);
    
    const updates = [];
    
    for (const horse of horses) {
      // Convert to shared format
      const sharedHorse: any = {
        ...horse.toObject(),
        id: horse._id.toString(),
        ownerId: horse.ownerId.toString(),
        skills: Object.fromEntries(horse.skills),
      };
      
      // Calculate new mood using shared module
      const newMood = calculateDailyMood(sharedHorse);
      horse.mentalState.mood = newMood;
      
      // Reduce fatigue
      const newFatigue = reduceFatigue(horse.mentalState.fatigue, 20);
      horse.mentalState.fatigue = newFatigue;
      
      // Reset satisfaction
      const resetSatisfaction = resetDailySatisfaction(horse.satisfaction);
      horse.satisfaction = resetSatisfaction;
      
      // Age horses once per year (365 days)
      if ((user.currentDay + 1) % 365 === 0) {
        horse.age += 1;
      }
      
      await horse.save();
      
      updates.push({
        horseId: horse._id,
        horseName: horse.name,
        newMood,
        newFatigue,
      });
    }
    
    // Advance user day
    await this.usersService.advanceDay(userId);
    
    // Deduct daily stable costs
    const dailyCost = horses.length * (parseInt(process.env.DAILY_STABLE_COST_PER_HORSE) || 10);
    if (user.money >= dailyCost) {
      await this.usersService.spendMoney(userId, dailyCost);
    }
    
    return {
      newDay: user.currentDay + 1,
      dailyCost,
      horseUpdates: updates,
    };
  }

  toResponseDto(horse: HorseDocument): HorseResponseDto {
    return {
      id: horse.horseId.toString(),
      name: horse.name,
      age: horse.age,
      gender: horse.gender,
      genes: horse.genes,
      training: horse.training,
      skills: Object.fromEntries(horse.skills),
      mentalState: horse.mentalState,
      housing: horse.housing,
      satisfaction: horse.satisfaction,
      bonds: horse.bonds,
      visualGenetics: horse.visualGenetics,
      sire: horse.sire,
      dam: horse.dam,
      generation: horse.generation,
      birthDate: horse.birthDate,
      createdAt: (horse as any).createdAt,
      updatedAt: (horse as any).updatedAt,
    };
  }
}
