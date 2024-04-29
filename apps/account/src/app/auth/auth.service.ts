import { Injectable } from '@nestjs/common';
import { User } from '../user/models/user.model';
import { RegisterDto } from './auth.controller';
import { UserRepository } from '../user/repositories/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { UserRole } from '@jiraf/interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ){}

  async register({email,password, displayName}: RegisterDto): Promise<{email: string}> {
    const oldUser = await this.userRepository.findUser(email);
    if(oldUser){
      throw new Error("This user is already registered");
    }
    const newUserEntity = await new UserEntity({
      email,
      displayName,
      passwordHash: '',
      role: UserRole.Student
    }).setPassword(password)
    const newUser = await this.userRepository.createUser(newUserEntity);

    return {email: newUser.email};
  }

  async validateUser(email: string, password: string){
    const user = await this.userRepository.findUser(email);
    if(!user){
      throw new Error("Incorrect email or password");
    }
    const userEntity = await new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if(!isCorrectPassword){
      throw new Error("Incorrect email or password");
    }

    return {id: user._id}
  }

  async login(id: string){
    return {
      access_token: await this.jwtService.signAsync({id})
    }
  }
}
