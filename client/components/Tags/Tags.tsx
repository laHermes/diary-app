import React from 'react';

const Tags = ({ children }: IChildren) => {
	return (
		<div className='w-[28rem] divide-y rounded-xl bg-white dark:divide-zinc-800 dark:bg-zinc-900'>
			{children}
		</div>
	);
};

export const Title = ({ children }: IChildren) => {
	return (
		<div className='px-4 pt-4'>
			<p className='text-left font-medium'>{children}</p>
		</div>
	);
};

export const SearchSection = ({ children }: IChildren) => {
	return <div className='flex w-full items-center px-4'>{children}</div>;
};
export const Input = ({
	...props
}: React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>) => {
	return (
		<input
			type='text'
			max={28}
			className='h-12 w-full border-0 bg-transparent text-sm tracking-wider text-zinc-800 placeholder-zinc-400 focus:ring-0'
			placeholder='Search...'
			{...props}
		/>
	);
};

Tags.Title = Title;
Tags.Input = Input;
Tags.SearchSection = SearchSection;

export default Tags;
