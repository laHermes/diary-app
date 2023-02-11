import { Reducer, useReducer } from 'react';

type EntryCustomType = Pick<IEntry, 'content' | 'emotion' | 'tags'>;

const initialSearchState: Record<keyof EntryCustomType, any> = {
	content: '',
	emotion: '',
	tags: [],
};

export enum ActionTypes {
	SET = 'set',
	ADD = 'add',
	REMOVE = 'remove',
	RESET = 'reset',
	RESET_ALL = 'reset_all',
}

export type SearchActions = {
	type: Exclude<ActionTypes, ActionTypes.RESET_ALL>;
	key: keyof EntryCustomType;
	payload?: any;
};

type ResetSearchActions = {
	type: ActionTypes.RESET_ALL;
};

type ReducerTypes = SearchActions | ResetSearchActions;

const searchReducer: Reducer<any, ReducerTypes> = (
	state: any,
	action: ReducerTypes
) => {
	switch (action.type) {
		case ActionTypes.RESET_ALL:
			return { ...initialSearchState };
		case ActionTypes.SET:
			return { ...state, [action.key]: action.payload.toLowerCase() };
		case ActionTypes.ADD:
			if (state[action.key].includes(action.payload.toLowerCase())) {
				return {
					...state,
					[action.key]: [...state[action.key]].filter(
						(instance: string) => instance !== action.payload.toLowerCase()
					),
				};
			}
			return {
				...state,
				[action.key]: [...state[action.key], action.payload.toLowerCase()],
			};
		case ActionTypes.REMOVE:
			return {
				...state,
				[action.key]: [...state[action.key]].filter(
					(instance: string) => instance !== action.payload.toLowerCase()
				),
			};
		case ActionTypes.RESET:
			return {
				...state,
				[action.key]: initialSearchState[action.key],
			};
		default:
			throw Error('Unknown action', action['type']);
	}
};

const useSearchReducer = () => {
	return useReducer(searchReducer, initialSearchState);
};

export default useSearchReducer;
