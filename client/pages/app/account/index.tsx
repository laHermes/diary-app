import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import GoBack from '@components/GoBack/GoBack';
import Page from '@components/PageComponent/Page';
import PageCard from '@components/Elements/PageCard/PageCard';
import {
	ExclamationCircleIcon,
	ExclamationIcon,
} from '@heroicons/react/outline';

const Index = () => {
	const { data: session } = useSession();

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
								className='bg-transparent border rounded-xl'
							/>

							<label htmlFor='email'>Email</label>
							<input
								type='text'
								name='email'
								disabled={true}
								defaultValue={email || ''}
								className='bg-transparent border rounded-xl'
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

				<PageCard>
					<PageCard.Body>
						<Page.CardAction hasIcon={false}>
							<div className='font-medium'>Delete Account</div>
							<ExclamationCircleIcon className='w-5 h-5' />
						</Page.CardAction>
					</PageCard.Body>
				</PageCard>
			</Page.Layout>
		</Page>
	);
};

export default Index;
