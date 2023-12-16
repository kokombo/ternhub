import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
import { Profile } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      accessToken?: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface Profile {
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
  }
}
