import React, { useEffect, useState, useTransition } from 'react';
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import { useEntriesQuery, useEntriesTags } from '@hooks/useEntriesQuery';
import Page from '@components/PageComponent/Page';
import { Chip, Flex } from '@styles/styles';
import GroupedEntries from '@components/GroupedEntries/GroupedEntries';
import useFilter, { FILTER } from '@hooks/useFilter';
import { debounce } from 'lodash';
import { ChevronDownIcon } from '@heroicons/react/outline';

const SearchOverlay = ({ setIsOpen }: { setIsOpen?: Function }) => {
	// const [, setTransition] = useTransition();
	const { data: tags } = useEntriesTags();
	const { data: allEntries } = useEntriesQuery();
	const [query, setQuery] = useState('');

	const { filteredData, filters, addFilter } = useFilter({ data: allEntries });

	// if no filters are applied return propValues
	const data = filters.length > 0 ? filteredData : [];

	// Debouncing filter logic
	const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	const handleResetQuery = () => {
		setQuery('');
	};

	const handleFilterSearch = () => {
		// decouples input from filtering
		addFilter({
			value: query,
			filterType: FILTER.SEARCH,
			action: (instance: any) => {
				return instance.content.toLowerCase().includes(query.toLowerCase());
			},
		});
	};

	const handleFilterEmotion = (value: string) => {
		// decouples input from filtering
		addFilter({
			value: value,
			filterType: FILTER.TAG,
			moreThenOneType: true,
			action: (instance: any) => {
				return instance.emotion.toLowerCase().includes(value.toLowerCase());
			},
		});
	};

	const handleFilterTag = (value: string) => {
		// decouples input from filtering
		addFilter({
			value: value,
			filterType: FILTER.TAG,
			moreThenOneType: true,
			action: (instance: any) => {
				return instance.tags.some(
					(tag: string) => tag.toLowerCase() === value.toLowerCase()
				);
			},
		});
	};

	const debounceHandleFilterSearch = debounce(handleFilterSearch, 400);

	useEffect(() => {
		debounceHandleFilterSearch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

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

				<Flex className='px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900'>
					{/* search icon */}
					<SearchIcon className=' h-7 w-7 text-zinc-400' />
					{/* search input */}
					<input
						value={query}
						onChange={handleQuery}
						className='w-full h-12 text-lg bg-transparent border-0 placeholder-zinc-400 ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 dark:text-zinc-200'
						placeholder='Search...'
					/>
					{/* if input has text display delete all text icon*/}
					{query && (
						<XIcon
							onClick={handleResetQuery}
							className='w-6 h-6 text-zinc-700'
						/>
					)}
				</Flex>

				{/* <Flex className='bg-red-200 w-fit'> */}
				{/* <Flex className='flex-col items-start gap-4'>
						<span className='text-xs uppercase'>Search by emotion</span>
						<Flex>
							{tags.map((tag: string) => {
								return (
									<Chip onClick={() => handleFilterTag(tag)} key={tag}>
										{tag}
									</Chip>
								);
							})}
						</Flex>
						<GroupedEntries entries={data} />
					</Flex> */}

				<Flex className='flex-col items-start gap-4 '>
					<span className='text-xs uppercase'>Search by tag</span>
					<Flex>
						{tags.map((tag: string) => {
							return (
								<Chip onClick={() => handleFilterTag(tag)} key={tag}>
									{tag}
								</Chip>
							);
						})}
					</Flex>
				</Flex>
				{/* </Flex> */}

				<GroupedEntries entries={data} />
			</Page.Layout>
		</div>
	);
};

export default SearchOverlay;
