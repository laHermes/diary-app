import React from 'react';
import { useSession } from 'next-auth/react';
import { SectionAction, SectionCard, SectionTitle } from '@styles/styles';
import Sidebar from '@components/Sidebar/Sidebar';
import FloatingWrite from '@components/FloatingWrite/FloatingWrite';
import MobileNav from '@components/MobileNav/MobileNav';
import {
	useEntriesCount,
	useEntriesStreaks,
	useEntriesToday,
} from '@hooks/useEntriesQuery';
import {
	InsightsItem,
	InsightsItems,
	InsightsSub,
	InsightsValue,
	ThinBorder,
} from '@components/Insights/Styles';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Page from '@components/PageComponent/Page';
import Entries from '@components/Entries/Entries';
import Inspiration from '@components/Inspiration/Inspiration';

const Index = () => {
	const { data } = useSession();
	const router = useRouter();
	const { data: count } = useEntriesCount();
	const { data: streak } = useEntriesStreaks();
	const { data: entriesToday } = useEntriesToday();
	const username = data?.user?.name ? data.user.name : 'Anonymous';

	return (
		<Page>
			<Page.Layout>
				<Page.Section>
					<Page.Title>Today</Page.Title>
					<Page.Subtitle>Welcome back, {username}!</Page.Subtitle>
				</Page.Section>

				<Page.Section>
					<SectionTitle>Inspiration</SectionTitle>
					<Inspiration />
				</Page.Section>

				<Page.Section>
					<SectionTitle>Insights</SectionTitle>
					<SectionCard>
						<InsightsItems>
							<InsightsItem>
								<InsightsValue>{streak?.currentStreak || '-'}</InsightsValue>
								<InsightsSub>Current Streak</InsightsSub>
							</InsightsItem>
							<InsightsItem>
								<InsightsValue>{streak?.longestStreak || '-'}</InsightsValue>
								<InsightsSub>Longest Streak</InsightsSub>
							</InsightsItem>
							<InsightsItem>
								<InsightsValue>{count ? count : '-'}</InsightsValue>
								<InsightsSub>Total Entries</InsightsSub>
							</InsightsItem>
						</InsightsItems>
						<ThinBorder />
						<SectionAction
							onClick={() => router.push(`${router.pathname}/insights`)}>
							<p className='m-0 dark:text-accent'>All Insights</p>
							<ChevronRightIcon className='h-5 w-5 self-center dark:fill-accent' />
						</SectionAction>
					</SectionCard>
				</Page.Section>

				<Page.Section>
					<SectionTitle>Recent activity</SectionTitle>
					<div className='mb-4 flex w-full flex-col gap-4 rounded-md'>
						<Entries entries={entriesToday} />
						<FloatingWrite />
					</div>
				</Page.Section>
			</Page.Layout>
		</Page>
	);
};

Index.getLayout = function getLayout(page: React.ReactElement) {
	return (
		<div>
			<Sidebar />
			{page}
			<MobileNav />
		</div>
	);
};

export default Index;
