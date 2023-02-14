import tw from 'tailwind-styled-components';
import { Flex } from '@styles/styles';

export const SearchInputWrapper = tw(
	Flex
)<any>`px-4 py-2 rounded-xl bg-zinc-50 dark:bg-cardDark`;
export const SearchInput = tw.input<any>`w-full h-12 text-lg bg-transparent border-0 placeholder-zinc-400 ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 dark:text-zinc-200`;

export const FiltersSection = tw.div<any>`grid gap-2 -mt-6 sm:grid-cols-2`;
export const FiltersSectionItem = tw(
	Flex
)<any>`max-w-1/2 flex-col items-start gap-4`;
export const FiltersSectionTitle = tw.span<any>`text-base uppercase`;

export const CloseButton = tw.button<any>`inline-flex justify-center gap-3 px-2 py-2 transition-all duration-200 rounded-full hover:bg-zinc-100 hover:dark:bg-zinc-800 md:justify-start`;
