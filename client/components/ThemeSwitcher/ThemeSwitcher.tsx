import useTheme from '@features/Theme/hooks/useTheme';
import MoonIcon from '@icons/MoonIcon';
import SunIcon from '@icons/SunIcon';
import React from 'react';

const ThemeSwitcher = () => {
	const { theme, handleToggleTheme } = useTheme();

	return (
		<button
			onClick={handleToggleTheme}
			className='self-center inline-flex justify-center w-fit gap-4 px-4 py-4  rounded-full hover:bg-zinc-100 hover:dark:bg-zinc-800 transition-all duration-200'>
			{theme === 'light' ? (
				<SunIcon className='w-4 h-4' />
			) : (
				<MoonIcon className='w-4 h-4' />
			)}
		</button>
	);
};

export default ThemeSwitcher;
