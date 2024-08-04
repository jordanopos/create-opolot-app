import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "sonner";
export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Loan360 Account",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const res = await fetch(
            "http://localhost:3000/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
  
          const response = await res.json();

          console.log(response)

          if (res.ok) {
            return response;
          } else {
            toast("that was poor")
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          const access_token = user["access_token"];
          token.token = access_token;
          token.user = user["user"];
        }
        return token;
      },
  
      async session({ session, token, user }) {
        session.user = token.user as any;
        session.access_token = token.token as string
        return session;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  };
  