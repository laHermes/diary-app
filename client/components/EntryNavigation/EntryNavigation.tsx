import React, { ReactNode } from 'react';

const EntryNavigation = ({ children }: { children: ReactNode }) => {
	return (
		<div className='fixed bottom-0 left-0 w-screen md:px-5 drop-shadow-2xl'>
			<div className='flex items-center h-12 md:h-fit justify-end w-full max-w-screen-md bg-zinc-800 mx-auto rounded-t-2xl overflow-hidden'>
				{children}
			</div>
		</div>
	);
};

const Action = ({
	children,
	onClick = () => {},
}: {
	children: ReactNode;
	onClick?: Function;
}) => {
	return (
		<button
			onClick={() => onClick()}
			className='flex-1 inline-flex justify-center px-1 py-3 text-left hover:bg-zinc-700'>
			{children}
		</button>
	);
};

EntryNavigation.Action = Action;

export default EntryNavigation;
