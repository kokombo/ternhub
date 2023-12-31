import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { connectDatabase } from "@/database/database";
import User from "@/models/user";
import { v4 as uuidv4 } from "uuid";

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
          .post(`${process.env.NEXTAUTH_URL}/api/signin`, {
            email,
            password,
          })
          .then((res) => {
            const user = res.data;

            const { _id, ...otherinfo } = user;

            const modifiedUser = { id: _id, ...otherinfo };

            if (user) {
              return modifiedUser;
            } else {
              return null;
            }
          })
          .catch((error) => {
            throw new Error(error?.response?.data?.message);
          });
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ account, token, profile, user }) {
      if (account) {
        const accountUser = await User.findOne({ email: user?.email });

        token.id = accountUser._id.toString();

        token.accessToken = account?.access_token;

        token.role = accountUser.role;

        token.image = profile?.image || accountUser.image;
      }

      return token;
    },

    async session({ token, session }) {
      session.user.id = token.id;

      session.user.accessToken = token.accessToken;

      session.user.role = token.role;

      session.user.image = token.image;

      return session;
    },

    async signIn({ profile, credentials, account }) {
      if (account?.provider === "google") {
        await connectDatabase();

        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            name: profile?.name,
            email: profile?.email,
            image: profile?.image,
            password: uuidv4(),
            role: profile?.role,
          });
        }
      }

      if (account?.provider === "credentials") {
        await connectDatabase();
        await User.findOne({ email: credentials?.email });
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};
