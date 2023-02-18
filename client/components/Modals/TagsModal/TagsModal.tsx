import React, { useState } from 'react';

// hooks
import { useEntriesTags } from '@hooks/useEntriesQuery';

// components
import Modal from '@components/Elements/Modal/Modal';
import {
	ModalFooter,
	ModalFooterButton,
} from '@components/Elements/Modal/Styles.';
import Tags from '@components/Modals/TagsModal/Tags';
import { AddNewTagButton, TagButton } from './Styles';

// icons
import { PlusIcon, SearchIcon, TagIcon } from '@heroicons/react/outline';
import useTags from './useTags';
import { DEFAULT_TAGS } from '@data/tags';

// select tags for the entry
// THIS WHOLE AREA SHOULD BE REFACTORED USING REDUCERS
export const TagsModal = ({ state, setState, isOpen, onCloseModal }: any) => {
	const { data: tags } = useEntriesTags();
	const tagsFromPrevEntries = tags || [];
	const defaultTags = [...tagsFromPrevEntries, ...DEFAULT_TAGS];

	const {
		state: tagState,
		handleCreateTag,
		handleRemoveSelectedTag,
		handleSearchTag,
		handleSelectTag,
		isTagInSearch,
	} = useTags({ selectedTags: state, defaultTags: defaultTags });

	const { values, filteredQuery, filtered } = tagState;

	// handle select tag
	const handleSelect = (value: string) => {
		handleSelectTag(value);
		setState((state: any) => [...state, value.toLowerCase()]);
	};

	// handle remove selected tag
	const handleRemoveSelect = (value: string) => {
		setState((state: any) =>
			[...state].filter((instance: string) => instance !== value)
		);
		handleRemoveSelectedTag(value);
	};

	// handle search tag
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const targetValue = event.target.value;
		handleSearchTag(targetValue);
	};

	// handle add new tag
	const handleAddNewTag = (value: string) => {
		handleCreateTag(value);
		handleSelect(value);
	};

	const queryNoMatch = filteredQuery && !filtered.length;

	return (
		<Modal value={isOpen} onCloseModal={onCloseModal}>
			<Modal.Body>
				<div className='w-full max-w-md'>
					<Tags>
						<Tags.Title>Tags</Tags.Title>
						<Tags.SearchSection>
							<SearchIcon className='w-6 h-6 text-zinc-500' />
							<Tags.Input
								max={28}
								value={filteredQuery}
								onChange={handleSearch}
							/>
						</Tags.SearchSection>

						<div className='overflow-y-auto divide-y max-h-96 dark:divide-zinc-800'>
							{!!state?.length &&
								state.map((value: string) => {
									return (
										<TagButton
											key={value}
											onClick={() => handleRemoveSelect(value)}
											$selected
											$hidden={!isTagInSearch(value)}>
											<TagIcon className='w-4 h-4' />
											<span>{value}</span>
										</TagButton>
									);
								})}

							{!!values?.length &&
								values.map((value: string) => {
									return (
										<TagButton
											key={value}
											onClick={() => handleSelect(value)}
											$hidden={!isTagInSearch(value) || state.includes(value)}>
											<TagIcon className='w-4 h-4' />
											<span>{value}</span>
										</TagButton>
									);
								})}

							{/* create new tag if no tag exists */}
							{queryNoMatch && (
								<AddNewTagButton onClick={() => handleAddNewTag(filteredQuery)}>
									<PlusIcon className='w-4 h-4' />
									<span>{filteredQuery}</span>
								</AddNewTagButton>
							)}
						</div>

						<ModalFooter>
							<ModalFooterButton onClick={onCloseModal}>Done</ModalFooterButton>
						</ModalFooter>
					</Tags>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default TagsModal;
