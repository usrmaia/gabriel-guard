import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import { env } from "@/config/env";
import prisma from "./lib/prisma";

export const providers = [
  GoogleProvider({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  }),
  FacebookProvider({
    clientId: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
  }),
];

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: providers,
  adapter: PrismaAdapter(prisma),
  debug: env.NODE_ENV === "development",
});
