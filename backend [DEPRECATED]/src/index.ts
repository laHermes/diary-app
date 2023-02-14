import 'dotenv/config';
import { app } from './app';
import path from 'path';
import loaders from './loaders/index';
export const jwtPrivateKey = path.resolve('') + '/private_key.pem';
import config from './config/index';
import Logger from './loaders/logger';

const start = () => {
	loaders({ app });
};

// start server
app.listen(config.PORT, () => {
	Logger.info(`Listening on port ${config.PORT}.`);
});

start();
