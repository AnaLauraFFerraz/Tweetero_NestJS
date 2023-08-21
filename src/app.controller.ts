import { Controller, Get, Post, HttpCode, HttpException, Body, HttpStatus, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { User } from './entities/user.entity';
import { TweetWithAvatar } from './entities/tweet.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("sign-up")
  @HttpCode(200)
  createUser(@Body() body: CreateUserDto) {
    try {
      return this.appService.createUser(body);  
    } catch (error) {
      throw new HttpException(
        "Could not create user. Try again", 
        HttpStatus.CONFLICT)
    }
  }

  @Get("users")
  getUsers(): User[] {
    try {
      return this.appService.getUsers();
    } catch (error) {
      throw new Error(error)
    }
  }

  @Post("tweets")
  createTweet(@Body() body: CreateTweetDto) {
    try {
      return this.appService.createTweet(body);
    } catch (error) {
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }
  }

  @Get("tweets")
  getTweets(@Query("page") page: string): TweetWithAvatar[] {
    if (page) {
      const pageNum = parseInt(page);
      if (pageNum < 1 || isNaN(pageNum)) {
        throw new HttpException("Invalid page", HttpStatus.BAD_REQUEST);
      }
      return this.appService.getTweets(pageNum);
    }

    try {
      return this.appService.getTweets();
    } catch (error) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
  }


  @Get("tweets/:username")
  getTweetsByUser(@Param("username") username: string): TweetWithAvatar[] {
    try {
      return this.appService.getTweetsByUser(username);
    } catch (error) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST)
    }
  }
}
