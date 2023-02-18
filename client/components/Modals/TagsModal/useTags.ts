import { useReducer, useMemo, useCallback } from 'react';

interface IUseTagsProps {
	selectedTags?: string[];
	defaultTags?: string[];
}

interface IUseTagsState {
	selected: string[];
	values: string[];
	filteredQuery: string;
	filtered: string[];
}
interface IUseTagsReturn {
	state: IUseTagsState;
	handleSelectTag: (value: string) => void;
	handleRemoveSelectedTag: (value: string) => void;
	handleSearchTag: (value: string) => void;
	handleCreateTag: (value: string) => void;
	isTagInSearch: (value: string) => boolean;
	notSelectedTags: string[];
}

const ActionTypes = {
	SELECT_TAG: 'SELECT_TAG',
	REMOVE_SELECTED_TAG: 'REMOVE_SELECTED_TAG',
	CREATE_TAG: 'CREATE_TAG',
	SEARCH_TAGS: 'SEARCH_TAGS',
} as const;

const useTags = ({
	selectedTags: selectedPropsTags,
	defaultTags: defaultPropsTags,
}: IUseTagsProps): IUseTagsReturn => {
	const defaultSelectedValues = selectedPropsTags || [];
	const defaultTags = defaultPropsTags || [];

	// values to pick from
	const defaultValues = [...defaultTags, ...defaultSelectedValues];

	const [state, dispatch] = useReducer(reducer, {
		selected: defaultSelectedValues,
		values: defaultValues,
		filteredQuery: '',
		filtered: [],
	});

	// handle select tag
	const handleSelectTag = (value: string) => {
		dispatch({ type: ActionTypes.SELECT_TAG, value });
	};

	// handles removing tag that was already selected
	const handleRemoveSelectedTag = (value: string) => {
		dispatch({ type: ActionTypes.REMOVE_SELECTED_TAG, value });
	};

	// handle search tag
	const handleSearchTag = (value: string) => {
		dispatch({ type: ActionTypes.SEARCH_TAGS, value });
	};

	// handles creating new tag
	const handleCreateTag = (value: string) => {
		dispatch({ type: ActionTypes.CREATE_TAG, value });
	};

	const isTagInSearch = useCallback(
		(value: string): boolean => {
			return value.startsWith(state.filteredQuery.toLowerCase());
		},
		[state]
	);
	const notSelectedTags = useMemo(() => {
		return state.values.filter((value) => !state.selected.includes(value));
	}, [state]);

	return {
		state,
		handleCreateTag,
		handleRemoveSelectedTag,
		handleSearchTag,
		handleSelectTag,
		isTagInSearch,
		notSelectedTags,
	};
};

export default useTags;

type UseTagsActionTypes = { type: keyof typeof ActionTypes; value: string };

const reducer = (state: IUseTagsState, action: UseTagsActionTypes) => {
	switch (action.type) {
		case 'SELECT_TAG':
			return {
				...state,
				selected: [...state.selected, action.value.toLowerCase()],
			};
		case 'REMOVE_SELECTED_TAG':
			return {
				...state,
				selected: [...state.selected].filter(
					(instance: string) => instance !== action.value
				),
			};
		case 'SEARCH_TAGS':
			return {
				...state,
				filteredQuery: action.value.toUpperCase(),
				filtered: state.values.filter(
					(value) => value === action.value.toLowerCase()
				),
			};
		case 'CREATE_TAG':
			return {
				...state,
				values: [...state.values, action.value.toLowerCase()],
				filteredQuery: '',
				filtered: [],
			};
		default:
			throw new Error('Unknown action type');
	}
};
