import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// hooks
import { useRouter } from 'next/router';
import useTextEditor from '@hooks/useTextEditor';
import useHasChanges from '@hooks/useHasChanges';

// utils
import { stringToArray } from '@utils/index';

// store
import {
	addDemoEntry,
	removeDemoEntry,
	selectTags,
	updateDemoEntry,
} from '@store/demoEntrySlice';

// local data

// modals
import ConfirmDeleteEntryModal from '@components/Modals/ConfirmDeleteEntryModal/ConfirmDeleteEntryModal';

// components
import { Container, Flex } from '@styles/styles';
import Page from '@components/Layout/Page/Page';
import TextEditor from '@components/TextEditor/TextEditor';
import BottomSheet from '@components/Elements/BottomSheet/BottomSheet';
import EntryNavigation from '@components/Entry/EntryNavigation/EntryNavigation';
import { ShortVerticalBorder } from '@components/Entry/EntryNavigation/Styles';
import FloatingButton from '@components/FloatingButton/FloatingButton';

//icons
import FaceSmileIcon from '@icons/FaceSmileIcon';
import {
	StyledCheckIcon,
	StyledXIcon,
} from '@components/FloatingButton/Styles';
import {
	StyledDotsHorizontalIcon,
	StyledFaceSmileIcon,
	StyledTagIcon,
} from '@styles/styles';
import { CalendarIcon, TrashIcon, TagIcon } from '@heroicons/react/outline';
import useModalState from '@hooks/useModalState';
import EmotionsModal from '@components/Modals/EmotionsModal/EmotionsModal';
import TagsModal from '@components/Modals/TagsModal/TagsModal';
import { DEMO_ROUTES } from '@features/Routes/routes';

// constants
const CHARACTER_LIMIT = 500;

// Modal types
const MODALS = {
	BOTTOM_SHEET: 'BOTTOM_SHEET',
	TAGS: 'TAGS',
	EMOTIONS: 'EMOTIONS',
	DELETE_ENTRY: 'DELETE_ENTRY',
} as const;

const Index = () => {
	const router = useRouter();
	const data = router.query;

	// redux dispatch
	const dispatch = useDispatch();

	// data passed as query
	const { id: entryId, date: postDate, tags, content, emotion } = data;

	// default states
	const date = postDate ? postDate : new Date();

	// state
	const [emotionState, setEmotionState] = useState<string>(
		(emotion as string) || ''
	);
	const [tagState, setTagState] = useState<string[]>(
		stringToArray({ value: tags })
	);

	// placeholder can be extracted
	// the use of i18 for localization is possible
	const { editor, editorState } = useTextEditor({
		characterLimit: CHARACTER_LIMIT,
		defaultValue: (content as string) ?? '',
		placeholder: "What's on your mind today?",
	});

	const { onOpenModal, onCloseModal, isModalOpen } = useModalState({});

	const { hasChanges } = useHasChanges({
		deps: [emotionState, tagState, editorState],
	});

	// save entry
	const handleSaveEntry = () => {
		const entryToSave = {
			date: date.toString(),
			content: editorState,
			characters: editor?.storage.characterCount.characters(),
			words: editor?.storage.characterCount.words(),
			emotion: emotionState,
			tags: tagState,
		};

		// if entry id exists -> update entry
		// else create new entry
		if (entryId) {
			dispatch(
				updateDemoEntry({
					id: entryId,
					...entryToSave,
				})
			);
		} else {
			dispatch(addDemoEntry({ ...entryToSave }));
		}

		router.push(DEMO_ROUTES.JOURNAL);
	};

	// delete entry
	const handleDeleteEntry = () => {
		if (entryId) {
			dispatch(removeDemoEntry({ id: entryId }));
		}
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

			{/* FLOATING BUTTON */}
			<FloatingButton>
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

			{/* lazy load */}
			<ConfirmDeleteEntryModal
				onDeleteFunction={handleDeleteEntry}
				onSuccess={() => router.push(DEMO_ROUTES.JOURNAL)}
				isOpen={isModalOpen(MODALS.DELETE_ENTRY)}
				onCloseModal={onCloseModal}
			/>

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
