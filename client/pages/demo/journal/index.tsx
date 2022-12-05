import React, { useState } from 'react';
import { Container } from '@styles/styles';
import { useSelector } from 'react-redux';
import {
	selectEntries,
	selectGroupedByMonthEntries,
} from '@store/demoEntrySlice';
import EntryCard from '@components/EntryCard/EntryCard';
import Sidebar from '@components/Sidebar/Sidebar';
import { SearchIcon } from '@heroicons/react/outline';
import FloatingWrite from '@components/FloatingWrite/FloatingWrite';
import { Empty } from 'antd';
import { PageTitle } from '@components/PageComponent/Styles';
import SearchDialog from '@components/SearchDialog/SearchDialog';
import MobileNav from '@components/MobileNav/MobileNav';

const JournalPage = () => {
	const grouped = useSelector(selectGroupedByMonthEntries);
	const allEntries = useSelector(selectEntries);
	const [isSearchDialogOpen, setIsSearchDialogOpen] = useState<boolean>(false);

	const handleOpenSearchDialog = () => setIsSearchDialogOpen(true);

	return (
		<Container>
			<div className='flex flex-col gap-10 pt-12'>
				<div className='inline-flex justify-between'>
					<PageTitle>Journal</PageTitle>
					<button
						onClick={handleOpenSearchDialog}
						className='inline-flex justify-center gap-3 px-2 py-2 transition-all duration-200 rounded-full hover:bg-zinc-100 hover:dark:bg-zinc-800 md:justify-start'>
						<SearchIcon className='self-center w-8 h-8 stroke-1' />
					</button>
				</div>

				<FloatingWrite />

				<SearchDialog
					values={allEntries}
					isOpen={isSearchDialogOpen}
					setIsOpen={setIsSearchDialogOpen}
				/>

				{/* IF no stories */}
				<div className='flex flex-col items-center align-center'>
					{grouped?.length === 0 && (
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							description={
								<span className='text-black dark:text-white'>No stories</span>
							}
						/>
					)}
				</div>
			</div>
		</Container>
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
