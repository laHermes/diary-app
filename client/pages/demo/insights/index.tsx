import { Container, SectionCard, SectionTitle } from '@styles/styles';
import Link from 'next/link';
import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import {
	InsightsItems,
	InsightsSub,
	InsightsValue,
	InsightsItem,
} from '@components/Insights/Styles';
import { useSelector } from 'react-redux';
import { selectEntries, selectEntriesTotalWords } from '@store/demoEntrySlice';

const Index = () => {
	const entries = useSelector(selectEntries);
	const totalWords = useSelector(selectEntriesTotalWords);

	return (
		<Container>
			<div className='flex flex-col items-start gap-5 pt-10'>
				<Link href='/demo'>
					<button className='inline-flex gap-2 font-medium'>
						<ChevronLeftIcon className='self-center w-4 h-4' />
						<span className='self-center'>Back</span>
					</button>
				</Link>
				<SectionTitle>Insights</SectionTitle>
				<SectionCard>
					<div className='w-full max-w-screen-sm'>
						<InsightsItems>
							<InsightsItem>
								<InsightsValue>0</InsightsValue>
								<InsightsSub>Current Streak</InsightsSub>
							</InsightsItem>
							<InsightsItem>
								<InsightsValue>0</InsightsValue>
								<InsightsSub>Longest Streak</InsightsSub>
							</InsightsItem>
						</InsightsItems>
					</div>
				</SectionCard>
				<SectionCard>
					<div className='w-full max-w-screen-sm'>
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
					</div>
				</SectionCard>
			</div>
		</Container>
	);
};

export default Index;
