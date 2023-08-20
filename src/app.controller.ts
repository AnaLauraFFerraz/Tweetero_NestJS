import { Controller, Get, Post, HttpCode, HttpException, Body, Param, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("sign-up")
  @HttpCode(200)
  createUser(@Body() body: CreateUserDto) {
    try {
    return this.appService.createUser(body);  
    } catch (error) {
      throw new HttpException(
        "Não foi possível criar um usuário. Tente novamente!", 
        HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get("users")
  getUsers(): User[] {
    try {
      return this.appService.getUsers();
    } catch (error) {
      throw new Error()
    }
  }
}
