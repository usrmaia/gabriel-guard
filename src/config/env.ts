import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  NEXT_PUBLIC_APP_URL: z.string().url(),

  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
  FACEBOOK_CLIENT_ID: z.string().min(1, "FACEBOOK_CLIENT_ID is required"),
  FACEBOOK_CLIENT_SECRET: z
    .string()
    .min(1, "FACEBOOK_CLIENT_SECRET is required"),
});

function validateEnv(_data: any) {
  const { success, data, error } = envSchema.safeParse(_data);

  if (!success)
    throw new Error(`❌ Invalid environment variables: ${error.message}`);

  return data;
}

export const env = validateEnv(process.env);
