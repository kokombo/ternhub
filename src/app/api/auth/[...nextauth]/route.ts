import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { connectDatabase } from "@/database/database";
import User from "@/models/user";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        const res = await axios.post("/api/signin", credentials);

        const user = res.data;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ account, token, profile }) {
      if (account) {
        token.id = profile?.id;

        token.accessToken = account?.access_token;

        token.role = profile?.role;
      }

      return token;
    },

    async session({ token, session }) {
      session.user.id = token.id;

      session.user.accessToken = token.accessToken;

      session.user.role = token.role;

      return session;
    },

    async signIn({ credentials, profile }) {
      if (credentials) {
        try {
          await connectDatabase();

          const user = await User.findOne({
            email: credentials?.email,
          });

          if (user) {
            return user;
          }
          return true;
        } catch (error: any) {
          throw new Error(error);
        }
      }

      if (profile) {
        try {
          await connectDatabase();

          const userExists = await User.findOne({ email: profile.email });

          if (!userExists) {
            await User.create({
              email: profile.email,
              name: profile.name,
              image: profile.image,
            });
          }
          return true;
        } catch (error: any) {
          throw new Error(error);
        }
      }
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

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
