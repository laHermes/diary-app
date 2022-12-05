import { Fragment } from 'react';
import { Transition as HeadlessTransition } from '@headlessui/react';

const Transition = ({ children }: { children: React.ReactNode }) => {
	return (
		<HeadlessTransition
			as={Fragment}
			enter='transition ease-out duration-100'
			enterFrom='transform opacity-0 scale-95'
			enterTo='transform opacity-100 scale-100'
			leave='transition ease-in duration-75'
			leaveFrom='transform opacity-100 scale-100'
			leaveTo='transform opacity-0 scale-95'>
			{children}
		</HeadlessTransition>
	);
};

export default Transition;
