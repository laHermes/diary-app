import React from 'react';
import ToastProvider from './ToastProvider';
import { ThemeProvider } from './ThemeProvider';

interface IProviders {
	children: React.ReactNode;
}

const Providers = ({ children }: IProviders) => {
	return (
		<ThemeProvider>
			<ToastProvider>{children}</ToastProvider>
		</ThemeProvider>
	);
};

export default Providers;
