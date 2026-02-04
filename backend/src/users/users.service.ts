import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // Check if username or email already exists
    const existingUser = await this.userModel.findOne({
      $or: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (existingUser) {
      if (existingUser.username === createUserDto.username) {
        throw new ConflictException('Username already exists');
      }
      if (existingUser.email === createUserDto.email) {
        throw new ConflictException('Email already exists');
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    // Create user
    const user = new this.userModel({
      username: createUserDto.username,
      email: createUserDto.email,
      passwordHash,
      money: parseInt(process.env.STARTING_MONEY) || 10000,
      currentDay: 1,
      timeRemainingToday: 480, // 8 hours
      trainerSkillLevel: 50, // Start at moderate skill
    });

    return user.save();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username });
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserDto, lastActiveAt: new Date() },
      { new: true },
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async validatePassword(user: UserDocument, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }

  toResponseDto(user: UserDocument): UserResponseDto {
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      money: user.money,
      currentDay: user.currentDay,
      timeRemainingToday: user.timeRemainingToday,
      trainerSkillLevel: user.trainerSkillLevel,
      createdAt: (user as any).createdAt,
      lastActiveAt: user.lastActiveAt,
    };
  }

  async advanceDay(userId: string): Promise<UserDocument> {
    const user = await this.findOne(userId);
    
    user.currentDay += 1;
    user.timeRemainingToday = 480; // Reset to 8 hours
    user.lastActiveAt = new Date();
    
    return user.save();
  }

  async spendTime(userId: string, minutes: number): Promise<UserDocument> {
    const user = await this.findOne(userId);
    
    if (user.timeRemainingToday < minutes) {
      throw new ConflictException('Not enough time remaining today');
    }
    
    user.timeRemainingToday -= minutes;
    user.lastActiveAt = new Date();
    
    return user.save();
  }

  async spendMoney(userId: string, amount: number): Promise<UserDocument> {
    const user = await this.findOne(userId);
    
    if (user.money < amount) {
      throw new ConflictException('Not enough money');
    }
    
    user.money -= amount;
    user.lastActiveAt = new Date();
    
    return user.save();
  }

  async earnMoney(userId: string, amount: number): Promise<UserDocument> {
    const user = await this.findOne(userId);
    
    user.money += amount;
    user.lastActiveAt = new Date();
    
    return user.save();
  }
}
