import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { User } from 'src/entity/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'TodoApi',
  password: 'TodoAdmin',
  database: 'TodoDatabase',
  entities: [Todo, User],
};
