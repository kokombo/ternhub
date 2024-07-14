import type { DefaultSession, User, Profile } from "next-auth";
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      accessToken?: string;
      role?: string;
      emailVerified?: boolean;
      authMethod?: string;
    } & DefaultSession["user"];
  }

  interface Profile {
    id?: string;
    role?: string;
    email_verified?: boolean;
  }

  interface User {
    _id?: string;
    accessToken?: string;
    role?: string;
    emailVerified?: boolean;
    authMethod?: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    role?: string;
    image?: string;
    emailVerified?: boolean;
    authMethod?: string;
  }
}
