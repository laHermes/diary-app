import tw from 'tailwind-styled-components';
import { CheckIcon, XIcon } from '@heroicons/react/outline';

export const StyledCheckIcon = tw(
	CheckIcon
)<any>`w-8 h-8 stroke-white min-w-fit`;
export const StyledXIcon = tw(XIcon)<any>`w-8 h-8 stroke-white min-w-fit`;
