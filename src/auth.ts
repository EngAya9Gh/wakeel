import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserRepository } from './repositories/UserRepository';
import bcrypt from 'bcryptjs';

const userRepository = new UserRepository();

export const authConfig: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await userRepository.findByEmail(credentials.email as string);
                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password as string, user.password);
                if (!isValid) return null;

                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role, // Pass role to session
                };
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.role) {
                session.user.role = token.role as string;
            }
            return session;
        }
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.AUTH_SECRET // Ensure this is in .env or generated
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
