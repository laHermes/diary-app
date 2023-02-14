import config from '../config/index';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth2';
import { User } from '../models/user';
import Logger from './logger';

const GoogleStrategy = passportGoogle.Strategy;

export default async () => {
	if (!config.GOOGLE_CLIENT_ID) {
		throw new Error('GOOGLE_CLIENT_ID is undefined');
	}
	if (!config.GOOGLE_CLIENT_SECRET) {
		throw new Error('GOOGLE_CLIENT_SECRET is undefined');
	}

	passport.use(
		new GoogleStrategy(
			{
				clientID: `${config.GOOGLE_CLIENT_ID}`,
				clientSecret: `${config.GOOGLE_CLIENT_SECRET}`,
				callbackURL: '/auth/google/callback',
			},
			function (_: any, __: any, profile: any, cb: any) {
				User.findOne({ email: profile.email }, async (err: Error, doc: any) => {
					if (err) {
						return cb(err, null);
					}
					// TODO: if data is updated
					// or just save googleId and email

					if (!doc) {
						const newUser = new User({
							googleId: profile.id,
							email: profile.email,
							username: profile.name.givenName,
							avatar: profile.picture,
						});

						await newUser.save();

						return cb(null, newUser);
					}
					return cb(null, doc);
				});
			}
		)
	);
	passport.serializeUser((user: any, done: any) => {
		return done(null, user.id);
	});

	passport.deserializeUser((id: string, done: any) => {
		User.findById(id, (err: Error, doc: any) => {
			return done(null, doc);
		});
	});
	Logger.info('Passport started');
};
