'use client';
import React from 'react';

// hooks
import { useEntriesTags } from '@hooks/useEntriesQuery';

// components
import Modal from '@components/Elements/Modal/Modal';
import {
	ModalFooter,
	ModalFooterButton,
} from '@components/Elements/Modal/Styles.';
import {
	AddNewTagButton,
	TagsHeader,
	TagsInput,
	TagsListWrapper,
	TagsSearchSection,
	TagsWrapper,
} from './Styles';

// icons
import { PlusIcon, SearchIcon } from '@heroicons/react/outline';
import useTags from './useTags';
import { DEFAULT_TAGS } from '@data/tags';
import TagsList from './TagsList';

// select tags for the entry
interface ITagsModal {
	state: string[];
	setState: React.Dispatch<React.SetStateAction<string[]>>;
	isOpen: boolean;
	onCloseModal: () => void;
	additionalTags?: string[];
}

export const TagsModal = ({
	state,
	setState,
	isOpen,
	onCloseModal,
	additionalTags,
}: ITagsModal) => {
	const tagsFromPrevEntries = additionalTags || [];
	const defaultTags = [...tagsFromPrevEntries, ...DEFAULT_TAGS];
	const {
		state: tagState,
		handleCreateTag,
		handleRemoveSelectedTag,
		handleSearchTag,
		handleSelectTag,
		isTagInSearch,
		notSelectedTags,
	} = useTags({ selectedTags: state, defaultTags: defaultTags });

	const { filteredQuery, filtered } = tagState;

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
				<TagsWrapper>
					<TagsHeader>Tags</TagsHeader>
					<TagsSearchSection>
						<SearchIcon className='w-6 h-6 text-zinc-500' />
						<TagsInput
							value={filteredQuery}
							onChange={handleSearch}
							type='text'
							max={28}
							placeholder='Search...'
						/>
					</TagsSearchSection>

					<TagsListWrapper>
						<TagsList
							data={state}
							filterFunction={isTagInSearch}
							onClick={handleRemoveSelect}
							selected={true}
						/>

						<TagsList
							data={notSelectedTags}
							filterFunction={isTagInSearch}
							onClick={handleSelect}
						/>

						{/* create new tag if no tag exists */}
						{queryNoMatch && (
							<AddNewTagButton onClick={() => handleAddNewTag(filteredQuery)}>
								<PlusIcon className='w-4 h-4' />
								<span>{filteredQuery}</span>
							</AddNewTagButton>
						)}
					</TagsListWrapper>

					<ModalFooter>
						<ModalFooterButton onClick={onCloseModal}>Done</ModalFooterButton>
					</ModalFooter>
				</TagsWrapper>
			</Modal.Body>
		</Modal>
	);
};

export default TagsModal;
