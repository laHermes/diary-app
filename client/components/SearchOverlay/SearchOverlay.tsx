import React, { Reducer, useReducer } from 'react';
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import Page from '@components/PageComponent/Page';
import { Flex } from '@styles/styles';
import GroupedEntries from '@components/GroupedEntries/GroupedEntries';
import { debounce } from 'lodash';
import { ChevronDownIcon } from '@heroicons/react/outline';
import SelectPill from '@components/Elements/SelectPill/SelectPill';
import emotionContent from '@config/content.json';
import { filterData } from '@utils/filterUtils';
import FunnelCloseIcon from '@icons/FunnelCloseIcon';
interface SearchOverlayProps {
	setIsOpen?: Function;
	data: any[];
	tags: string[];
}

const SearchOverlay = ({
	setIsOpen,
	data: propsData,
	tags,
}: SearchOverlayProps) => {
	const [searchFilterState, dispatch] = useReducer(
		searchReducer,
		initialSearchState
	);

	const { data: filteredData, filter } = filterData({
		data: propsData,
		filter: searchFilterState,
	});

	const data = filter ? filteredData : [];
	const isNotFound = filter && filteredData?.length === 0;
	const isEmpty = !filter;

	// keyof CustomIEntry
	const handelSetFilter = ({ key, value }: any) => {
		dispatch({ type: ActionTypes.SET, key, payload: value });
	};

	const handelAddFilter = ({ key, value }: any) => {
		dispatch({ type: ActionTypes.ADD, key, payload: value });
	};

	const handelResetFilter = ({ key }: any) => {
		dispatch({ type: ActionTypes.RESET, key });
	};

	// Debouncing filter logic
	const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
		handelSetFilter({ key: 'content', value: event.target.value });
	};

	const handleResetQuery = () => {
		handelResetFilter({ key: 'content' });
	};

	// const handleFilterSearch = () => {
	// 	addFilter({
	// 		value: query,
	// 		filterType: FILTER.SEARCH,
	// 		action: (instance: any) =>
	// 			filterFieldValue({ instance, selector: 'content', targetValue: query }),
	// 	});
	// };
	// const debounceHandleFilterSearch = debounce(handleFilterSearch, 400);

	// useEffect(() => {
	// 	debounceHandleFilterSearch();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [query]);

	const isValueSelected = (
		providedValue: string | number,
		key: keyof IEntry
	) => {
		const filterType = searchFilterState[key];
		return filterType.includes(providedValue);
	};

	return (
		<div className='absolute inset-x-0 flex justify-center min-h-screen pt-12 pl-0 mx-auto bg-backgroundLight dark:bg-black'>
			<Page.Layout>
				<Flex className='justify-between'>
					<Page.Title>Search</Page.Title>
					{/* close this component button */}
					<button
						onClick={() => setIsOpen && setIsOpen(false)}
						className='inline-flex justify-center gap-3 px-2 py-2 transition-all duration-200 rounded-full hover:bg-zinc-100 hover:dark:bg-zinc-800 md:justify-start'>
						<ChevronDownIcon className='self-center w-4 h-4 stroke-2' />
					</button>
				</Flex>

				<Flex className='px-4 py-2 rounded-xl bg-zinc-50 dark:bg-cardDark'>
					{/* search icon */}
					<SearchIcon className=' h-7 w-7 text-zinc-400' />
					{/* search input */}
					<input
						autoFocus
						value={searchFilterState.content}
						onChange={handleQuery}
						className='w-full h-12 text-lg bg-transparent border-0 placeholder-zinc-400 ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 dark:text-zinc-200'
						placeholder='Search...'
					/>
					{/* if input has text display delete all text icon*/}
					{searchFilterState.content && (
						<XIcon
							onClick={handleResetQuery}
							className='w-6 h-6 text-zinc-700'
						/>
					)}
				</Flex>

				<div className='grid gap-2 -mt-6 sm:grid-cols-2'>
					<Flex className='max-w-1/2 flex-col items-start gap-4'>
						<Flex>
							<span className='text-base uppercase'>Search by emotion</span>
							<FunnelCloseIcon className='self-center w-4 h-4 stroke-white' />
						</Flex>
						<Flex className='flex-wrap'>
							{emotionContent.emotions.map(({ text }: { text: string }) => {
								return (
									<SelectPill
										variant={
											isValueSelected(text, 'emotion') ? 'selected' : 'default'
										}
										onClick={() =>
											handelSetFilter({ key: 'emotion', value: text })
										}
										key={text}>
										{text}
									</SelectPill>
								);
							})}
						</Flex>
					</Flex>

					<Flex className='max-w-1/2 flex-col items-start gap-4'>
						<Flex>
							<span className='text-base uppercase'>Search by tag</span>
							<FunnelCloseIcon className='self-center w-4 h-4 stroke-white' />
						</Flex>
						<Flex className='flex-wrap'>
							{tags.map((tag: string) => {
								return (
									<SelectPill
										variant={
											isValueSelected(tag, 'tags') ? 'selected' : 'default'
										}
										onClick={() => handelAddFilter({ key: 'tags', value: tag })}
										key={tag}>
										{tag}
									</SelectPill>
								);
							})}
						</Flex>
					</Flex>
				</div>

				<GroupedEntries entries={data} />

				{isEmpty && <div>Empty</div>}
				{isNotFound && <div>NOT FOUND</div>}
			</Page.Layout>
		</div>
	);
};

export default SearchOverlay;

type EntryCustomType = Pick<IEntry, 'content' | 'emotion' | 'tags'>;

const initialSearchState: Record<keyof EntryCustomType, any> = {
	content: '',
	emotion: '',
	tags: [],
};

enum ActionTypes {
	SET = 'set',
	ADD = 'add',
	REMOVE = 'remove',
	RESET = 'reset',
	RESET_ALL = 'reset_all',
}

type SearchActions = {
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
