import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "./auth.service";

jest.mock("argon2");

describe("AuthService", () => {
  const prisma = {
    user: { findUnique: jest.fn(), create: jest.fn() },
  };
  const jwt = { signAsync: jest.fn().mockResolvedValue("access-token") };
  const config = { getOrThrow: jest.fn().mockReturnValue("15m") };
  const service = new AuthService(
    prisma as unknown as PrismaService,
    jwt as unknown as JwtService,
    config as unknown as ConfigService,
  );

  beforeEach(() => jest.clearAllMocks());

  it("returns a token when credentials are valid", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: "user-id",
      email: "employee@example.com",
      name: "홍길동",
      passwordHash: "hash",
      isActive: true,
      phoneNumber: "010-1234-5678",
      memberships: [
        {
          role: "OWNER",
          employmentType: null,
          salaryType: "NONE",
          salaryAmount: null,
          company: { code: "company1", name: "테스트 회사" },
          position: null,
        },
      ],
    });
    jest.mocked(argon2.verify).mockResolvedValue(true);

    const result = await service.login({
      email: "Employee@example.com",
      password: "strong-password",
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { email: "employee@example.com" } }),
    );
    expect(result.accessToken).toBe("access-token");
  });
});
