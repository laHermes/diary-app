import React from 'react';
import { CloseButton } from './Styles';
import { ChevronDownIcon } from '@heroicons/react/outline';

type CloseSearchButtonProps = {
	onClick: () => any;
};

const CloseSearchButton = ({ onClick }: CloseSearchButtonProps) => {
	const Icon = () => (
		<ChevronDownIcon className='self-center w-4 h-4 stroke-2' />
	);

	return (
		<CloseButton onClick={onClick}>
			<Icon />
		</CloseButton>
	);
};

export default CloseSearchButton;
