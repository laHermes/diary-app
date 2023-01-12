import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTotalWordsWritten, getUniqueTags } from '@utils/entriesUtils';
import { uniqueId } from 'lodash';
import { formatGroupedStories, groupStoriesBy, isToday } from 'utils/dates';
import { AppState } from './store';

const initialState: Array<IEntry> = [];

export const demoEntrySlice: any = createSlice({
	name: 'demoEntry',
	initialState: initialState,
	reducers: {
		addDemoEntry(state, { payload }: PayloadAction<Omit<IEntry, 'id'>>) {
			const id = uniqueId();
			const { tags } = payload;
			state.push({ id, tags: tags || [], ...payload });
		},
		updateDemoEntry(state, { payload }: PayloadAction<IEntry>) {
			const { id: entryId, ...payloadProps } = payload;
			const elemIndex = state.findIndex(({ id }) => id === entryId);
			const newState = [...state];

			newState[elemIndex] = {
				id: entryId,
				...payloadProps,
			};

			return newState;
		},
		removeDemoEntry(state, { payload }: PayloadAction<Pick<IEntry, 'id'>>) {
			return state.filter((entry) => entry.id !== payload.id);
		},
	},
});

export const { addDemoEntry, removeDemoEntry, updateDemoEntry } =
	demoEntrySlice.actions;

// select all entries
export const selectEntries = (state: AppState) => state.reducer.demoEntry;

// group all entries based on month
export const selectGroupedByMonthEntries = createSelector(
	selectEntries,
	(entries) => formatGroupedStories(groupStoriesBy(entries, 'month'))
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

export default demoEntrySlice.reducer;
