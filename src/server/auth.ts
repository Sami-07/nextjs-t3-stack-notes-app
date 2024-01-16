import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       // ...other properties
//       // role: UserRole;
//     } & DefaultSession["user"];
//   }

//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
// }

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {

  pages:
  {
    signIn: "/signin"
  },
  // adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const userFound = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });

          if (userFound) {
           
            const passwordMatch = await bcrypt.compare(credentials.password, userFound.password!);

            if (passwordMatch) {
          
              return userFound;
            }
          }
        }
        catch (error) {
          console.log(error);
        }
        return null;

      }
    }),

  ],
  callbacks: {


    jwt: async ({ token, user }) => {
   
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        // here, this is not an error. It is working as expected.
      }
      return token;
    },
    session: async ({ session, user, token }) => {



      session.user = token;
      return session;
    },
    // session: async ({ session, user }) => {
    //   console.log('User:', user);
    //   console.log('Session:', session);
    //   return {
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: user.id,
    //     },
    //   };
    // },
  },
  
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
