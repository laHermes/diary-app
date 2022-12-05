import { Menu } from '@headlessui/react';
import tw from 'tailwind-styled-components';

interface IStyledMenuItemButton {
	$active?: boolean;
}
export const StyledMenu = tw(
	Menu
)<any>`relative inline-block text-left self-center`;

export const StyledMenuButton = tw(
	Menu.Button
)<any>` inline-flex w-full justify-center rounded-[12px] px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`;

export const StyledMenuItems = tw(
	Menu.Items
)<any>` absolute right-0 mt-2 w-56 origin-top-right divide-y divide-zinc-100 rounded-[12px] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-900 border border-white/20`;

export const StyledMenuItemsSection = tw.div<any>`px-1 py-1 dark:bg-zinc-900 rounded-[12px]`;

export const StyledMenuItemButton = tw.button<
	IStyledMenuItemButton | any
>` group flex w-full items-center gap-3 rounded-[12px] px-4 py-3 text-lg font-medium dark:text-white hover:bg-zinc-800 ${({
	$active,
}) => ($active ? 'text-white' : 'text-zinc-900')}`;
