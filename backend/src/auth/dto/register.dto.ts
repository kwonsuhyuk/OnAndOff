import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: "employee@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 10, example: "strong-password" })
  @IsString()
  @MinLength(10)
  @MaxLength(72)
  password: string;

  @ApiProperty({ example: "홍길동" })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: "010-1234-5678" })
  @IsString()
  @MaxLength(30)
  phoneNumber: string;

  @ApiProperty({ enum: ["manager", "employee"] })
  @IsIn(["manager", "employee"])
  position: "manager" | "employee";

  @ApiProperty({ example: "Ab12Cd34", description: "관리자는 새 코드, 직원은 기존 회사 코드" })
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  companyCode: string;
}
