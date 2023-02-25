import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './store';
import { getTotalWordsWritten, getUniqueTags } from '@utils/entriesUtils';
import { formatGroupedStories, groupStoriesBy, isToday } from 'utils/dates';
import uuid from 'react-uuid';

const initialState: Array<IEntry> = [];

type IAddEntryPayload = PayloadAction<IEntry>;
type IUpdateEntryPayload = PayloadAction<IEntry>;
type IRemoveEntryPayload = PayloadAction<Pick<IEntry, 'id'>>;

export const EntrySlice = createSlice({
	name: 'Entry',
	initialState: initialState,
	reducers: {
		addEntry: {
			reducer: (state, { payload }: IAddEntryPayload) => {
				const { tags } = payload;
				return [...state, { tags: tags || [], ...payload }];
			},
			prepare: (payload) => {
				return {
					payload: { ...payload, id: uuid() },
				};
			},
		},
		updateEntry: (state, { payload }: IUpdateEntryPayload) => {
			const { id: entryId, ...payloadProps } = payload;

			return state.map((entry) => {
				if (entry.id === entryId) {
					return { ...entry, ...payloadProps };
				}
				return entry;
			});
		},
		removeEntry: (state, { payload }: IRemoveEntryPayload) => {
			return state.filter((entry) => entry.id !== payload.id);
		},
	},
});

export const { addEntry, removeEntry, updateEntry } = EntrySlice.actions;

// select all entries
export const selectEntries = (state: AppState) => state.reducer.Entry;

// group all entries based on month
export const selectGroupedByMonthEntries = createSelector(
	selectEntries,
	(entries) =>
		formatGroupedStories(
			groupStoriesBy({ array: entries, timeHorizon: 'month' })
		)
);
// group all entries based on month
export const selectTodayEntries = createSelector(selectEntries, (entries) =>
	entries.filter((entry: IEntry) => isToday({ date: entry.date })).reverse()
);

// select sum of total words from all entries
export const selectEntriesTotalWords = createSelector(
	selectEntries,
	(entries) => getTotalWordsWritten(entries)
);

// select tags
export const selectTags = createSelector(selectEntries, (entries) =>
	getUniqueTags(entries)
);

export default EntrySlice.reducer;
