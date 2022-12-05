const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV || 'development';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const DEV_BACKEND_URL =
	process.env.NEXT_PUBLIC_DEV_BACKEND_URL || 'http://localhost:5000';

const BACKEND_URL =
	NODE_ENV === 'development'
		? DEV_BACKEND_URL
		: process.env.NEXT_PUBLIC_BACKEND_URL;

const SIGN_OUT_CALLBACK_URL =
	NODE_ENV === 'development'
		? 'http://localhost:3000'
		: process.env.NEXT_SIGN_OUT_CALLBACK_URL;

export { BASE_URL, BACKEND_URL, SIGN_OUT_CALLBACK_URL };
