import React from 'react';
import { useSelector } from 'react-redux';
import { SectionAction, SectionCard, SectionTitle } from '@styles/styles';
import Inspiration from '@components/Inspiration/Inspiration';
import { selectEntries, selectTodayEntries } from '@store/demoEntrySlice';
import Sidebar from '@components/Sidebar/Sidebar';
import FloatingWrite from '@components/FloatingWrite/FloatingWrite';
import MobileNav from '@components/MobileNav/MobileNav';
import Page from '@components/PageComponent/Page';
import {
	InsightsItem,
	InsightsItems,
	InsightsSub,
	InsightsValue,
	ThinBorder,
} from '@components/Insights/Styles';
import { ChevronRightIcon } from '@heroicons/react/outline';
import Entries from '@components/Entries/Entries';
import { useRouter } from 'next/router';
import { InformationCircleIcon } from '@heroicons/react/solid';

const Index = () => {
	const router = useRouter();
	const entriesToday = useSelector(selectTodayEntries);
	const entries = useSelector(selectEntries);

	return (
		<Page>
			<Page.Layout>
				<Page.Section>
					<Page.Title>Today</Page.Title>
					<Page.Subtitle>Welcome back, Anonymous!</Page.Subtitle>
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
								<InsightsValue>{'-'}</InsightsValue>
								<InsightsSub>
									Current Streak
									<div className='relative flex normal-case group'>
										<InformationCircleIcon width={12} height={12} />
										<span className='absolute z-50 m-4 mx-auto w-24 -translate-x-1/2 rounded-md bg-zinc-900 px-1 text-sm text-stone-100 opacity-0 transition-opacity group-hover:opacity-100'>
											Available only after signing up
										</span>
									</div>
								</InsightsSub>
							</InsightsItem>
							<InsightsItem>
								<InsightsValue>{'-'}</InsightsValue>
								<InsightsSub>
									Longest Streak
									<div className='relative flex normal-case group'>
										<InformationCircleIcon width={12} height={12} />
										<span className='absolute z-50 w-24 px-1 m-4 mx-auto text-sm transition-opacity -translate-x-4 rounded-md opacity-0 bg-zinc-900 text-stone-100 group-hover:opacity-100'>
											Available only after signing up
										</span>
									</div>
								</InsightsSub>
							</InsightsItem>
							<InsightsItem>
								<InsightsValue>{entries.length}</InsightsValue>
								<InsightsSub>Total Entries</InsightsSub>
							</InsightsItem>
						</InsightsItems>
						<ThinBorder />
						<SectionAction
							onClick={() => router.push(`${router.pathname}/insights`)}>
							<p className='m-0'>All Insights</p>
							<ChevronRightIcon className='self-center w-5 h-5' />
						</SectionAction>
					</SectionCard>
				</Page.Section>

				<Page.Section>
					<SectionTitle>Recent activity</SectionTitle>
					<div className='flex flex-col w-full gap-4 mb-4 rounded-md'>
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
		<div className='inline-flex w-screen pb-10 md:pb-0'>
			<Sidebar />
			{page}
			<MobileNav />
		</div>
	);
};

export default Index;
