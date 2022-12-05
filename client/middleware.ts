export { default } from 'next-auth/middleware';

export const config = {
	matcher: ['/app/:path*', '/api/entries/:path*', '/api/entries/:path*'],
};

// export async function middleware(request: NextRequest) {

// 	const { cookies, url, nextUrl } = request;

// 	const jwtToken = cookies.get('jwt_token');

// 	if (!jwtToken) NextResponse.redirect(new URL('/login', url));

// 	// check if jwt is good
// 	let isUserAuthenticated;
// 	try {
// 		const axiosInstance = axios.create({
// 			adapter: fetchAdapter,
// 			headers: {
// 				authorization: jwtToken || '',
// 			},
// 		});
// 		const { data } = await axiosInstance.get(`${BACKEND_URL}/getuser`, {
// 			withCredentials: true,
// 		});
// 		isUserAuthenticated = !!data.user;
// 	} catch (err) {
// 		NextResponse.redirect(new URL('/login', url));
// 	}

// 	// if user is not authenticated
// 	if (nextUrl.pathname.includes('/app') && !isUserAuthenticated) {
// 		return NextResponse.redirect(new URL('/login', url));
// 	}

// 	// if user is authenticated
// 	if (
// 		(nextUrl.pathname.includes('/login') || nextUrl.pathname === '/') &&
// 		isUserAuthenticated
// 	) {
// 		return NextResponse.redirect(new URL('/app', url));
// 	}
// }
