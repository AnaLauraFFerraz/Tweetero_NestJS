import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { TweetWithAvatar } from './entities/tweet.entity';
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

  getHello(): string {
    return "I'm okay!";
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

  getTweets(page: number = 1): TweetWithAvatar[] {
    const itemsPerPage = 15;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
  
    const paginatedTweets = this.tweets.slice(start, end).map((tweet) => {
      const tweetUser = this.users.find(user => user.username === tweet.username);
      return {
        username: tweet.username,
        avatar: tweetUser ? tweetUser.avatar : null,
        tweet: tweet.tweet
      };
    });
  
    return paginatedTweets.reverse();
  }
  

  getTweetsByUser(username: string): TweetWithAvatar[] {
    const UserTweets = this.tweets
      .filter(tweet => tweet.username === username)
      .map((tweet) => {
        const tweetsUser = this.users.find(user => user.username === tweet.username);
        const avatar = tweetsUser ? tweetsUser.avatar : null;
        return { username: tweet.username, avatar, tweet: tweet.tweet };
      });

    return UserTweets.reverse();
  }
}
