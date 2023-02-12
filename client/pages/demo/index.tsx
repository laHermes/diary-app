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
import Entries from '@components/Entries/EntriesList';
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
				{/* Insights component */}
				<Page.Section>
					<SectionTitle>Insights</SectionTitle>
					<SectionCard>
						<InsightsItems>
							<InsightsItem>
								<InsightsValue>{'-'}</InsightsValue>
								<InsightsSub>
									Current Streak
									<TooltipWarning />
								</InsightsSub>
							</InsightsItem>
							<InsightsItem>
								<InsightsValue>{'-'}</InsightsValue>
								<InsightsSub>
									Longest Streak
									<TooltipWarning />
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
							<ChevronRightIcon className='h-5 w-5 self-center' />
						</SectionAction>
					</SectionCard>
				</Page.Section>

				{/* Today - recent - activities */}
				<Page.Section>
					<SectionTitle>Recent activity</SectionTitle>
					<div className='mb-4 flex w-full flex-col gap-4 rounded-md'>
						<Entries entries={entriesToday} />
						{entriesToday && entriesToday.length === 0 && (
							<p>No today entries</p>
						)}
					</div>
					<FloatingWrite />
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

const TooltipWarning = () => {
	return (
		<div className='group relative flex normal-case'>
			<InformationCircleIcon width={10} height={10} />
			<span className='absolute z-50 m-4 mx-auto w-24 -translate-x-4 rounded-md bg-zinc-900 px-1 text-sm text-stone-100 opacity-0 transition-opacity group-hover:opacity-100'>
				Available only after signing up
			</span>
		</div>
	);
};
