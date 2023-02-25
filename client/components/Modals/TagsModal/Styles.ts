import tw from 'tailwind-styled-components';

export interface TagButtonProps {
	$selected?: boolean;
	$hidden?: boolean;
}

export const TagButton = tw.button<
	TagButtonProps | any
>`flex w-full items-center gap-4 p-3 text-left font-jost text-sm font-medium uppercase tracking-wider hover:bg-indigo-100/80
${({ $selected }) =>
	$selected && 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'}	
${({ $hidden }) => $hidden && 'hidden'}

`;
export const AddNewTagButton = tw.button<any>`flex w-full items-center gap-4 p-3 text-left font-jost text-sm uppercase tracking-wider hover:bg-indigo-200/80`;

export const TagsWrapper = tw.div<any>`bg-white divide-y w-[28rem] rounded-xl dark:divide-zinc-800 dark:bg-zinc-900`;
export const TagsHeader = tw.p<any>`px-4 pt-4 pb-2 text-xl font-medium`;

export const TagsSearchSection = tw.div<any>`flex items-center w-full px-4`;
export const TagsListWrapper = tw.div<any>`overflow-y-auto divide-y max-h-96 dark:divide-zinc-800`;
export const TagsInput = tw.input<any>`w-full h-12 text-sm tracking-wider bg-transparent border-0 outline-none text-zinc-800 placeholder-zinc-400 focus:ring-0`;
