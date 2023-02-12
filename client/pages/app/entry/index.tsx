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
import useModalState from '@hooks/useModalState';

// constants
const CHARACTER_LIMIT = 500;

const MODALS = {
	BOTTOM_SHEET: 'BOTTOM_SHEET',
	TAGS: 'TAGS',
	EMOTIONS: 'EMOTIONS',
	DELETE_ENTRY: 'DELETE_ENTRY',
} as const;

const Index = () => {
	const router = useRouter();

	// data passed as query
	// not the best choice, to be refactored
	const data = router.query;
	const { id: entryId, date: postDate, tags, content, emotion } = data;

	const { onOpenModal, onCloseModal, isModalOpen } = useModalState({});
	const { createEntry, updateEntry, deleteEntry } = usePersistEntries();

	// default states
	const date = postDate ? postDate : new Date();

	// state
	const [emotionState, setEmotionState] = useState<string>(
		(emotion as string) || ''
	);
	const [tagState, setTagState] = useState<string[]>(
		stringToArray({ value: tags })
	);

	// modal states
	// to be refactored into single set state/useReducer
	const [isDeleteEntryModalOpen, setIsDeleteEntryModalOpen] =
		useState<boolean>(false);

	// placeholder can be extracted
	// the use of i18 for localization is possible
	const { editor, editorState } = useTextEditor({
		characterLimit: CHARACTER_LIMIT,
		defaultValue: (content as string) ?? '',
		placeholder: "What's on your mind today?",
	});

	const { hasChanges } = useHasChanges({
		deps: [emotionState, tagState, editorState],
	});
	const totalCharTyped = editor?.storage.characterCount.characters();

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
	console.log(isModalOpen(MODALS.DELETE_ENTRY));

	return (
		<Container>
			<Page.LogoSection>
				<Page.Logo>diaryapp</Page.Logo>
			</Page.LogoSection>

			<TextEditor editor={editor}>
				<TextEditor.MenuBar />
				<TextEditor.Editor />
			</TextEditor>

			<FloatingButton>
				{hasChanges && (
					<FloatingButton.Action onClick={handleSaveEntry}>
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
				isOpen={isModalOpen(MODALS.EMOTIONS)}
				onCloseModal={onCloseModal}
			/>

			<TagsModal
				state={tagState}
				setState={setTagState}
				isOpen={isModalOpen(MODALS.TAGS)}
				onCloseModal={onCloseModal}
			/>
			<ConfirmDeleteEntryModal
				isOpen={isModalOpen(MODALS.DELETE_ENTRY)}
				onCloseModal={onCloseModal}
				entryId={entryId as string}
			/>

			{/* Bottom navigation */}
			<EntryNavigation>
				<EntryNavigation.Action>
					<span className='font-semibold text-zinc-300'>
						{totalCharTyped} / {CHARACTER_LIMIT}
					</span>
				</EntryNavigation.Action>
				<ShortVerticalBorder />
				{/* open tags modal */}
				<EntryNavigation.Action onClick={() => onOpenModal(MODALS.TAGS)}>
					<StyledTagIcon />
				</EntryNavigation.Action>
				<ShortVerticalBorder />
				{/* open emotions modal */}
				<EntryNavigation.Action onClick={() => onOpenModal(MODALS.EMOTIONS)}>
					<StyledFaceSmileIcon />
				</EntryNavigation.Action>
				<ShortVerticalBorder />
				{/* open bottom sheet */}
				<EntryNavigation.Action
					onClick={() => onOpenModal(MODALS.BOTTOM_SHEET)}>
					<StyledDotsHorizontalIcon />
				</EntryNavigation.Action>
			</EntryNavigation>

			{/* Bottom sheet */}
			<BottomSheet
				isOpen={isModalOpen(MODALS.BOTTOM_SHEET)}
				onDismiss={onCloseModal}
				onOpen={() => onOpenModal(MODALS.BOTTOM_SHEET)}>
				<BottomSheet.Sheet>
					<Container className='flex flex-col pb-5 divide-y divide-zinc-800 font-noto text-zinc-200'>
						{/* Date */}
						<BottomSheet.Section>
							<CalendarIcon className='w-6 h-6 min-w-fit' />
							<p className='m-0 text-right'>{date.toString()}</p>
						</BottomSheet.Section>

						{/* Emotions */}
						<BottomSheet.ActionWithClose onClick={onCloseModal}>
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
						<BottomSheet.ActionWithClose onClick={onCloseModal}>
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

						<BottomSheet.ActionWithClose
							onClick={() => onOpenModal(MODALS.DELETE_ENTRY)}>
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
