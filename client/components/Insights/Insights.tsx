import { SectionAction, SectionCard } from '@styles/styles';
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
				<SectionAction>
					<p className='m-0 text-accent'>All Insights</p>
					<ChevronRightIcon className='self-center w-5 h-5' />
				</SectionAction>
			</Link>
		</SectionCard>
	);
};

export default Insights;
