import React, { useEffect, useState } from 'react';
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import { useEntriesQuery, useEntriesTags } from '@hooks/useEntriesQuery';
import Page from '@components/PageComponent/Page';
import { Flex } from '@styles/styles';
import GroupedEntries from '@components/GroupedEntries/GroupedEntries';
import useFilter, { FILTER, FilterObject } from '@hooks/useFilter';
import { debounce } from 'lodash';
import { ChevronDownIcon } from '@heroicons/react/outline';
import SelectPill from '@components/Elements/SelectPill/SelectPill';
import emotionContent from '@config/content.json';

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
	const [query, setQuery] = useState('');

	const { filteredData, filters, addFilter } = useFilter({ data: propsData });

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
			filterType: FILTER.EMOTION,
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
			moreThenOneType: false,
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

	const isValueInFilter = (providedValue: FilterObject['value']) =>
		!!filters.filter(
			({ value }: Pick<FilterObject, 'value'>) => value === providedValue
		).length;

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

				<div className='grid gap-2 -mt-6 sm:grid-cols-2'>
					<Flex className='max-w-1/2 flex-col items-start gap-4'>
						<span className='text-xs uppercase'>Search by emotion</span>
						<Flex className='flex-wrap'>
							{emotionContent.emotions.map(({ text }: { text: string }) => {
								return (
									<SelectPill
										variant={isValueInFilter(text) ? 'selected' : 'default'}
										onClick={() => handleFilterEmotion(text)}
										key={text}>
										{text}
									</SelectPill>
								);
							})}
						</Flex>
					</Flex>

					<Flex className='max-w-1/2 flex-col items-start gap-4'>
						<span className='text-xs uppercase'>Search by tag</span>
						<Flex className='flex-wrap'>
							{tags.map((tag: string) => {
								return (
									<SelectPill
										variant={isValueInFilter(tag) ? 'selected' : 'default'}
										onClick={() => handleFilterTag(tag)}
										key={tag}>
										{tag}
									</SelectPill>
								);
							})}
						</Flex>
					</Flex>
				</div>

				<GroupedEntries entries={data} />
			</Page.Layout>
		</div>
	);
};

export default SearchOverlay;
