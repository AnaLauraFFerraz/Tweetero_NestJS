import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "All fields are required!" })
  username: string;

  @IsNotEmpty({ message: "All fields are required!" })
  @IsUrl({require_protocol: true})
  avatar: string;
}