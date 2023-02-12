import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { motion, AnimatePresence } from 'framer-motion';
import { NextPage } from 'next';
import { wrapper } from 'store/store';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Providers from '@providers/Providers';
import '../styles/globals.css';
// import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const motionVariants = {
	hidden: { opacity: 0, x: 0, y: 0 },
	enter: {
		opacity: 1,
		transition: {
			delayChildren: 0.5,
		},
	},
	exit: { opacity: 0, x: 0, y: 0 },
};

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{
	session: Session;
}> & {
	Component: NextPageWithLayout;
	data: any;
	user: { username?: string; googleId?: string; id?: string; avatar?: string };
};

const queryClient = new QueryClient();

function MyApp(props: AppPropsWithLayout) {
	const {
		Component,
		pageProps: { session },
	} = props;
	const getLayout = Component.getLayout ?? ((page) => page);
	const { store, ...rest } = wrapper.useWrappedStore(props);
	const router = useRouter();

	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<ReduxProvider store={store}>
					<Providers>
						<AnimatePresence mode='wait'>
							<motion.main
								key={router.route}
								variants={motionVariants}
								initial='hidden'
								animate='enter'
								exit='exit'>
								{getLayout(<Component {...rest.props.pageProps} />)}
							</motion.main>
						</AnimatePresence>
					</Providers>
				</ReduxProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
}

// USED WITH EXPRESS SERVER AND JWT TOKEN
// MyApp.getInitialProps = async (appContext: any) => {
// 	try {
// 		const response = await axios.get(`${BACKEND_URL}/getuser`, {
// 			withCredentials: true,
// 			headers: appContext.ctx.req.headers,
// 		});
// 		let pageProps;
// 		if (appContext.Component.getInitialProps) {
// 			pageProps = await appContext.Component.getInitialProps(
// 				appContext.ctx,
// 				response.data
// 			);
// 		}
// 		return {
// 			pageProps,
// 			user: response.data.user,
// 		};
// 	} catch (e) {
// 		return {} as never;
// 	}
// };

export default wrapper.withRedux(MyApp);
