/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions, User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    idToken?: string | null;
    accessToken?: string | null;
  }
}

interface ExtendedUser extends User {
  tokens?: {
    access?: { token?: string };
    refresh?: { token?: string };
  };
}

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Missing credentials');
        }

        try {
          const formData = new URLSearchParams();
          formData.append('email', credentials.email);
          formData.append('password', credentials.password);

          const response = await axios.post('http://localhost:3000/v1/auth/login', formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          });

          const user = response.data;

          if (response.status === 200 && user) {
            return user; // Return the user object if login is successful
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          const err = error as any;
          console.error('Login error:', err.response?.data || err.message);
          throw new Error(err.response?.data?.message || 'Login failed');
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: '/login', // Custom login page
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Handle token for Google login
      if (account?.provider === 'google' && account.id_token) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;

        try {
          await axios.post('http://localhost:3000/v1/auth/google-login', {
            token: account.id_token,
          });
        } catch (error) {
          console.error('Error in Google login:', error);
        }
      }

      // Handle token for Credentials login
      if (user) {
        token.accessToken = (user as ExtendedUser).tokens?.access?.token || token.accessToken;
        token.refreshToken = (user as ExtendedUser).tokens?.refresh?.token || token.refreshToken;
        token.user = user;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = typeof token.accessToken === 'string' ? token.accessToken : null;
      session.idToken = typeof token.idToken === 'string' ? token.idToken : null;
      session.user = (token.user as User) || null; // Attach user data to the session
      return session;
    },
  },

  session: {
    strategy: 'jwt', // Use JWT for session management
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    // Removed 'encryption' as it is not a valid property
  },
};

export default authOptions;