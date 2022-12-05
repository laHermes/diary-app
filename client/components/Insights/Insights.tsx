import { SectionActionButton, SectionCard } from '@styles/styles';
import React from 'react';

import { ChevronRightIcon } from '@heroicons/react/solid';
import {
	InsightsItems,
	InsightsItem,
	InsightsSub,
	InsightsValue,
	ThinBorder,
} from './Styles';
import { selectEntries } from '@store/demoEntrySlice';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Insights = () => {
	const entries = useSelector(selectEntries);

	return (
		<SectionCard>
			<InsightsItems>
				<InsightsItem>
					<InsightsValue>0</InsightsValue>
					<InsightsSub>Current Streak</InsightsSub>
				</InsightsItem>
				<InsightsItem>
					<InsightsValue>0</InsightsValue>
					<InsightsSub>Longest Streak</InsightsSub>
				</InsightsItem>
				<InsightsItem>
					<InsightsValue>{entries?.length}</InsightsValue>
					<InsightsSub>Total Entries</InsightsSub>
				</InsightsItem>
			</InsightsItems>
			<ThinBorder />

			<Link href='/demo/insights'>
				<SectionActionButton>
					<p className='m-0 text-accent'>All Insights</p>
					<ChevronRightIcon className='h-5 w-5 self-center' />
				</SectionActionButton>
			</Link>
		</SectionCard>
	);
};

export default Insights;
