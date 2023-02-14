export interface IUserPayload {
	googleId: string;
	username: string;
	avatar: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			User: IUserPayload;
		}
	}
}
