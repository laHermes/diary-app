import tw from 'tailwind-styled-components';

export const PageCard = tw.div<any>`py-2 overflow-hidden bg-white cursor-pointer rounded-xl dark:bg-cardDark drop-shadow-lg`;
export const PageCardBody = tw.div<any>`flex flex-col w-full gap-2 divide-y dark:divide-zinc-800`;
export const PageCardAction = tw.div<any>`flex items-center self-center justify-between w-full px-5 py-3 font-semibold text-left transition-all text-[16px] hover:bg-gray-100 dark:hover:bg-darkButtonHover`;
