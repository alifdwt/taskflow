import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    // Simple schema mapping - UUID makes everything compatible
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  secret: process.env.AUTH_SECRET!,
  baseURL: process.env.AUTH_URL!,
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
    cookiePrefix: "taskflow",
  },
  trustedOrigins: [process.env.AUTH_URL!],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
