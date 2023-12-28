import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const nextAuthUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXTAUTH_URL
    : process.env.NEXTAUTH_LOCAL_URL;

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
          .post(`${nextAuthUrl}/api/signin`, {
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
        token.id = user.id || profile?.id;

        token.accessToken = account?.access_token;

        token.role = user?.role;

        token.image = profile?.image || (user?.image as string);
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

    // async signIn({ profile, credentials }) {
    //   try {
    //     await connectDatabase();

    //     const userExists = await User.findOne({ email: profile?.email });

    //     if (!userExists) {
    //       await User.create({
    //         email: profile?.email,
    //         name: profile?.name,
    //         image: profile?.image,
    //       });
    //     }
    //     return true;
    //   } catch (error: any) {
    //     return error;
    //   }
    // },

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
