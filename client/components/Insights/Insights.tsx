import React from 'react';
import Link from 'next/link';

// store
import { selectEntries } from '@store/entrySlice';
import { useSelector } from 'react-redux';

// components
import { SectionAction, SectionCard } from '@styles/styles';
import {
	InsightsItems,
	InsightsItem,
	InsightsSub,
	InsightsValue,
	ThinBorder,
} from './Styles';

// icons
import { ChevronRightIcon } from '@heroicons/react/solid';

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
					<ChevronRightIcon className='h-5 w-5 self-center' />
				</SectionAction>
			</Link>
		</SectionCard>
	);
};

export default Insights;
