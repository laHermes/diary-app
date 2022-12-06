import React, { useState } from 'react';
import Sidebar from '@components/Sidebar/Sidebar';
import { SearchIcon } from '@heroicons/react/outline';
import FloatingWrite from '@components/FloatingWrite/FloatingWrite';
import { useEntriesQuery, useEntriesTags } from '@hooks/useEntriesQuery';
import MobileNav from '@components/MobileNav/MobileNav';
import Page from '@components/PageComponent/Page';
import { Flex } from '@styles/styles';
import GroupedEntries from '@components/GroupedEntries/GroupedEntries';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// reduce bundle size
const DynamicSearchOverlay = dynamic(
	() => import('@components/SearchOverlay/SearchOverlay'),
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

	return (
		<Page>
			<Page.Layout>
				{!isSearchDialogOpen && (
					<>
						<Flex className='justify-between'>
							<Page.Title>Journal</Page.Title>
							<button
								onClick={handleOpenSearchDialog}
								className='inline-flex justify-center gap-3 px-2 py-2 transition-all duration-200 rounded-full hover:bg-zinc-100 hover:dark:bg-zinc-800 md:justify-start'>
								<SearchIcon className='self-center w-8 h-8 stroke-1' />
							</button>
						</Flex>

						<GroupedEntries entries={allEntries} />

						{/* if there are no entries */}
						{!allEntries && (
							<div className='flex flex-col items-center align-center'>
								No Entries
							</div>
						)}
					</>
				)}

				<FloatingWrite />
			</Page.Layout>
		</Page>
	);
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
