import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private dataSource: DataSource,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne(username);
  }

  async setCurrentRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<void> {
    await this.userRepository.updateRefreshToken(refreshToken, userId);
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: number,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneById(userId);

    const isRefreshTokenMatching =
      refreshToken === user.currentHashedRefreshToken;

    if (isRefreshTokenMatching) {
      return user;
    }
    return null;
  }

  async removeRefreshToken(userId: number): Promise<void> {
    await this.userRepository.updateRefreshToken(null, userId);
  }

  async getUser(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async createUser(UserData: createUserDto): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      this.userRepository.createUser(manager, UserData);
    });
  }

  async updateUser(userId: number, userData: updateUserDto): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      this.userRepository.updateUser(manager, userData, userId);
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      this.userRepository.deleteUser(manager, userId);
    });
  }
}
