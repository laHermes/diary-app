import Button from '@components/Elements/Button/Button';
import MoonIcon from '@icons/MoonIcon';
import SunIcon from '@icons/SunIcon';
import React from 'react';
import useTheme from '../hooks/useTheme';

const ChangeThemeButton = () => {
	const { theme, handleToggleTheme } = useTheme();

	return (
		<Button $alt onClick={handleToggleTheme} role='change-theme'>
			{theme === 'light' ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
};

export default ChangeThemeButton;
