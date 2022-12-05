import { SectionCard, SectionTitle } from '@styles/styles';
import React from 'react';
import {
	InsightsItem,
	InsightsItems,
	InsightsSub,
	InsightsValue,
} from '@components/Insights/Styles';

import {
	useEntriesCount,
	useEntriesStreaks,
	useEntriesTotalWords,
} from '@hooks/useEntriesQuery';
import GoBack from '@components/GoBack/GoBack';
import Page from '@components/PageComponent/Page';

const Index = () => {
	const { data: totalWords } = useEntriesTotalWords();
	const { data: count } = useEntriesCount();
	const { data: streak } = useEntriesStreaks();

	const totalCount = count || '-';
	const currentStreak = streak?.currentStreak || '-';
	const longestStreak = streak?.longestStreak || '-';

	return (
		<Page>
			<Page.Layout>
				<GoBack />
				<SectionTitle>Insights</SectionTitle>
				<SectionCard className='w-fit'>
					<InsightsItems>
						<InsightsItem>
							<InsightsValue>{currentStreak}</InsightsValue>
							<InsightsSub>Current Streak</InsightsSub>
						</InsightsItem>
						<InsightsItem>
							<InsightsValue>{longestStreak}</InsightsValue>
							<InsightsSub>Longest Streak</InsightsSub>
						</InsightsItem>
					</InsightsItems>
				</SectionCard>
				<SectionCard className='w-fit'>
					<InsightsItems>
						<InsightsItem>
							<InsightsValue>{totalCount}</InsightsValue>
							<InsightsSub>Total entries</InsightsSub>
						</InsightsItem>
						<InsightsItem>
							<InsightsValue>{totalWords}</InsightsValue>
							<InsightsSub>Total words written</InsightsSub>
						</InsightsItem>
					</InsightsItems>
				</SectionCard>
			</Page.Layout>
		</Page>
	);
};

export default Index;
