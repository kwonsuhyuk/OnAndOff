import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'employee@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 10, example: 'strong-password' })
  @IsString()
  @MinLength(10)
  @MaxLength(72)
  password: string;

  @ApiProperty({ example: '홍길동' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
