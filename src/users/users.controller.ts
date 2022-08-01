import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUser() {
    return this.usersService.getUser();
  }

  @Post()
  async createUser(@Body() userData: createUserDto) {
    return this.usersService.createUser(userData);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') userId: number,
    @Body() userData: updateUserDto,
  ) {
    return this.usersService.updateUser(userId, userData);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
