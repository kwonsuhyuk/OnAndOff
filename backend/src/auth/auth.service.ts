import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email.trim().toLowerCase(),
          passwordHash: await argon2.hash(dto.password),
          name: dto.name.trim(),
        },
        select: { id: true, email: true, name: true, createdAt: true },
      });
      return { user, ...(await this.createAccessToken(user.id, user.email)) };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('이미 가입된 이메일입니다.');
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.trim().toLowerCase() },
    });
    if (!user || !user.isActive || !(await argon2.verify(user.passwordHash, dto.password))) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
    return {
      user: { id: user.id, email: user.email, name: user.name },
      ...(await this.createAccessToken(user.id, user.email)),
    };
  }

  private async createAccessToken(userId: string, email: string) {
    const expiresIn = this.config.getOrThrow<string>('JWT_ACCESS_EXPIRES_IN');
    const accessToken = await this.jwt.signAsync(
      { sub: userId, email },
      { expiresIn: expiresIn as never },
    );
    return { accessToken, tokenType: 'Bearer', expiresIn };
  }
}
