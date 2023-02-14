import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// hooks
import { useEntriesQuery, useEntriesTags } from '@hooks/useEntriesQuery';

// local data
import Message, { DEFAULT_ENTRY_MESSAGES } from '@components/Message/Message';

// components
import Page from '@components/Layout/Page/Page';
import { Flex } from '@styles/styles';
import FloatingWrite from '@components/FloatingWrite/FloatingWrite';
import GroupedEntries from '@components/Entry/Entries/GroupedEntries';

// navigation
import Sidebar from '@components/Navigation/Sidebar/Sidebar';
import MobileNav from '@components/Navigation/MobileNav/MobileNav';

// icons
import { SearchIcon } from '@heroicons/react/outline';

// reduce bundle size
const DynamicSearchOverlay = dynamic(
	() => import('@components/Search/Search'),
	{
		suspense: true,
	}
);

const JournalPage = () => {
	const { data: allEntries } = useEntriesQuery();
	const { data: tags } = useEntriesTags();

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
							className='inline-flex justify-center gap-3 rounded-full px-2 py-2 transition-all duration-200 hover:bg-zinc-100 hover:dark:bg-zinc-800 md:justify-start'>
							<SearchIcon className='h-8 w-8 self-center stroke-1' />
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
