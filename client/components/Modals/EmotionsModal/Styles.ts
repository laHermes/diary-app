import tw from 'tailwind-styled-components';

interface IEmotionButton {
	$selected?: boolean;
}

export const EmotionButton = tw.button<
	IEmotionButton | any
>`w-full p-3 text-left font-jost text-sm uppercase tracking-wider hover:bg-indigo-200/80 ${({
	$selected,
}) =>
	$selected &&
	'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-100'}`;
