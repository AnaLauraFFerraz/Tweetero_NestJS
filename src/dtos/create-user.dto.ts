import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsUrl({require_protocol: true})
  avatar: string;
}