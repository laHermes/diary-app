import tw from 'tailwind-styled-components';

export interface ButtonProps {
	$primary?: boolean;
	$secondary?: boolean;
	$alt?: boolean;
	$positive?: boolean;
	$negative?: boolean;
	$rounded?: boolean;
}

export const StyledButton = tw.button<ButtonProps>`font-medium rounded-lg text-sm px-5 py-2.5 leading-none flex items-center justify-center text-center focus-visible:ring-offset-2 transition-all
${({ $primary }) =>
	$primary &&
	'text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700'}

${({ $secondary }) =>
	$secondary &&
	'text-zinc-900 bg-white hover:bg-zinc-100  border border-zinc-200  hover:text-blue-700 focus:z-10  focus:text-blue-700 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-600 dark:hover:text-white dark:hover:bg-zinc-700'}

${({ $alt }) =>
	$alt &&
	'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 p-2.5'}

${({ $positive }) =>
	$positive &&
	'border-transparent bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-400 dark:text-blue-100 focus-visible:ring-2 focus-visible:ring-blue-500 '}

${({ $negative }) =>
	$negative &&
	'border-transparent bg-red-100 text-red-900 hover:bg-red-200  focus-visible:ring-2 focus-visible:ring-red-500 '}
	
${({ $rounded }) =>
	$rounded &&
	'rounded-full border dark:border-white/20 text-black dark:text-white px-4 text-lg shadow-[0_0_1px_0_rgba(255,255,255,0.2)]'}`;
