import config from '../config';
import Redis from 'ioredis';
import LoggerInstance from '../loaders/logger';

export const redisCli = async () => {
	let client: Redis;

	try {
		client = new Redis(
			`redis://:${config.REDIS_UPSTASH_TOKEN}@${config.REDIS_UPSTASH_URL}:${config.REDIS_UPSTASH_PORT}`,
			{ connectTimeout: 30000 }
		);

		LoggerInstance.info('Redis started');
	} catch (err) {
		LoggerInstance.error('Redis Error', err);
		process.exit(1);
	}
	return client;
};

export default redisCli;
