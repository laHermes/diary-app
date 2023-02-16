import clsx from 'clsx';
import React, { ReactNode } from 'react';

const EntryNavigation = ({ children }: { children: ReactNode }) => {
	return (
		<div className='fixed bottom-0 left-0 w-screen drop-shadow-2xl md:px-5'>
			<div className='flex items-center justify-end w-full h-12 max-w-screen-md mx-auto overflow-hidden rounded-t-2xl bg-zinc-800 md:h-fit'>
				{children}
			</div>
		</div>
	);
};

type ActionProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

const Action = ({
	children,
	onClick = () => {},
	className,
	...props
}: ActionProps) => {
	return (
		<button
			onClick={onClick}
			className={clsx(
				'inline-flex flex-1 justify-center px-1 py-3 text-left hover:bg-zinc-700',
				className
			)}
			{...props}>
			{children}
		</button>
	);
};

EntryNavigation.Action = Action;

export default EntryNavigation;
