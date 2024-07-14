import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { connectDatabase } from "@/database/database";
import User from "@/models/user";
import type { User as AuthUser } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        return await axios
          .post(
            `${process.env.NEXTAUTH_URL}/api/signin`,
            {
              email,
              password,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            const user: AuthUser = res.data;
            const { _id, id, ...otherInfo } = user;
            const modifiedUser = { ...otherInfo, id: user._id as string };

            if (user) {
              return modifiedUser;
            }

            return null;
          })
          .catch((error) => {
            throw new Error(error?.response?.data?.message);
          });
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 2592000,
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ account, token, user, trigger, session }) {
      if (trigger === "signIn") {
        if (account) {
          await connectDatabase();
          const accountUser = await User.findOne({ email: user?.email });

          token.id = accountUser._id.toString();
          token.accessToken = account?.access_token;
          token.role = accountUser.role;
          token.authMethod = accountUser.authMethod;
          token.image = accountUser.image;
          token.emailVerified = accountUser.emailVerified;
        }
      }

      if (trigger === "update") {
        await connectDatabase();
        const accountUser = await User.findOne({ email: token?.email });

        token.emailVerified = accountUser.emailVerified;
        token.image = accountUser.image;
      }
      return token;
    },

    async session({ token, session }) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      session.user.role = token.role;
      session.user.image = token.image;
      session.user.emailVerified = token.emailVerified;
      session.user.authMethod = token.authMethod;

      return session;
    },

    async signIn({ profile, account }) {
      if (account?.provider !== "credentials") {
        await connectDatabase();
        const existingUser = await User.findOne({ email: profile?.email });

        if (!existingUser) {
          await User.create({
            name: profile?.name,
            email: profile?.email,
            image: profile?.image,
            role: profile?.role,
            authMethod: account?.provider,
            emailVerified: profile?.email_verified,
          });
        }
      }

      return true;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};
