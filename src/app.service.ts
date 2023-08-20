import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateTweetDto } from './dtos/create-tweet.dto';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  createUser(body: CreateUserDto) {
    const { username, avatar } = body;
    return this.users.push(new User(username, avatar));
  }

  getUsers(): User[] {
    return this.users;
  }

  createTweet(body: CreateTweetDto) {
    const { username, tweet } = body;

    const isUser = this.users.find(user => user.username === username);
    if(!isUser) throw new Error("UNAUTHORIZED")

    return this.tweets.push(new Tweet(isUser, tweet));
  }
}
