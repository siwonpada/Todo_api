import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoApiModule } from './todo-api/todo-api.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './entity/user.entity';
import { Todo } from './entity/todo.entity';
import configuations from './config/configuations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuations],
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: configuations().database.port,
      username: configuations().database.username,
      password: configuations().database.password,
      database: configuations().database.database,
      entities: [Todo, User],
    }),
    TodoApiModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
