import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@heroicons/react/outline';

interface GoBackProps {
	path?: string;
}

const GoBack = ({ path }: GoBackProps) => {
	const router = useRouter();

	const handleGoBack = useCallback(() => {
		if (path) {
			router.push(path);
		} else {
			router.back();
		}
	}, [path, router]);

	return (
		<button className='inline-flex gap-2 font-medium' onClick={handleGoBack}>
			<ChevronLeftIcon className='self-center w-4 h-4' />
			<span className='self-center'>Back</span>
		</button>
	);
};

export default GoBack;
