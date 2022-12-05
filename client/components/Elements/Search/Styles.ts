import tw from 'tailwind-styled-components';

export const SearchContainer = tw.div<any>`relative w-full`;
export const SearchIconWrapper = tw.div<any>`flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none`;
export const SearchInput = tw.input<any>`w-full p-2.5 pl-10 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:border-blue-500 block  dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white  dark:focus:border-blue-500`;

export const ClearSearchButton = tw.button<any>`pl-3 z-30 flex absolute inset-y-0 right-3 items-center cursor-pointer`;
