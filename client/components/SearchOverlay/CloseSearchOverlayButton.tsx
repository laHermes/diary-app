import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';

type CloseSearchOverlayButtonProps = {
	onClick: () => any;
};

const CloseSearchOverlayButton = ({
	onClick,
}: CloseSearchOverlayButtonProps) => {
	return (
		<button
			onClick={onClick}
			className='inline-flex justify-center gap-3 px-2 py-2 transition-all duration-200 rounded-full hover:bg-zinc-100 hover:dark:bg-zinc-800 md:justify-start'>
			<ChevronDownIcon className='self-center w-4 h-4 stroke-2' />
		</button>
	);
};

export default CloseSearchOverlayButton;
