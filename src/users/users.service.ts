import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { User } from 'src/entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private dataSource: DataSource,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username: username });
  }

  async getUser() {
    return this.userRepository.find();
  }

  async createUser(UserData: createUserDto) {
    await this.dataSource.transaction(async () => {
      const UserToCreate = new User();
      UserToCreate.username = UserData.username;
      UserToCreate.password = UserData.password;
      await this.userRepository.save(UserToCreate);
    });
  }

  async updateUser(userId: number, userData: updateUserDto) {
    await this.dataSource.transaction(async () => {
      const UserToUpdate = await this.userRepository.findOneBy({ id: userId });
      UserToUpdate.password = userData.password;
      await this.userRepository.save(UserToUpdate);
    });
  }

  async deleteUser(userId: number) {
    await this.dataSource.transaction(async () => {
      const UserToDelete = await this.userRepository.findOne({
        relations: {
          todos: true,
        },
        where: {
          id: userId,
        },
      });
      await this.todoRepository.remove(UserToDelete.todos);
      await this.userRepository.remove(UserToDelete);
    });
  }
}
