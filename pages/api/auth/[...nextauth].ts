import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "db"

// const prisma = new PrismaClient()

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
       server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
              user: process.env.EMAIL_SERVER_USER,
              pass: process.env.EMAIL_SERVER_PASSWORD
            }
       },
       from: process.env.EMAIL_FROM,
       }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async session({session, token, user}) {
      // console.log({session, token, user} );
      if (user.email.split("@")[0] == process.env.ADMIN_USER) {
        session["user"]["role"] = "admin";
      }
      return session;
    },
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
})
