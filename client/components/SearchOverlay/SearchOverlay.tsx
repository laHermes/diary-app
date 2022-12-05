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
	console.log('filters', filters);
	console.log('filteredData', filteredData);
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
		<div className='absolute inset-x-0 mx-auto flex h-screen justify-center bg-backgroundLight pt-12 pl-0 dark:bg-black'>
			<Page.Layout>
				<Flex className='justify-between'>
					<Page.Title>Search</Page.Title>
					<button
						onClick={() => setIsOpen && setIsOpen(false)}
						className='inline-flex justify-center gap-3 rounded-full px-2 py-2 transition-all duration-200 hover:bg-zinc-100 hover:dark:bg-zinc-800 md:justify-start'>
						<ChevronDownIcon className='h-8 w-8 self-center stroke-2' />
					</button>
				</Flex>

				<Flex className='rounded-xl bg-zinc-50 px-4 py-2 dark:bg-zinc-900'>
					<SearchIcon className=' h-7 w-7 text-zinc-400' />
					<input
						value={query}
						onChange={handleQuery}
						className='h-12 w-full border-0 bg-transparent text-lg placeholder-zinc-400 ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 dark:text-zinc-200'
						placeholder='Search...'
					/>
					{query && (
						<XIcon
							onClick={handleResetQuery}
							className='h-6 w-6 text-zinc-700'
						/>
					)}
				</Flex>

				<Flex className='-mt-4 flex-col items-start gap-4'>
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
					<GroupedEntries entries={data} />
				</Flex>
			</Page.Layout>
		</div>
	);
};

export default SearchOverlay;
