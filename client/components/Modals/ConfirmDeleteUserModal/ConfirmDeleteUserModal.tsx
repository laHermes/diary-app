import React from 'react';
import Modal from '@components/Elements/Modal/Modal';
import Button from '@components/Elements/Button/Button';
import { Flex } from '@styles/styles';
import { useMutation } from '@tanstack/react-query';
import { deleteUserMutation } from '@config/api';
import { signOut } from 'next-auth/react';

interface ConfirmDeleteUserModalProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmDeleteUserModal = ({
	isOpen,
	setIsOpen,
}: ConfirmDeleteUserModalProps) => {
	// Update Entry
	const deleteUser = useMutation({
		mutationFn: deleteUserMutation,
		onSuccess: () => signOut(),
	});

	const handleDeleteUser = () => {
		deleteUser.mutate();
	};

	const cancelHandler = () => {
		setIsOpen(false);
	};
	return (
		<Modal value={isOpen} onChange={setIsOpen}>
			<Modal.Body>
				<Flex className='flex-col items-start gap-4 bg-white p-5 dark:bg-zinc-900'>
					<Flex className='flex-col items-start gap-0 text-left'>
						<p className='m-0 text-xl font-bold '>Account deletion!</p>
						<p className='text-md m-0'>
							Are you sure you want to delete you&apos;r account?
						</p>
					</Flex>
					<Flex className='w-full flex-col gap-4'>
						<Button $negative onClick={handleDeleteUser} className='w-full'>
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

export default ConfirmDeleteUserModal;