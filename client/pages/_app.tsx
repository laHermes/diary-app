import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { wrapper } from 'store/store';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Providers from '@providers/Providers';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/globals.css';
import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<ReduxProvider store={store}>
					<Providers>
						<AnimatePresence exitBeforeEnter>
							<motion.div>
								{getLayout(<Component {...rest.props.pageProps} />)}
							</motion.div>
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
