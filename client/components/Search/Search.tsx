'use client';
import React from 'react';
import clsx from 'clsx';

// hooks & utils
import useSearch from './useSearch';
import { filterData, isValueInFilter } from '@utils/filterUtils';

// components
import MotionContainer from '@components/Layout/MotionContainer';
import Message from '@components/Message/Message';
import Page from '@components/Layout/Page/Page';
import GroupedEntries from '@components/Entry/Entries/GroupedEntries';
import SelectPill from '@components/Elements/SelectPill/SelectPill';
import CloseSearchButton from './CloseSearchButton';
import { Flex } from '@styles/styles';
import {
	FiltersSection,
	FiltersSectionItem,
	FiltersSectionTitle,
	SearchInput,
	SearchInputWrapper,
} from './Styles';

// icons
import { SearchIcon, XIcon } from '@heroicons/react/outline';

// local data
import emotionContent from '@data/content.json';
import { DEFAULT_ENTRY_MESSAGES } from '@config/messages';

interface SearchProps {
	setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	data: any[];
	tags: string[];
}

const Search = ({ setIsOpen, data: propsData, tags }: SearchProps) => {
	// manages filter state
	const {
		searchFilterState,
		handelSetFilter,
		handelAddFilter,
		handleQuery,
		handleResetQuery,
	} = useSearch();

	// filters data
	const { data: filteredData, filter } = filterData({
		data: propsData,
		filter: searchFilterState,
	});

	const data = filter ? filteredData : [];
	const isNotFound = filter && filteredData?.length === 0;

	const getPillVariant = (value: string, key: keyof IEntry) =>
		isValueInFilter(searchFilterState, value, key) ? 'selected' : 'default';

	return (
		<MotionContainer>
			<Page.Layout>
				<Flex className='justify-between'>
					<Page.Title>Search</Page.Title>
					<CloseSearchButton onClick={() => setIsOpen?.(false)} />
				</Flex>

				<SearchInputWrapper>
					<SearchIcon className='h-7 w-7 text-zinc-400' />
					<SearchInput
						autoFocus
						value={searchFilterState.content}
						onChange={handleQuery}
						placeholder='Search...'
					/>
					{/* if input has text display delete all text icon*/}
					<XIcon
						onClick={handleResetQuery}
						className={clsx(
							' h-6 w-6 cursor-pointer text-zinc-700',
							searchFilterState.content ? 'block' : 'hidden'
						)}
					/>
				</SearchInputWrapper>

				<FiltersSection>
					<FiltersSectionItem>
						<FiltersSectionTitle>Search by emotion</FiltersSectionTitle>
						<Flex className='flex-wrap'>
							{emotionContent.emotions.map(({ text }: { text: string }) => {
								return (
									<SelectPill
										variant={getPillVariant(text, 'emotion')}
										onClick={() =>
											handelSetFilter({ key: 'emotion', payload: text })
										}
										key={text}>
										{text}
									</SelectPill>
								);
							})}
						</Flex>
					</FiltersSectionItem>

					<FiltersSectionItem>
						<FiltersSectionTitle>Search by tag</FiltersSectionTitle>
						<Flex className='flex-wrap'>
							{tags.map((tag: string) => {
								return (
									<SelectPill
										variant={getPillVariant(tag, 'tags')}
										onClick={() =>
											handelAddFilter({ key: 'tags', payload: tag })
										}
										key={tag}>
										{tag}
									</SelectPill>
								);
							})}
						</Flex>
					</FiltersSectionItem>
				</FiltersSection>

				<GroupedEntries entries={data} />

				<Message
					hidden={!isNotFound}
					message={DEFAULT_ENTRY_MESSAGES.NO_SEARCH_RESULTS}
				/>
			</Page.Layout>
		</MotionContainer>
	);
};

export default Search;
