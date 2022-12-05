import React from 'react';
import { useSession } from 'next-auth/react';
import ThemeSwitcher from '@components/ThemeSwitcher/ThemeSwitcher';
import GoBack from '@components/GoBack/GoBack';
import { useRouter } from 'next/router';
import { APP_ROUTES } from '@features/Routes/routes';
import Page from '@components/PageComponent/Page';
import PageCard from '@components/Elements/PageCard/PageCard';

const Settings = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const name = session?.user?.name;
	const email = session?.user?.email;

	return (
		<Page>
			<Page.Layout>
				<GoBack />
				<Page.Title>Settings</Page.Title>
				<PageCard>
					<PageCard.Body>
						<Page.CardAction onClick={() => router.push(APP_ROUTES.ACCOUNT)}>
							<div className='flex flex-col gap-1'>
								<div className='font-medium'>Your Account</div>
								<div className='text-sm font-thin'>
									{name} - {email}
								</div>
							</div>
						</Page.CardAction>
						<Page.CardAction hasIcon={false}>
							<div className='font-medium'>Theme</div>
							<ThemeSwitcher />
						</Page.CardAction>
					</PageCard.Body>
				</PageCard>
			</Page.Layout>
		</Page>
	);
};

export default Settings;
