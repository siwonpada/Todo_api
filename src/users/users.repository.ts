import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username: username });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id: id });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateRefreshToken(token: string | null, id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: id });
    user.currentHashedRefreshToken = token;
    await this.userRepository.save(user);
  }

  async createUser(
    manager: EntityManager,
    UserData: createUserDto,
  ): Promise<void> {
    const UserToCreate = new User();
    UserToCreate.username = UserData.username;
    UserToCreate.password = UserData.password;
    await manager.save(UserToCreate);
  }

  async updateUser(
    manager: EntityManager,
    UserData: updateUserDto,
    userId: number,
  ): Promise<void> {
    const UserToUpdate = await manager.findOneBy(User, { id: userId });
    UserToUpdate.password = UserData.password;
    await manager.save(UserToUpdate);
  }

  async deleteUser(manager: EntityManager, userId: number): Promise<void> {
    const UserToDelete = await manager.findOne(User, {
      relations: {
        todos: true,
      },
      where: {
        id: userId,
      },
    });
    await manager.remove(UserToDelete.todos);
    await manager.remove(UserToDelete);
  }
}
