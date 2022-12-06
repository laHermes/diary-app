import useTheme from '@features/Theme/hooks/useTheme';
import MoonIcon from '@icons/MoonIcon';
import SunIcon from '@icons/SunIcon';
import React from 'react';

const ThemeSwitcher = () => {
	const { theme, handleToggleTheme } = useTheme();

	return (
		<button
			onClick={handleToggleTheme}
			className='inline-flex self-center justify-center gap-4 px-4 py-4 transition-all duration-200 rounded-full w-fit hover:bg-zinc-100 hover:dark:bg-zinc-800'>
			{theme === 'light' ? (
				<SunIcon className='w-4 h-4' />
			) : (
				<MoonIcon className='h-4 w-4 fill-accent/50' />
			)}
		</button>
	);
};

export default ThemeSwitcher;
