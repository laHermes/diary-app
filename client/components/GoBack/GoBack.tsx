import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React from 'react';

interface IGoBack {
	path?: string;
}

const GoBack = ({ path }: IGoBack) => {
	const router = useRouter();

	const handleGoBack = () => {
		path && router.push(path);

		if (window?.history?.state?.idx > 0) {
			router.back();
			return;
		}
	};
	return (
		<button className='inline-flex gap-2 font-medium' onClick={handleGoBack}>
			<ChevronLeftIcon className='self-center w-4 h-4' />
			<span className='self-center'>Back</span>
		</button>
	);
};

export default GoBack;
