import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import GoBack from '@components/Navigation/GoBack/GoBack';
import Page from '@components/Layout/Page/Page';
import PageCard from '@components/Elements/PageCard/PageCard';
import {
	ExclamationCircleIcon,
	ExclamationIcon,
} from '@heroicons/react/outline';
import ConfirmDeleteUserModal from '@components/Modals/ConfirmDeleteUserModal/ConfirmDeleteUserModal';
import useModalState from '@hooks/useModalState';

const Index = () => {
	const { data: session } = useSession();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

	const { isModalOpen, onCloseModal } = useModalState({});
	const name = session?.user?.name;
	const email = session?.user?.email;

	return (
		<Page>
			<Page.Layout>
				<GoBack />
				<Page.Title>Account</Page.Title>
				<PageCard>
					<PageCard.Body>
						<div className='flex flex-col gap-2 px-3 py-3'>
							<div className='text-lg font-normal'>Your Account</div>
							<label htmlFor='name'>Username</label>
							<input
								type='text'
								name='name'
								disabled={true}
								defaultValue={name || ''}
								className='px-2 py-2 bg-transparent border rounded-xl'
							/>

							<label htmlFor='email'>Email</label>
							<input
								type='text'
								name='email'
								disabled={true}
								defaultValue={email || ''}
								className='px-2 py-2 bg-transparent border rounded-xl'
							/>
						</div>

						<PageCard.Action onClick={signOut} hasIcon={false}>
							<div className='font-normal text-red-600 dark:text-red-400'>
								Logout
							</div>
							<ExclamationIcon className='w-5 h-5 stroke-red-600 dark:stroke-red-400' />
						</PageCard.Action>
					</PageCard.Body>
				</PageCard>

				<PageCard className='transition-colors bg-red-200 hover:bg-red-300 dark:hover:bg-red-300'>
					<PageCard.Body>
						<Page.CardAction
							hasIcon={false}
							className='bg-transparent hover:bg-transparent dark:hover:bg-transparent'
							onClick={() => setIsDeleteModalOpen(true)}>
							<div className='font-medium text-red-800'>Delete Account</div>
							<ExclamationCircleIcon className='w-5 h-5 stroke-red-800' />
						</Page.CardAction>
					</PageCard.Body>
				</PageCard>
				{/* User has to confirm to delete its account */}
				<ConfirmDeleteUserModal
					isOpen={isModalOpen('DELETE_USER')}
					onCloseModal={onCloseModal}
				/>
			</Page.Layout>
		</Page>
	);
};

export default Index;
