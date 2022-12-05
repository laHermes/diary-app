import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React from 'react';

const GoBack = () => {
	const router = useRouter();

	const handleGoBack = () => {
		router.back();
	};
	return (
		<button className='font-medium inline-flex gap-2' onClick={handleGoBack}>
			<ChevronLeftIcon className='w-4 h-4 self-center' />
			<span className='self-center'>Back</span>
		</button>
	);
};

export default GoBack;
