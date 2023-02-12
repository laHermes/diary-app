import React from 'react';

// hooks
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { deleteEntryMutation } from '@config/api';

// components
import Modal from '@components/Elements/Modal/Modal';
import Button from '@components/Elements/Button/Button';
import { Flex } from '@styles/styles';

interface ConfirmDeleteEntryModalProps {
	isOpen: boolean;
	onCloseModal: () => any;
	entryId?: string;
}

export const ConfirmDeleteEntryModal = ({
	isOpen,
	onCloseModal,
	entryId = undefined,
}: ConfirmDeleteEntryModalProps) => {
	// Update Entry
	const router = useRouter();

	const deleteEntry = useMutation({
		mutationFn: deleteEntryMutation,
		onSuccess: () => router.push('/app/journal'),
	});

	const handleDeleteEntry = () => {
		if (!entryId) {
			handleGoBack();
		}
		entryId && deleteEntry.mutate(entryId);
	};

	const handleGoBack = () => {
		if (window?.history?.state?.idx > 0) {
			router.back();
			return;
		}
		router.push('/app/journal');
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
