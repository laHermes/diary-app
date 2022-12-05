import React from 'react';
import { Toaster } from 'react-hot-toast';

interface IToastProvider {
	children: React.ReactNode;
}
const ToastProvider = ({ children }: IToastProvider) => {
	return (
		<>
			<Toaster position='top-right' reverseOrder={false} />
			{children}
		</>
	);
};

export default ToastProvider;
