import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import * as argon2 from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const companyCode = dto.companyCode.trim();
      const existingCompany = await this.prisma.company.findUnique({
        where: { code: companyCode },
      });

      if (dto.position === "employee" && !existingCompany) {
        throw new NotFoundException("일치하는 회사가 없습니다.");
      }
      if (dto.position === "manager" && existingCompany) {
        throw new ConflictException("이미 사용 중인 회사 코드입니다.");
      }

      const user = await this.prisma.$transaction(async tx => {
        const createdUser = await tx.user.create({
          data: {
            email: dto.email.trim().toLowerCase(),
            passwordHash: await argon2.hash(dto.password),
            name: dto.name.trim(),
            phoneNumber: dto.phoneNumber.trim(),
          },
        });
        const company =
          existingCompany ??
          (await tx.company.create({
            data: { code: companyCode, name: `${dto.name.trim()}의 회사` },
          }));
        const membership = await tx.companyMember.create({
          data: {
            companyId: company.id,
            userId: createdUser.id,
            role: dto.position === "manager" ? "OWNER" : "EMPLOYEE",
          },
          include: { company: true, position: true },
        });
        return { ...createdUser, memberships: [membership] };
      });
      return {
        user: this.toAuthUser(user),
        ...(await this.createAccessToken(user.id, user.email)),
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictException("이미 가입된 이메일입니다.");
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.trim().toLowerCase() },
      include: {
        memberships: { where: { leftAt: null }, include: { company: true, position: true } },
      },
    });
    if (!user || !user.isActive || !(await argon2.verify(user.passwordHash, dto.password))) {
      throw new UnauthorizedException("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
    return {
      user: this.toAuthUser(user),
      ...(await this.createAccessToken(user.id, user.email)),
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        memberships: { where: { leftAt: null }, include: { company: true, position: true } },
      },
    });
    if (!user) throw new UnauthorizedException("유효하지 않은 사용자입니다.");
    return this.toAuthUser(user);
  }

  async validateCompanyCode(code: string) {
    const company = await this.prisma.company.findUnique({
      where: { code: code.trim() },
      select: { code: true, name: true },
    });
    if (!company) throw new NotFoundException("일치하는 회사가 없습니다.");
    return { companyCode: company.code, companyName: company.name };
  }

  private toAuthUser(user: {
    id: string;
    email: string;
    name: string;
    phoneNumber: string | null;
    memberships: Array<{
      role: "OWNER" | "MANAGER" | "EMPLOYEE";
      employmentType: string | null;
      salaryType: string;
      salaryAmount: Prisma.Decimal | null;
      company: { code: string; name: string };
      position: { name: string } | null;
    }>;
  }) {
    const membership = user.memberships[0];
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber ?? "",
      companyCode: membership?.company.code ?? "",
      companyName: membership?.company.name ?? "",
      userType: membership?.role === "EMPLOYEE" ? "employee" : "manager",
      jobName: membership?.position?.name ?? "",
      employmentType: membership?.employmentType ?? undefined,
      salaryType: membership?.salaryType ?? "NONE",
      salaryAmount: membership?.salaryAmount ? Number(membership.salaryAmount) : 0,
    };
  }

  private async createAccessToken(userId: string, email: string) {
    const expiresIn = this.config.getOrThrow<string>("JWT_ACCESS_EXPIRES_IN");
    const accessToken = await this.jwt.signAsync(
      { sub: userId, email },
      { expiresIn: expiresIn as never },
    );
    return { accessToken, tokenType: "Bearer", expiresIn };
  }
}
