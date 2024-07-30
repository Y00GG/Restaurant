import api from "@utils/api";
import type { NextAuthOptions } from "next-auth";
import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			email: string;
			accessToken: string;
		} & DefaultSession["user"];
	}

	interface User extends DefaultUser {
		id: string;
		email: string;
		accessToken: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		email: string;
		accessToken: string;
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				try {
					const res = await api.post<any>("auth/login/", {
						email: credentials?.email,
						password: credentials?.password,
					});

					if (res.status === 200 && res.data) {
						const user = {
							id: res.data.user.id,
							email: res.data.user.email,
							name: res.data.user.email, // Puedes asignar el nombre de usuario si está disponible
							accessToken: res.data.token,
						};
						return user;
					}
					return null;
				} catch (error) {
					console.error("Error in authorization:", error);
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.accessToken = user.accessToken;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
				session.user.accessToken = token.accessToken as string;
			}
			return session;
		},
	},
	secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
