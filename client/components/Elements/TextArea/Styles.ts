import tw from 'tailwind-styled-components';

interface ITextArea {
	$invalid?: boolean;
}

export const StyledTextContainer = tw.div<any>`w-full `;
export const StyledTextArea = tw.textarea<
	ITextArea | any
>`w-full rounded-md dark:bg-zinc-800 ${({ $invalid }) =>
	$invalid && 'border-red-400'}`;
