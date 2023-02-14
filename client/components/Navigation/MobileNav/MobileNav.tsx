import React from 'react';
import useHandleNavigate from '@hooks/useHandleNavigate';
import LoginBoldIcon from '@icons/LoginBoldIcon';
import NoteBoldIcon from '@icons/NoteBoldIcon';
import TodayIcon from '@icons/TodayIcon';
import { Flex } from '@styles/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import SettingsPanelIcon from '@icons/SettingsPanelIcon';

const MobileNav = () => {
	const router = useRouter();
	const { handleRedirect } = useHandleNavigate();
	const { status } = useSession();

	return (
		<nav className='fixed inset-x-0 bottom-0 w-full bg-white dark:bg-zinc-900 sm:hidden'>
			<div className='inline-flex h-full w-full justify-between divide-x py-2 dark:divide-zinc-800'>
				<Flex className='flex-1 flex-col' onClick={() => handleRedirect('/')}>
					<TodayIcon className='h-6 w-6 self-center fill-zinc-400' />
				</Flex>

				<Flex
					className='flex-1 flex-col'
					onClick={() => handleRedirect('/journal')}>
					<NoteBoldIcon className='h-6 w-6 self-center fill-zinc-400' />
				</Flex>
				{status === 'authenticated' && router.pathname.includes('app') && (
					<Flex
						className='flex-1 flex-col'
						onClick={() => handleRedirect('/settings')}>
						<SettingsPanelIcon className='h-6 w-6 self-center fill-zinc-400' />
					</Flex>
				)}

				{router.pathname.includes('demo') && (
					<Link href='/login'>
						<Flex className='flex-1 flex-col'>
							<LoginBoldIcon className='h-6 w-6 self-center fill-zinc-400' />
						</Flex>
					</Link>
				)}
			</div>
		</nav>
	);
};

export default MobileNav;
