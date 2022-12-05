import PenLineIcon from '@icons/PenLineIcon';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const FloatingWrite = () => {
	const TARGET = '/entry';
	const router = useRouter();

	const { status } = useSession();

	const handleRedirect = () => {
		const prefix = status === 'authenticated' ? '/app' : '/demo';
		router.push(prefix + TARGET);
	};

	return (
		<button
			onClick={() => handleRedirect()}
			className='fixed p-4 transition-all duration-200 bg-indigo-800 rounded-full shadow-2xl bottom-14 right-5 drop-shadow-md hover:bg-indigo-900 md:bottom-5 md:bottom-20 '>
			<PenLineIcon className='stroke-zinc-100' />
		</button>
	);
};

export default FloatingWrite;
