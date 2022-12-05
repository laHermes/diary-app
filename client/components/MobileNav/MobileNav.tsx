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
		<div className='fixed inset-x-0 bottom-0 w-full bg-white dark:bg-zinc-900 sm:hidden'>
			<div className='inline-flex justify-between w-full h-full py-2 divide-x dark:divide-zinc-800'>
				<Flex className='flex-col flex-1' onClick={() => handleRedirect('/')}>
					<TodayIcon className='self-center w-6 h-6 fill-zinc-400' />
				</Flex>

				<Flex
					className='flex-col flex-1'
					onClick={() => handleRedirect('/journal')}>
					<NoteBoldIcon className='self-center w-6 h-6 fill-zinc-400' />
				</Flex>
				{status === 'authenticated' && router.pathname.includes('app') && (
					<Flex
						className='flex-col flex-1'
						onClick={() => handleRedirect('/settings')}>
						<SettingsPanelIcon className='self-center w-6 h-6 fill-zinc-400' />
					</Flex>
				)}

				{router.pathname.includes('demo') && (
					<Link href='/login'>
						<Flex className='flex-col flex-1'>
							<LoginBoldIcon className='self-center w-6 h-6 fill-zinc-400' />
						</Flex>
					</Link>
				)}
			</div>
		</div>
	);
};

export default MobileNav;
