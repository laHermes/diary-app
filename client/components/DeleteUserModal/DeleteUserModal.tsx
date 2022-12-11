import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '@components/Modal/Modal';
import Button from '@components/Elements/Button/Button';
import { Flex } from '@styles/styles';

// on click back
export const UnsavedChangesModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const router = useRouter();

	const cancelHandler = () => {
		setIsModalOpen(false);
	};

	const backHandler = () => {};

	if (isModalOpen) {
		return (
			<Modal value={isModalOpen} onChange={setIsModalOpen}>
				<Modal.Body>
					<Flex className='flex-col items-start gap-4 p-5 bg-white dark:bg-zinc-900'>
						<Flex className='flex-col items-start gap-0 text-left'>
							<p className='m-0 text-xl font-bold '>Account deletion!</p>
							<p className='m-0 text-md'>
								Are you sure you want to delete you&apos;r account?
							</p>
						</Flex>
						<Flex className='flex-col w-full gap-4'>
							<Button $negative onClick={backHandler} className='w-full'>
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
	}

	return null;
};

export default UnsavedChangesModal;
