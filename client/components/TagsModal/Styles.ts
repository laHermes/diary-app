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
