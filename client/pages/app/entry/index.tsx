import React, { useState, Reducer } from 'react';

// hooks
import { useRouter } from 'next/router';
import useHasChanges from '@hooks/useHasChanges';
import useTextEditor from '@hooks/useTextEditor';
import usePersistEntries from '@hooks/usePersistEntries';

// utils
import { stringToArray } from '@utils/index';
import { uniqueId } from 'lodash';

// local data
import { APP_ROUTES } from '@features/Routes/routes';

// modals
import EmotionsModal from '@components/EmotionsModal/EmotionsModal';
import UnsavedChangesModal from '@components/Modals/UnsavedChangesModal/UnsavedChangesModal';
import TagsModal from '@components/Modals/TagsModal/TagsModal';
import ConfirmDeleteEntryModal from '@components/Modals/ConfirmDeleteEntryModal/ConfirmDeleteEntryModal';

// components
import TextEditor from '@components/TextEditor/TextEditor';
import {
	Container,
	Flex,
	StyledDotsHorizontalIcon,
	StyledFaceSmileIcon,
	StyledTagIcon,
} from '@styles/styles';
import { CalendarIcon, TrashIcon, TagIcon } from '@heroicons/react/outline';
import BottomSheet from '@components/Elements/BottomSheet/BottomSheet';
import FloatingButton from '@components/FloatingButton/FloatingButton';
import EntryNavigation from '@components/EntryNavigation/EntryNavigation';
import Page from '@components/PageComponent/Page';
import { ShortVerticalBorder } from '@components/EntryNavigation/Styles';

// icons
import FaceSmileIcon from '@icons/FaceSmileIcon';
import {
	StyledCheckIcon,
	StyledXIcon,
} from '@components/FloatingButton/Styles';

const Index = () => {
	const router = useRouter();

	// data passed as query
	// not the best choice, to be refactored
	const data = router.query;
	const { id: entryId, date: postDate, tags, content, emotion } = data;

	// experimental
	// const initialState = {
	// 	tags: stringToArray({ value: tags }) || [],
	// 	date: postDate ? postDate : new Date().toString(),
	// 	emotion: (emotion as string) || '',
	// 	modal: ModalKind.NULL,
	// };
	// const [state] = useReducer(stateReducer, initialState);

	const { createEntry, updateEntry, deleteEntry } = usePersistEntries();

	// default states
	const characterLimit = 1000;
	const date = postDate ? postDate : new Date();

	// state
	const [emotionState, setEmotionState] = useState<string>(
		(emotion as string) || ''
	);
	const [tagState, setTagState] = useState<string[]>(
		stringToArray({ value: tags })
	);
	// modal states
	// can be refactored into single set state/useReducer
	const [isEmotionModalOpen, setIsEmotionModalOpen] = useState<boolean>(false);
	const [isTagsModalOpen, setIsTagsModalOpen] = useState<boolean>(false);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
	const [isDeleteEntryModalOpen, setIsDeleteEntryModalOpen] =
		useState<boolean>(false);

	// placeholder can be extracted
	// the use of i18 for localization is possible
	const { editor, editorState } = useTextEditor({
		characterLimit,
		defaultValue: (content as string) ?? '',
		placeholder: "What's on your mind today?",
	});

	const { hasChanges } = useHasChanges({
		deps: [emotionState, tagState, editorState],
	});

	// save entry
	const handleSaveEntry = () => {
		// creates object for
		const preparedEntry: IEntry = {
			id: (entryId as string) || uniqueId(),
			date: date.toString(),
			content: editorState as string,
			characters: editor?.storage.characterCount.characters(),
			numberOfWords: editor?.storage.characterCount.words(),
			emotion: emotionState,
			tags: tagState,
		};

		// if entry id exists -> update entry
		// else create new entry
		if (entryId) {
			updateEntry.mutate(preparedEntry);
		} else {
			createEntry.mutate(preparedEntry);
		}
		router.push(APP_ROUTES.JOURNAL);
	};

	// delete entry
	const handleDeleteEntry = () => {
		entryId && deleteEntry.mutate(entryId as string);
		router.back();
	};

	const totalCharTyped = editor?.storage.characterCount.characters();

	return (
		<Container>
			<Page.LogoSection>
				<Page.Logo>diaryapp</Page.Logo>
			</Page.LogoSection>
			<TextEditor editor={editor}>
				<TextEditor.MenuBar />
				<TextEditor.Editor />
			</TextEditor>

			<FloatingButton hasChanges={false}>
				{hasChanges && (
					<FloatingButton.Action onClick={() => handleSaveEntry()}>
						<StyledCheckIcon />
					</FloatingButton.Action>
				)}
				{!hasChanges && (
					<FloatingButton.Action onClick={() => router.back()}>
						<StyledXIcon />
					</FloatingButton.Action>
				)}
			</FloatingButton>

			{/* CONFIRM DISCARD UNSAVED Changes */}
			{hasChanges && <UnsavedChangesModal />}
			<EmotionsModal
				state={emotionState}
				setState={setEmotionState}
				isOpen={isEmotionModalOpen}
				setIsOpen={setIsEmotionModalOpen}
			/>
			<TagsModal
				state={tagState}
				setState={setTagState}
				isOpen={isTagsModalOpen}
				setIsOpen={setIsTagsModalOpen}
			/>
			<ConfirmDeleteEntryModal
				isOpen={isDeleteEntryModalOpen}
				setIsOpen={setIsDeleteEntryModalOpen}
				entryId={entryId as string}
			/>

			{/* Bottom navigation */}
			<EntryNavigation>
				<EntryNavigation.Action>
					<span className='font-semibold text-zinc-300'>
						{totalCharTyped} / {characterLimit}
					</span>
				</EntryNavigation.Action>
				<ShortVerticalBorder />
				{/* open tags modal */}
				<EntryNavigation.Action onClick={() => setIsTagsModalOpen(true)}>
					<StyledTagIcon />
				</EntryNavigation.Action>
				<ShortVerticalBorder />
				{/* open emotions modal */}
				<EntryNavigation.Action onClick={() => setIsEmotionModalOpen(true)}>
					<StyledFaceSmileIcon />
				</EntryNavigation.Action>
				<ShortVerticalBorder />
				{/* open bottom sheet */}
				<EntryNavigation.Action onClick={() => setIsBottomSheetOpen(true)}>
					<StyledDotsHorizontalIcon />
				</EntryNavigation.Action>
			</EntryNavigation>

			{/* Bottom sheet */}
			<BottomSheet
				isOpen={isBottomSheetOpen}
				onDismiss={() => setIsBottomSheetOpen(false)}
				onToggle={() => setIsBottomSheetOpen((state) => !state)}>
				<BottomSheet.Sheet>
					<Container className='flex flex-col pb-5 divide-y divide-zinc-800 font-noto text-zinc-200'>
						{/* Date */}
						<BottomSheet.Section>
							<CalendarIcon className='w-6 h-6 min-w-fit' />
							<p className='m-0 text-right'>{date.toString()}</p>
						</BottomSheet.Section>

						{/* Emotions */}
						<BottomSheet.ActionWithClose
							onClick={() => setIsEmotionModalOpen(true)}>
							<BottomSheet.Section>
								<Flex>
									<FaceSmileIcon className='w-6 h-6 stroke-2 min-w-fit' />
									Emotion
								</Flex>

								<p className='m-0 text-right'>
									{emotionState ? emotionState : 'No emotion selected'}
								</p>
							</BottomSheet.Section>
						</BottomSheet.ActionWithClose>

						{/* TAGS */}
						<BottomSheet.ActionWithClose
							onClick={() => setIsTagsModalOpen(true)}>
							<BottomSheet.Section>
								<Flex>
									<TagIcon className='w-6 h-6 min-w-fit' />
									Tags
								</Flex>
								<Flex className='uppercase '>
									<BottomSheet.ValueList
										values={tagState}
										fallbackValue='No Tags'
									/>
								</Flex>
							</BottomSheet.Section>
						</BottomSheet.ActionWithClose>

						<BottomSheet.ActionWithClose onClick={handleDeleteEntry}>
							<BottomSheet.Section className='bg-red-900/5'>
								<TrashIcon className='w-6 h-6 min-w-fit stroke-red-500' />
								<p className='m-0 text-right text-red-500'>Delete Entry</p>
							</BottomSheet.Section>
						</BottomSheet.ActionWithClose>
					</Container>
				</BottomSheet.Sheet>
			</BottomSheet>
		</Container>
	);
};

export default Index;

// EXPERIMENTAL
// btw. enums should not be used, use as const instead
enum ModalKind {
	BOTTOM_SHEET = 'bottomSheet',
	TAGS = 'tags',
	EMOTIONS = 'emotions',
	NULL = 'null',
}

enum ModalActionKind {
	OPEN = 'openModal',
	CLOSE = 'closeModal',
}

interface ModalAction {
	type: ModalActionKind;
	payload: ModalKind;
}

enum TagActionKind {
	ADD = 'addTag',
	REMOVE = 'removeTag',
}

interface TagAction {
	type: TagActionKind;
	payload: string;
}

type ReducerActionTypes = ModalAction | TagAction;

const stateReducer: Reducer<any, ReducerActionTypes> = (
	state: any,
	action: ReducerActionTypes
) => {
	switch (action.type) {
		case TagActionKind.ADD:
			return [...state, action.payload.toLowerCase()];
		case TagActionKind.REMOVE:
			return [...state].filter(
				(instance: string) => instance !== action.payload.toLowerCase()
			);
		case ModalActionKind.OPEN:
			return { ...state, modal: action.payload };
		case ModalActionKind.CLOSE:
			return { ...state, modal: ModalKind.NULL };
		default:
			throw Error('Unknown action');
	}
};
