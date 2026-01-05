import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error('❌ Invalid environment variables:', envVars.error.format());
  throw new Error('Invalid environment variables');
}

export const config = {
  env: envVars.data.NODE_ENV,
  port: parseInt(envVars.data.PORT, 10),
  dbUrl: envVars.data.DATABASE_URL,
  jwtSecret: envVars.data.JWT_SECRET,
  smtp: {
    host: envVars.data.SMTP_HOST,
    port: envVars.data.SMTP_PORT ? parseInt(envVars.data.SMTP_PORT, 10) : undefined,
    user: envVars.data.SMTP_USER,
    pass: envVars.data.SMTP_PASS,
    from: envVars.data.SMTP_FROM,
  },
};
