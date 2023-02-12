import React from 'react';

// utils
import { formatGroupedStories, groupStoriesBy } from '@utils/dates';

// components
import { Flex } from '@styles/styles';
import { EntriesDate, EntriesSection } from './Styles';
import EntriesList from './EntriesList';

const GroupedEntries = ({ entries = [] }: { entries: any }) => {
	// entries grouped by month
	const groupedData = formatGroupedStories(
		groupStoriesBy({
			array: entries,
			timeHorizon: 'month',
			dateSelector: 'date',
			dateFormat: 'MMMM YYYY',
		})
	);

	return (
		<>
			{groupedData.map(
				({ date, entries }: { date: string; entries: IEntry[] }) => {
					return (
						<EntriesSection key={date}>
							<EntriesDate>{date}</EntriesDate>
							<Flex className='mt-2 flex-col gap-4 '>
								<EntriesList entries={entries} />
							</Flex>
						</EntriesSection>
					);
				}
			)}
		</>
	);
};

export default GroupedEntries;
