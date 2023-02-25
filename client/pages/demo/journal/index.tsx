import React, { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { selectEntries, selectTags } from '@store/entrySlice';

// components
import Page from '@components/Layout/Page/Page';
import { Flex } from '@styles/styles';
import Sidebar from '@components/Navigation/Sidebar/Sidebar';
import FloatingWrite from '@components/FloatingWrite/FloatingWrite';
import MobileNav from '@components/Navigation/MobileNav/MobileNav';
import GroupedEntries from '@components/Entry/Entries/GroupedEntries';

// icons
import { SearchIcon } from '@heroicons/react/outline';
import Message from '@components/Message/Message';
import { DEFAULT_ENTRY_MESSAGES } from '@config/messages';

// reduce bundle size
const DynamicSearchOverlay = dynamic(
	() => import('@components/Search/Search'),
	{
		suspense: true,
	}
);

const JournalPage = () => {
	const tags = useSelector(selectTags);
	const allEntries = useSelector(selectEntries);

	const [isSearchDialogOpen, setIsSearchDialogOpen] = useState<boolean>(false);
	const handleOpenSearchDialog = () => setIsSearchDialogOpen(true);

	if (isSearchDialogOpen) {
		return (
			<Suspense fallback={`Loading...`}>
				<DynamicSearchOverlay
					data={allEntries}
					tags={tags}
					setIsOpen={setIsSearchDialogOpen}
				/>
			</Suspense>
		);
	}
	if (!isSearchDialogOpen) {
		return (
			<Page>
				<Page.Layout>
					<Flex className='justify-between'>
						<Page.Title>Journal</Page.Title>
						<button
							onClick={handleOpenSearchDialog}
							className='inline-flex justify-center gap-3 px-2 py-2 transition-all duration-200 rounded-full hover:bg-zinc-100 hover:dark:bg-zinc-800 md:justify-start'>
							<SearchIcon className='self-center w-8 h-8 stroke-1' />
						</button>
					</Flex>

					<GroupedEntries entries={allEntries} />

					<Message
						hidden={!!allEntries?.length}
						message={DEFAULT_ENTRY_MESSAGES.NO_ENTRIES}
					/>

					<FloatingWrite />
				</Page.Layout>
			</Page>
		);
	}

	return null;
};

JournalPage.getLayout = function getLayout(page: React.ReactElement) {
	return (
		<>
			<Sidebar />
			{page}
			<MobileNav />
		</>
	);
};

export default JournalPage;
