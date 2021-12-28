import { IsNotEmpty, IsNumberString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

class EnvironmentVariables {
  @IsNotEmpty()
  DATABASE_HOST!: string;

  @IsNotEmpty()
  @IsNumberString()
  DATABASE_PORT!: string;

  @IsNotEmpty()
  DATABASE_USER!: string;

  @IsNotEmpty()
  DATABASE_PASSWORD!: string;

  @IsNotEmpty()
  DATABASE_NAME!: string;

  @IsNotEmpty()
  GOOGLE_APPLICATION_CREDENTIALS!: string;

  @IsNotEmpty()
  FIREBASE_KEY!: string;
}

export function validate(
  config: Record<string, unknown>
): EnvironmentVariables {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
