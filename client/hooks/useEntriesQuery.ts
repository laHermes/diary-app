import { fetchEntries } from '@config/api';
import { useQuery } from '@tanstack/react-query';
import {
	calculateStreaks,
	formatGroupedStories,
	groupStoriesBy,
	isToday,
} from '@utils/dates';
import { getTotalWordsWritten, getUniqueTags } from '@utils/entriesUtils';

export const useEntries = () => useQuery(['Entries'], fetchEntries);

export const useEntriesQuery = (select?: any) =>
	useQuery(['Entries'], fetchEntries, {
		select,
	});

// returns entries grouped by month
export const useEntriesCount = () =>
	useEntriesQuery((data: any) => data.length);

// returns entries grouped by month
export const useEntriesGroupedByMonth = () =>
	useEntriesQuery((data: any) =>
		formatGroupedStories(
			groupStoriesBy({
				array: data,
				timeHorizon: 'month',
				dateSelector: 'created_at',
			})
		)
	);
// returns today entries
export const useEntriesToday = () =>
	useEntriesQuery(
		(data: any) =>
			data.filter((entry: IEntry) => isToday({ date: entry.date })).reverse() ||
			[]
	);

// returns entry by id
export const useEntry = (id: string) =>
	useEntriesQuery((data: any) => data.find((entry: any) => entry.id === id));

// returns entries tags
// combine entry tags with default or just return default tags
export const useEntriesTags = () =>
	useEntriesQuery((data: any) => getUniqueTags(data) || []);

// calculates total words written from all entries
export const useEntriesTotalWords = () =>
	useEntriesQuery((data: IEntry[]) => getTotalWordsWritten(data));

// calculates total words written from all entries
export const useEntriesStreaks = () =>
	useEntriesQuery((data: IEntry[]) => {
		return calculateStreaks({ array: data });
	});
