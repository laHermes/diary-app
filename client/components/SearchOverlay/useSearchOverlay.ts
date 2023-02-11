import React from 'react';
import useSearchReducer, {
	ActionTypes,
	SearchActions,
} from './useSearchOverlayReducer';

const useSearchOverlay = () => {
	const [searchFilterState, dispatch] = useSearchReducer();

	// keyof CustomIEntry
	const handelSetFilter = ({ key, payload }: Omit<SearchActions, 'type'>) => {
		dispatch({ type: ActionTypes.SET, key, payload });
	};

	const handelAddFilter = ({ key, payload }: Omit<SearchActions, 'type'>) => {
		console.log(key, payload);

		dispatch({ type: ActionTypes.ADD, key, payload });
	};

	const handelResetFilter = ({
		key,
	}: Omit<SearchActions, 'type' | 'payload'>) => {
		dispatch({ type: ActionTypes.RESET, key });
	};

	// Input field
	const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log('target', event.target.value);

		handelSetFilter({ key: 'content', payload: event.target.value });
	};

	const handleResetQuery = () => {
		handelResetFilter({ key: 'content' });
	};

	return {
		searchFilterState,
		dispatch,
		handelSetFilter,
		handelAddFilter,
		handelResetFilter,
		handleQuery,
		handleResetQuery,
	};
};

export default useSearchOverlay;
