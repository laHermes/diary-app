import React, { useEffect, useState } from 'react';
import { SWRConfig } from 'swr';
import axios from 'axios';
import ToastProvider from './ToastProvider';
import { ThemeProvider } from './ThemeProvider';

interface IProviders {
	children: React.ReactNode;
}

const fetcher = (url: string, withCredentials: boolean = false) =>
	axios.get(url, { withCredentials: withCredentials }).then((res) => res.data);

let isClient = typeof window !== 'undefined';

const Providers = ({ children }: IProviders) => {
	let [isFirstRender, setIsFirstRender] = useState(true);

	// needed for SWRConfig
	useEffect(() => {
		setIsFirstRender(false);
	}, []);

	if (isClient && !isFirstRender) {
		return (
			<SWRConfig
				value={{
					fetcher: fetcher,
				}}>
				<ThemeProvider>
					<ToastProvider>{children}</ToastProvider>
				</ThemeProvider>
			</SWRConfig>
		);
	}

	return null;
};

export default Providers;
