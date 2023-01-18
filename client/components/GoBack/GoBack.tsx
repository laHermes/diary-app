import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React from 'react';

interface IGoBack {
	path?: string;
}

const GoBack = ({ path }: IGoBack) => {
	const router = useRouter();

	const handleGoBack = () => {
		if (path) {
			router.push(path);
		}
		router.back();
	};
	return (
		<button className='inline-flex gap-2 font-medium' onClick={handleGoBack}>
			<ChevronLeftIcon className='h-4 w-4 self-center' />
			<span className='self-center'>Back</span>
		</button>
	);
};

export default GoBack;
