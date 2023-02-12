import React, { useCallback, useEffect, useState } from 'react';
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
import emotionContent from '@config/content.json';

// modals
import Modal from '@components/Elements/Modal/Modal';
import ConfirmDeleteEntryModal from '@components/Modals/ConfirmDeleteEntryModal/ConfirmDeleteEntryModal';

// components
import { Container, Flex } from '@styles/styles';
import Page from '@components/PageComponent/Page';
import TextEditor from '@components/TextEditor/TextEditor';
import BottomSheet from '@components/Elements/BottomSheet/BottomSheet';
import Button from '@components/Elements/Button/Button';
import EntryNavigation from '@components/EntryNavigation/EntryNavigation';
import { ShortVerticalBorder } from '@components/EntryNavigation/Styles';
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
import {
	CalendarIcon,
	TrashIcon,
	TagIcon,
	SearchIcon,
	PlusIcon,
} from '@heroicons/react/outline';

const Index = () => {
	const router = useRouter();
	const data = router.query;

	// redux dispatch
	const dispatch = useDispatch();

	// data passed as query
	const { id: entryId, date: postDate, tags, content, emotion } = data;

	// default states
	const defaultContent = (content as string) ?? '';
	const defaultTags = stringToArray({ value: tags });
	const defaultEmotion = (emotion as string) || '';
	const characterLimit = 1000;

	// state
	const [emotionState, setEmotionState] = useState<string>(defaultEmotion);
	const [tagState, setTagState] = useState<string[]>(defaultTags);
	const { editor, editorState } = useTextEditor({
		characterLimit,
		defaultValue: defaultContent,
		placeholder: "Hello Anonymous, what's on your mind today?",
	});

	const date = postDate ? postDate : new Date();

	// modal states
	const [isEmotionModalOpen, setIsEmotionModalOpen] = useState<boolean>(false);
	const [isTagsModalOpen, setIsTagsModalOpen] = useState<boolean>(false);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
	const [isDeleteEntryModalOpen, setIsDeleteEntryModalOpen] =
		useState<boolean>(false);

	const { hasChanges } = useHasChanges({
		deps: [emotionState, tagState, editorState],
	});

	const handleGoBack = () => {
		if (window?.history?.state?.idx > 0) {
			router.back();
		}
		router.push('/demo/journal');
	};

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

		handleGoBack();
	};

	// delete entry
	const handleDeleteEntry = () => {
		if (entryId) {
			dispatch(removeDemoEntry({ id: entryId }));
		}
		handleGoBack();
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

			<ConfirmDeleteEntryModal
				isOpen={isDeleteEntryModalOpen}
				onCloseModal={setIsDeleteEntryModalOpen}
				entryId={entryId as string}
			/>

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

			{/* Bottom Sheet */}
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

// on click back
export const ConfirmModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [finishStatus, setFinishStatus] = useState<boolean>(false);
	const router = useRouter();

	const onBackButtonEvent = useCallback(
		(e: any) => {
			e.preventDefault();
			setIsModalOpen(true);
			if (finishStatus) {
				router.push('/demo/journal');
			} else {
				window.history.pushState(null, '', window.location.pathname);
				setFinishStatus(false);
			}
		},
		[router, finishStatus]
	);

	useEffect(() => {
		window.history.pushState(null, '', window.location.pathname);
		window.addEventListener('popstate', onBackButtonEvent);
		return () => {
			window.removeEventListener('popstate', onBackButtonEvent);
		};
	}, [onBackButtonEvent]);

	const cancelHandler = () => {
		setIsModalOpen(false);
	};

	const backHandler = () => {
		setFinishStatus(true);
		router.push('/demo/journal');
	};

	if (isModalOpen) {
		return (
			<Modal value={isModalOpen} onChange={setIsModalOpen}>
				<Modal.Body>
					<div className='p-3 text-center bg-white rounded-md dark:bg-zinc-900 '>
						<p className='text-xl font-semibold'>Unsaved entry will be lost!</p>
						<p className='text-xl'>Are you sure you want to quit?</p>
						<div className='inline-flex items-center justify-between gap-2 '>
							<Button $positive onClick={cancelHandler}>
								Cancel
							</Button>
							<Button $negative onClick={backHandler}>
								Quit
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		);
	}

	return null;
};

//TODO: Refactor
// select emotions for the entry
export const EmotionsModal = ({ state, setState, isOpen, setIsOpen }: any) => {
	const handleSetState = (emotion: string) => {
		setState((state: any) => (state !== emotion ? emotion : ''));
	};

	return (
		<Modal value={isOpen} onChange={setIsOpen}>
			<Modal.Body>
				<div className='w-full bg-white divide-y rounded-xl dark:bg-zinc-900'>
					<div className='px-4 pt-4'>
						<p className='font-medium text-left'>Emotions</p>
						<p className='text-left '>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt
						</p>
					</div>
					{emotionContent.emotions.map((emotion) => {
						return (
							<div key={emotion.value}>
								<button
									onClick={() => handleSetState(emotion.text)}
									className={`${
										emotion.text === (state.text || state) &&
										'bg-indigo-100 text-indigo-700 hover:bg-indigo-100'
									}   w-full p-3  text-left font-jost text-sm uppercase tracking-wider hover:bg-indigo-200/80`}>
									<span>{emotion.value}</span>
								</button>
							</div>
						);
					})}

					<div className='flex justify-center py-4'>
						<button
							onClick={() => setIsOpen(false)}
							className='inline-flex justify-center gap-3 px-8 py-4 text-xl font-semibold text-center text-white transition-all duration-200 bg-indigo-800 rounded-full w-fit font-jost hover:bg-indigo-900 hover:dark:bg-slate-800'>
							Done
						</button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

//TODO: Refactor
// select tags for the entry
export const TagsModal = ({ state, setState, isOpen, setIsOpen }: any) => {
	const tags = useSelector(selectTags);
	const [values, setValues] = useState<string[]>(tags);

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

	return (
		<Modal value={isOpen} onChange={setIsOpen}>
			<Modal.Body>
				<div className='w-full bg-white divide-y rounded-xl dark:bg-zinc-900 '>
					<div className='px-4 pt-4'>
						<p className='font-medium text-left'>Tags</p>
					</div>

					<div className='flex items-center w-full px-4'>
						<SearchIcon className='w-6 h-6 text-zinc-500' />
						<input
							type='text'
							max={28}
							className='w-full h-12 text-sm tracking-wider bg-transparent border-0 text-zinc-800 placeholder-zinc-400 focus:ring-0'
							placeholder='Search...'
							value={filteredQuery}
							onChange={handleSearch}
						/>
					</div>
					<div className='overflow-y-auto divide-y max-h-96'>
						{state &&
							state.map((value: string) => {
								const isHidden = !value.startsWith(filteredQuery.toLowerCase());
								return (
									<button
										key={value}
										onClick={() => handleRemoveSelect(value)}
										className={`${
											value === value &&
											'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
										} ${
											isHidden && 'hidden'
										} flex w-full items-center gap-4 p-3 text-left font-jost text-sm font-medium uppercase tracking-wider hover:bg-indigo-100`}>
										<TagIcon className='w-4 h-4' />

										<span>{value}</span>
									</button>
								);
							})}

						{values?.length &&
							values.map((value) => {
								const isHidden =
									state.includes(value) ||
									!value.startsWith(filteredQuery.toLowerCase());

								return (
									<button
										key={value}
										onClick={() => handleSelect(value)}
										className={`${isHidden && 'hidden'}	
								   flex w-full items-center gap-4 p-3 text-left font-jost text-sm font-medium uppercase tracking-wider hover:bg-indigo-100/80`}>
										<TagIcon className='w-4 h-4' />
										<span>{value}</span>
									</button>
								);
							})}

						{filteredQuery && !filtered.length && (
							<button
								onClick={() => handleAddNewTag(filteredQuery)}
								className='flex w-full items-center gap-4 p-3 text-left font-jost text-sm uppercase tracking-wider hover:bg-indigo-200/80'>
								<PlusIcon className='w-4 h-4' />
								<span>{filteredQuery}</span>
							</button>
						)}
					</div>

					<div className='flex justify-center py-4'>
						<button
							onClick={() => setIsOpen(false)}
							className='inline-flex justify-center gap-3 px-8 py-4 text-xl font-semibold text-center text-white transition-all duration-200 bg-indigo-500 rounded-full w-fit font-jost hover:bg-indigo-600 hover:dark:bg-slate-800'>
							Done
						</button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};
