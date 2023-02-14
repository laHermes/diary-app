import { SectionCard, SectionTitle } from '@styles/styles';
import React from 'react';
import {
	InsightsItems,
	InsightsSub,
	InsightsValue,
	InsightsItem,
} from '@components/Insights/Styles';
import { useSelector } from 'react-redux';
import { selectEntries, selectEntriesTotalWords } from '@store/demoEntrySlice';
import Page from '@components/Layout/Page/Page';
import GoBack from '@components/Navigation/GoBack/GoBack';

const Index = () => {
	const entries = useSelector(selectEntries);
	const totalWords = useSelector(selectEntriesTotalWords);

	return (
		<Page>
			<Page.Layout>
				<GoBack path='/demo' />
				<SectionTitle>Insights</SectionTitle>
				<SectionCard className='w-fit'>
					<InsightsItems>
						<InsightsItem>
							<InsightsValue>{'-'}</InsightsValue>
							<InsightsSub>Current Streak</InsightsSub>
						</InsightsItem>
						<InsightsItem>
							<InsightsValue>{'-'}</InsightsValue>
							<InsightsSub>Longest Streak</InsightsSub>
						</InsightsItem>
					</InsightsItems>
				</SectionCard>
				<SectionCard className='w-fit'>
					<InsightsItems>
						<InsightsItem>
							<InsightsValue>{entries.length}</InsightsValue>
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
