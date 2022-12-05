import React, { useContext, useState, createContext, useEffect } from 'react';

type ThemeProps = {
	children?: React.ReactNode;
};

// light theme is the DEFAULT Theme
export enum THEME {
	DEFAULT = 'light',
	DARK = 'dark',
}

export const OPPOSITE_THEME = {
	[THEME.DEFAULT]: THEME.DARK,
	[THEME.DARK]: THEME.DEFAULT,
};

type ThemeType = THEME.DEFAULT | THEME.DARK;

// Document attribute name that sets theme
const ATTRIBUTE_NAME = 'data-mode';

// LocalStorage key where theme value is persisted
const LOCAL_STORAGE_KEY = 'theme';

const ThemeContext = createContext<Partial<any>>({});
const ThemeProvider: React.FC<ThemeProps> = ({ children }) => {
	const [themeValue, setThemeValue] = useState<string>(THEME.DEFAULT);

	useEffect(() => {
		setTheme({ themeValue: getTheme() });
	}, []);

	const getTheme = (): ThemeType => {
		const themeLS = localStorage.getItem(LOCAL_STORAGE_KEY) as THEME;
		const themeDoc = document.documentElement.getAttribute(
			ATTRIBUTE_NAME
		) as THEME;

		// checks wether theme value in localStorage or document exists/ is compatible with THEME enum
		// if NOT return default light theme
		return Object.values(THEME).includes(themeLS)
			? themeLS
			: Object.values(THEME).includes(themeDoc)
			? themeDoc
			: THEME.DEFAULT;
	};

	const setTheme = ({ themeValue }: { themeValue: ThemeType }) => {
		document.documentElement.setAttribute(ATTRIBUTE_NAME, themeValue);
		localStorage.setItem(LOCAL_STORAGE_KEY, themeValue);

		setThemeValue(themeValue);
	};

	const handleToggleTheme = () => {
		setTheme({ themeValue: OPPOSITE_THEME[getTheme()] });
	};

	return (
		<ThemeContext.Provider
			value={{ theme: themeValue, setThemeValue, handleToggleTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
export const useTheme = () => useContext(ThemeContext);
export const ThemeConsumer = ThemeContext.Consumer;
export { ThemeProvider };
export default ThemeContext;
