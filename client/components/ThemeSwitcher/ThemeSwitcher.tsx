import useTheme from '@hooks/useTheme';
import MoonIcon from '@icons/MoonIcon';
import SunIcon from '@icons/SunIcon';
import React from 'react';
import { ThemeSwitcherButton } from './Styles';

const ThemeSwitcher = () => {
	const { theme, handleToggleTheme } = useTheme();

	const Icon = () =>
		theme === 'light' ? (
			<SunIcon className='h-4 w-4' />
		) : (
			<MoonIcon className='h-4 w-4 fill-accent/50' />
		);

	return (
		<ThemeSwitcherButton onClick={handleToggleTheme}>
			<Icon />
		</ThemeSwitcherButton>
	);
};

export default ThemeSwitcher;
