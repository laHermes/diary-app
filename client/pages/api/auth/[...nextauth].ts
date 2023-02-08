import NextAuth, { SessionStrategy } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@lib/mongodb';

//todo add redis adapter
export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),
	secret: process.env.NEXTAUTH_SECRET as string,
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
		}),
	],
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt' as SessionStrategy,
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET as string,
		encryption: false,
	},
	callbacks: {
		async signIn() {
			// TODO: only if profile is verified
			return true;
		},
		async jwt({ token }: any) {
			return token;
		},
		async redirect({ url, baseUrl }: any) {
			// // Allows relative callback URLs
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			// // Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;

			return baseUrl;
		},
	},
};
export default NextAuth(authOptions);
