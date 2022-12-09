import tw from 'tailwind-styled-components';
import { TagIcon } from '@heroicons/react/outline';
import FaceSmileIcon from '@icons/FaceSmileIcon';
import DotsHorizontalIcon from '@icons/DotsHorizontalIcon';

export const Section = tw.div<any>`flex items-center gap-2`;
export const Container = tw.div<any>`w-full max-w-screen-md mx-auto`;
export const Header = tw.div<any>`flex justify-center w-full`;

export const HeaderWrapper = tw.div<any>`flex items-center justify-between w-full p-5`;
export const TextLogo = tw.div<any>`text-4xl font-semibold leading-none cursor-pointer font-playfair dark:text-white`;

export const WelcomeContent = tw.div<any>`flex flex-col items-center gap-12 mx-auto text-center mt-36 md:mt-48`;
export const WelcomeText = tw.div<any>`font-semibold leading-none tracking-tight font-playfair text-[80px] dark:text-white`;

export const SectionTitle = tw.div<any>`m-0 text-xl font-semibold text-black dark:text-white font-playfair`;
export const SectionCard = tw.div<any>`py-2 overflow-hidden bg-white rounded-xl dark:bg-cardDark drop-shadow-lg`;
export const SectionAction = tw.button<any>`inline-flex self-center justify-between w-full px-5 py-3 font-semibold transition-all text-[16px] hover:bg-gray-100 dark:hover:bg-darkButtonHover`;

export const Chip = tw.div<any>`w-fit rounded-xl bg-white dark:bg-black px-2 py-0.5 uppercase shadow-md font-jost`;
export const Flex = tw.div<any>`flex items-center gap-2`;

export const StyledTagIcon = tw(TagIcon)<any>`w-6 h-6 stroke-2 stroke-zinc-300`;

export const StyledFaceSmileIcon = tw(
	FaceSmileIcon
)<any>`w-6 h-6 stroke-2 stroke-zinc-300 min-w-fit`;

export const StyledDotsHorizontalIcon = tw(
	DotsHorizontalIcon
)<any>`w-6 h-6 stroke-2 stroke-zinc-300 min-w-fit`;
