import dotenv from 'dotenv';

// Set the NODE_ENV to development by default
const NODE_ENV = process.env.NODE_ENV || 'dev';

// const envFound = dotenv.config({ path: '../../.env' });

if (NODE_ENV !== 'prod') {
	const envFound = dotenv.config();

	if (envFound.error) {
		throw new Error('Could not find .env file');
	}
}

export default {
	CLIENT_URL:
		NODE_ENV !== 'dev'
			? (process.env.CLIENT_URL as string)
			: (process.env.LOCAL_CLIENT_URL as string) || 'http://localhost:3000',
	CLIENT_DOMAIN:
		NODE_ENV !== 'dev'
			? (process.env.CLIENT_DOMAIN as string)
			: (process.env.LOCAL_CLIENT_DOMAIN as string) || '.localhost',

	MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT,
	SESSION_SECRET: process.env.SESSION_SECRET,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	JWT_KEY: process.env.JWT_KEY as string,
	LOGS: {
		LEVEL: process.env.LOG_LEVEL || 'silly',
	},
	REDIS_UPSTASH_URL: process.env.REDIS_UPSTASH_URL,
	REDIS_UPSTASH_TOKEN: process.env.REDIS_UPSTASH_TOKEN,
	REDIS_UPSTASH_PORT: +(process.env.REDIS_UPSTASH_PORT as string),
	UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL as string,
	UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN as string,
};
