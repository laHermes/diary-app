import React from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useHandleNavigate from '@hooks/useHandleNavigate';

// components
import {
	StyledSidebar,
	StyledSidebarBody,
	StyledSidebarButton,
	StyledSidebarButtonText,
} from './Styles';
import ThemeSwitcher from '@components/ThemeSwitcher/ThemeSwitcher';
import { TextLogo } from '@styles/styles';

// icons
import TodayIcon from '@icons/TodayIcon';
import NoteBoldIcon from '@icons/NoteBoldIcon';
import LoginBoldIcon from '@icons/LoginBoldIcon';
import SettingsPanelIcon from '@icons/SettingsPanelIcon';

const Sidebar = () => {
	const router = useRouter();
	const { status } = useSession();

	const { handleRedirect } = useHandleNavigate();

	return (
		<StyledSidebar>
			<StyledSidebarBody>
				<div className='flex flex-col gap-10'>
					<button onClick={() => handleRedirect('/')} className='w-full'>
						<TextLogo className='text-lg text-center md:text-2xl'>
							diaryapp
						</TextLogo>
					</button>
					<div className='flex flex-col items-center gap-3'>
						<StyledSidebarButton
							onClick={() => handleRedirect('/')}
							className={
								router.pathname.endsWith('/app') &&
								'bg-accent/20 dark:bg-accent/20'
							}>
							<TodayIcon className='h-6 w-6 self-center fill-accent/80 dark:fill-accent/50' />
							<StyledSidebarButtonText>Today</StyledSidebarButtonText>
						</StyledSidebarButton>

						<StyledSidebarButton
							onClick={() => handleRedirect('/journal')}
							className={
								router.pathname.includes('/journal') &&
								'bg-accent/20 dark:bg-accent/20'
							}>
							<NoteBoldIcon className='h-6 w-6 self-center fill-accent/80 dark:fill-accent/50' />
							<StyledSidebarButtonText>Journal</StyledSidebarButtonText>
						</StyledSidebarButton>

						{status === 'authenticated' && router.pathname.includes('app') && (
							<StyledSidebarButton onClick={() => handleRedirect('/settings')}>
								<SettingsPanelIcon className='h-6 w-6 self-center fill-accent/80 dark:fill-accent/50' />
								<StyledSidebarButtonText>Settings</StyledSidebarButtonText>
							</StyledSidebarButton>
						)}

						{router.pathname.includes('demo') && (
							<Link href='/login'>
								<StyledSidebarButton>
									<LoginBoldIcon className='h-6 w-6 self-center fill-accent/50' />
									<StyledSidebarButtonText>Login</StyledSidebarButtonText>
								</StyledSidebarButton>
							</Link>
						)}
					</div>
				</div>

				<div className='mb-4'>
					<ThemeSwitcher />
				</div>
			</StyledSidebarBody>
		</StyledSidebar>
	);
};

export default Sidebar;
