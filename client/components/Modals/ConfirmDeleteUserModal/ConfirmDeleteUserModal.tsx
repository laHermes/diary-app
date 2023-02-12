import React from 'react';

// hooks and config
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { deleteUserMutation } from '@config/api';

// components
import { Flex } from '@styles/styles';
import Button from '@components/Elements/Button/Button';
import Modal from '@components/Elements/Modal/Modal';

interface ConfirmDeleteUserModalProps {
	isOpen: boolean;
	onCloseModal: () => any;
}

export const ConfirmDeleteUserModal = ({
	isOpen,
	onCloseModal,
}: ConfirmDeleteUserModalProps) => {
	// Update Entry
	const deleteUser = useMutation({
		mutationFn: deleteUserMutation,
		onSuccess: () => signOut(),
	});

	const handleDeleteUser = () => {
		deleteUser.mutate();
	};

	return (
		<Modal value={isOpen} onCloseModal={onCloseModal}>
			<Modal.Body>
				<Flex className='flex-col items-start gap-4 p-5 bg-white dark:bg-zinc-900'>
					<Flex className='flex-col items-start gap-0 text-left'>
						<p className='m-0 text-xl font-bold '>Account deletion!</p>
						<p className='m-0 text-md'>
							Are you sure you want to delete you&apos;r account?
						</p>
					</Flex>
					<Flex className='flex-col w-full gap-4'>
						<Button $negative onClick={handleDeleteUser} className='w-full'>
							Yes, delete my account
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

export default ConfirmDeleteUserModal;
