import React from 'react';
import Modal from '@components/Modal/Modal';
import Button from '@components/Elements/Button/Button';
import { Flex } from '@styles/styles';
import { useMutation } from '@tanstack/react-query';
import { deleteEntryMutation } from '@config/api';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

interface ConfirmDeleteEntryModalProps {
	isOpen: boolean;
	setIsOpen: Function;
	entryId?: string;
}

export const ConfirmDeleteEntryModal = ({
	isOpen,
	setIsOpen,
	entryId = undefined,
}: ConfirmDeleteEntryModalProps) => {
	// Update Entry
	const router = useRouter();
	const deleteEntry = useMutation({
		mutationFn: deleteEntryMutation,
		onSuccess: () => signOut(),
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
		}
	};

	const cancelHandler = () => {
		setIsOpen(false);
	};

	return (
		<Modal value={isOpen} onChange={setIsOpen}>
			<Modal.Body>
				<Flex className='flex-col items-start gap-4 p-5 bg-white dark:bg-zinc-900'>
					<Flex className='flex-col items-start gap-0 text-left'>
						<p className='m-0 text-xl font-bold '>Account deletion!</p>
						<p className='m-0 text-md'>
							Are you sure you want to delete you&apos;r account?
						</p>
					</Flex>
					<Flex className='flex-col w-full gap-4'>
						<Button $negative onClick={handleDeleteEntry} className='w-full'>
							Yes, delete my account
						</Button>
						<Button $positive onClick={cancelHandler} className='w-full'>
							Cancel
						</Button>
					</Flex>
				</Flex>
			</Modal.Body>
		</Modal>
	);
};

export default ConfirmDeleteEntryModal;
