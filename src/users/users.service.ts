import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username: username });
  }

  async getUser() {
    return this.userRepository.find();
  }

  async createUser(UserData: createUserDto) {
    const UserToCreate = new User();
    UserToCreate.username = UserData.username;
    UserToCreate.password = UserData.password;
    this.userRepository.save(UserToCreate);
  }

  async updateUser(userId: number, userData: updateUserDto) {
    const UserToUpdate = await this.userRepository.findOneBy({ id: userId });
    UserToUpdate.password = userData.password;
    this.userRepository.save(UserToUpdate);
  }

  async deleteUser(userId: number) {
    const UserToDelete = await this.userRepository.findOneBy({ id: userId });
    this.userRepository.remove(UserToDelete);
  }
}
