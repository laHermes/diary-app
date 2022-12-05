import React, { createContext } from 'react';

const TagsContext = createContext<any>({});

// const useTagsContext = () => {
// 	const context = useContext(TagsContext);

// 	if (!context) {
// 		throw new Error('Tag related components must be used within Tag component');
// 	}
// 	return context;
// };

const value = {};

const Tags = ({ children }: IChildren) => {
	return (
		<TagsContext.Provider value={value}>
			<div className='w-full bg-white divide-y rounded-xl dark:divide-zinc-800 dark:bg-zinc-900'>
				{children}
			</div>
		</TagsContext.Provider>
	);
};

export const Title = ({ children }: IChildren) => {
	return (
		<div className='px-4 pt-4'>
			<p className='font-medium text-left'>{children}</p>
		</div>
	);
};

export const SearchSection = ({ children }: IChildren) => {
	return <div className='flex items-center w-full px-4'>{children}</div>;
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
			className='w-full h-12 text-sm tracking-wider bg-transparent border-0 text-zinc-800 placeholder-zinc-400 focus:ring-0'
			placeholder='Search...'
			{...props}
		/>
	);
};

Tags.Title = Title;
Tags.Input = Input;
Tags.SearchSection = SearchSection;

export default Tags;
