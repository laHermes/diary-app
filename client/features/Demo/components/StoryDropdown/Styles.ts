import tw from 'tailwind-styled-components';
import { Menu } from '@headlessui/react';

export const MenuButton = tw(
	Menu.Button
)<any>`font-medium rounded-lg text-sm px-5 py-2.5 leading-none inline-flex items-center justify-center text-center focus-visible:ring-offset-2 transition-all text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700  p-2.5`;
