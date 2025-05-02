import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DB_PATH: z.string(),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.string().default('3050'),
  DB_USER: z.string().default('SYSDBA'),
  DB_PWD: z.string().default('masterkey'),
  SERVER_PORT: z.string().default('3333'),
  MIN_MESAS: z.string().default('25'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Environment variables not set correctly.', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
