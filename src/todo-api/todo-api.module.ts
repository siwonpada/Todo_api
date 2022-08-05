import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Todo } from 'src/entity/todo.entity';
import { User } from 'src/entity/user.entity';
import { TodoApiController } from './todo-api.controller';
import { TodoApiService } from './todo-api.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User]), AuthModule],
  controllers: [TodoApiController],
  providers: [TodoApiService],
})
export class TodoApiModule {}
