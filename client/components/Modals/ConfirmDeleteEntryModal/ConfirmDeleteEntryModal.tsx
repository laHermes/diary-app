import React from 'react';

// components
import Modal from '@components/Elements/Modal/Modal';
import Button from '@components/Elements/Button/Button';
import { Flex } from '@styles/styles';

interface ConfirmDeleteEntryModalProps {
	isOpen: boolean;
	onCloseModal: () => any;
	onDeleteFunction: () => void;
	onSuccess?: () => void;
}

export const ConfirmDeleteEntryModal = ({
	isOpen,
	onCloseModal,
	onDeleteFunction,
	onSuccess,
}: ConfirmDeleteEntryModalProps) => {
	const handleDeleteEntry = () => {
		onDeleteFunction();
		onSuccess?.();
	};

	return (
		<Modal value={isOpen} onCloseModal={onCloseModal}>
			<Modal.Body>
				<Flex className='flex-col items-start gap-4 p-5 bg-white dark:bg-zinc-900'>
					<Flex className='flex-col items-start gap-0 text-left'>
						<p className='m-0 text-xl font-bold '>Entry deletion!</p>
						<p className='m-0 text-md'>
							Are you sure you want to delete you&apos;r entry?
						</p>
					</Flex>
					<Flex className='flex-col w-full gap-4'>
						<Button $negative onClick={handleDeleteEntry} className='w-full'>
							Yes, delete my entry
						</Button>
						<Button $positive onClick={onCloseModal} className='w-full'>
							Cancel
						</Button>
					</Flex>
				</Flex>
			</Modal.Body>
		</Modal>
	);
};

export default ConfirmDeleteEntryModal;
