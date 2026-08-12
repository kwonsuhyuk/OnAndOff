import { plainToInstance, Type } from 'class-transformer';
import { IsIn, IsInt, IsString, IsUrl, Min, MinLength, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsIn(['development', 'test', 'production'])
  NODE_ENV = 'development';

  @IsInt()
  @Min(1)
  @Type(() => Number)
  PORT = 4000;

  @IsUrl({ protocols: ['postgresql'], require_tld: false })
  DATABASE_URL: string;

  @IsString()
  @MinLength(32)
  JWT_ACCESS_SECRET: string;

  @IsString()
  JWT_ACCESS_EXPIRES_IN = '15m';

  @IsString()
  CORS_ORIGIN = 'http://localhost:3000';
}

export function validateEnvironment(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) throw new Error(errors.toString());
  return validated;
}
