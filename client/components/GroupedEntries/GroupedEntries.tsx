import React from 'react';
import moment from 'moment';

// utils
import { formatGroupedStories, groupStoriesBy } from '@utils/dates';

// components
import Entries from '@components/Entries/Entries';
import { Flex } from '@styles/styles';

const GroupedEntries = ({ entries = [] }: { entries: any }) => {
	// entries grouped by month
	const groupedData = formatGroupedStories(
		groupStoriesBy(entries, 'month', 'date')
	);

	// readable date
	const getFormattedDate = (date: string | Date) =>
		moment(date).format('MMMM YYYY') as string;

	return (
		<>
			{groupedData.map(
				({ date, entries }: { date: string; entries: IEntry[] }) => {
					return (
						<div
							key={date}
							className='w-full mb-5 border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-50'>
							<p className='w-full pb-1 m-0 text-lg font-semibold text-black font-playfair dark:text-white'>
								{getFormattedDate(date)}
							</p>
							<Flex className='flex-col gap-4 mt-2 '>
								<Entries entries={entries} />
							</Flex>
						</div>
					);
				}
			)}
		</>
	);
};

export default GroupedEntries;
