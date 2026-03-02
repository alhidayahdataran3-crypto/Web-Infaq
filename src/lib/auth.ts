import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        if (profile?.email === "alhidayah.dataran3@gmail.com") {
          return true;
        } else {
          // Reject other emails directly by returning false
          return false;
        }
      }
      return false; // Do not allow other providers
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
