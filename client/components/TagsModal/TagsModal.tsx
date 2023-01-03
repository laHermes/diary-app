import Modal from '@components/Modal/Modal';
import { ModalFooter, ModalFooterButton } from '@components/Modal/Styles.';
import Tags from '@components/Tags/Tags';
import { PlusIcon, SearchIcon, TagIcon } from '@heroicons/react/outline';
import { useEntriesTags } from '@hooks/useEntriesQuery';
import React, { useEffect, useState } from 'react';
import { AddNewTagButton, TagButton } from './Styles';

// select tags for the entry
export const TagsModal = ({ state, setState, isOpen, setIsOpen }: any) => {
	const { data: tags } = useEntriesTags();

	const [values, setValues] = useState<string[]>(tags || []);
	const [filteredQuery, setFilteredQuery] = useState<string>('');
	const [filtered, setFiltered] = useState<string[]>([]);

	useEffect(() => {
		setValues(tags);
	}, [tags]);

	// handle select tag
	const handleSelect = (value: string) => {
		setState((state: any) => [...state, value.toLowerCase()]);
	};

	// handle remove selected tag
	const handleRemoveSelect = (value: string) => {
		setState((state: any) =>
			[...state].filter((instance: string) => instance !== value)
		);
	};

	// handle search tag
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const targetValue = event.target.value;
		setFilteredQuery(targetValue.toUpperCase());
		setFiltered(
			values.filter((value: string) => value === targetValue.toLowerCase())
		);
	};

	// handle add new tag
	const handleAddNewTag = (value: string) => {
		setValues((state) => [...state, value.toLowerCase()]);
		handleSelect(value);
		setFilteredQuery('');
		setFiltered([]);
	};

	const notInSearch = (value: string) => {
		return !value.startsWith(filteredQuery.toLowerCase());
	};

	const queryNoMatch = filteredQuery && !filtered.length;

	const DefaultTags = () =>
		!!state?.length &&
		state.map((value: string) => {
			return (
				<TagButton
					key={value}
					onClick={() => handleRemoveSelect(value)}
					$selected
					$hidden={notInSearch(value)}>
					<TagIcon className='h-4 w-4' />
					<span>{value}</span>
				</TagButton>
			);
		});

	const SelectedTags = () => {
		if (!!values?.length) {
			return (
				<>
					{values.map((value: string) => {
						return (
							<TagButton
								key={value}
								onClick={() => handleSelect(value)}
								$hidden={notInSearch(value) || state.includes(value)}>
								<TagIcon className='h-4 w-4' />
								<span>{value}</span>
							</TagButton>
						);
					})}
				</>
			);
		}
		return null;
	};

	return (
		<Modal value={isOpen} onChange={setIsOpen}>
			<Modal.Body>
				<div className='w-full max-w-md'>
					<Tags>
						<Tags.Title>Tags</Tags.Title>
						<Tags.SearchSection>
							<SearchIcon className='h-6 w-6 text-zinc-500' />
							<Tags.Input
								max={28}
								value={filteredQuery}
								onChange={handleSearch}
							/>
						</Tags.SearchSection>

						<div className='max-h-96 divide-y overflow-y-auto dark:divide-zinc-800'>
							<DefaultTags />

							<SelectedTags />

							{/* create new tag if no tag exists */}
							{queryNoMatch && (
								<AddNewTagButton onClick={() => handleAddNewTag(filteredQuery)}>
									<PlusIcon className='h-4 w-4' />
									<span>{filteredQuery}</span>
								</AddNewTagButton>
							)}
						</div>

						<ModalFooter>
							<ModalFooterButton onClick={() => setIsOpen(false)}>
								Done
							</ModalFooterButton>
						</ModalFooter>
					</Tags>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default TagsModal;
