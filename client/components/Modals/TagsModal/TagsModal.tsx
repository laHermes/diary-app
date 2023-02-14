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

// select tags for the entry
// THIS WHOLE AREA SHOULD BE REFACTORED USING REDUCERS
export const TagsModal = ({ state, setState, isOpen, onCloseModal }: any) => {
	const { data: tags } = useEntriesTags();
	const [values, setValues] = useState<string[]>(tags || []);
	const [filteredQuery, setFilteredQuery] = useState<string>('');
	const [filtered, setFiltered] = useState<string[]>([]);

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
					<TagIcon className='w-4 h-4' />
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
								<TagIcon className='w-4 h-4' />
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
							<DefaultTags />
							<SelectedTags />

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

// EXPERIMENTAL
// btw. enums should not be used, use as const instead

// enum ModalActionKind {
// 	OPEN = 'openModal',
// 	CLOSE = 'closeModal',
// }

// interface ModalAction {
// 	type: ModalActionKind;
// 	payload: ModalKind;
// }

// enum TagActionKind {
// 	ADD = 'addTag',
// 	REMOVE = 'removeTag',
// }

// interface TagAction {
// 	type: TagActionKind;
// 	payload: string;
// }

// type ReducerActionTypes = ModalAction | TagAction;

// const stateReducer: Reducer<any, ReducerActionTypes> = (
// 	state: any,
// 	action: ReducerActionTypes
// ) => {
// 	switch (action.type) {
// 		case TagActionKind.ADD:
// 			return [...state, action.payload.toLowerCase()];
// 		case TagActionKind.REMOVE:
// 			return [...state].filter(
// 				(instance: string) => instance !== action.payload.toLowerCase()
// 			);
// 		case ModalActionKind.OPEN:
// 			return { ...state, modal: action.payload };
// 		case ModalActionKind.CLOSE:
// 			return { ...state, modal: ModalKind.NULL };
// 		default:
// 			throw Error('Unknown action');
// 	}
// };
