import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
	AnyAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import EntrySlice from './entrySlice';

export const combinedReducer = combineReducers({
	Entry: EntrySlice,
});

const reducer = (
	state: ReturnType<typeof combinedReducer>,
	action: AnyAction
) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply from hydration
		};
		return nextState;
	} else {
		return combinedReducer(state, action);
	}
};

const store = () =>
	configureStore({
		reducer: {
			reducer,
		},

		devTools: true,
	});

export default store;
export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action
>;

export const wrapper = createWrapper<AppStore>(store);
