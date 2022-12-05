import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '@components/Modal/Modal';
import Button from '@components/Elements/Button/Button';

// on click back
export const ConfirmReturnModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [finishStatus, setFinishStatus] = useState<boolean>(false);
	const router = useRouter();

	const onBackButtonEvent = useCallback(
		(e: any) => {
			e.preventDefault();
			if (!finishStatus) {
				setIsModalOpen(true);
			}
		},
		[finishStatus]
	);

	useEffect(() => {
		if (finishStatus) {
			setIsModalOpen(false);
			window.history.back();
			// router.back();
		} else {
			window.history.pushState(null, '', window.location.pathname);
			setFinishStatus(false);
		}
	}, [router, finishStatus]);

	useEffect(() => {
		window.history.pushState(null, '', window.location.pathname);
		window.addEventListener('popstate', onBackButtonEvent);
		return () => {
			window.removeEventListener('popstate', onBackButtonEvent);
		};
	}, [onBackButtonEvent]);

	const cancelHandler = () => {
		setIsModalOpen(false);
	};

	const backHandler = () => {
		setFinishStatus(true);
	};

	if (isModalOpen) {
		return (
			<Modal value={isModalOpen} onChange={setIsModalOpen}>
				<Modal.Body>
					<div className='p-3 text-center bg-white rounded-md dark:bg-zinc-900 '>
						<p className='text-xl font-semibold'>Unsaved entry will be lost!</p>
						<p className='text-xl'>Are you sure you want to quit?</p>
						<div className='inline-flex items-center justify-between gap-2 '>
							<Button $positive onClick={cancelHandler}>
								Cancel
							</Button>
							<Button $negative onClick={backHandler}>
								Quit
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		);
	}

	return null;
};

export default ConfirmReturnModal;
