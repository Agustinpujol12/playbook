// src/auth.config.ts
import Discord from 'next-auth/providers/discord';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID!,
      clientSecret: process.env.AUTH_DISCORD_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user && user.role) {
        (session.user as any).role = user.role;
      }
      return session;
    },
  },
};
