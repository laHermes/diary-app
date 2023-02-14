import React, { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';

// components
import BottomSheet from '@components/Elements/BottomSheet/BottomSheet';
import {
	Card,
	CardBody,
	CardLeft,
	CardRight,
} from '@components/Elements/Card/Styles';
import SanitizeHTML from '@components/Elements/SanitizeHTML/SanitizeHTML';
import { Container } from '@styles/styles';

// icons
import { CalendarIcon, TagIcon } from '@heroicons/react/outline';
import DotsHorizontalIcon from '@icons/DotsHorizontalIcon';
import FaceSmileIcon from '@icons/FaceSmileIcon';
import { useRouter } from 'next/router';
import ChipList from '@components/Elements/Chip/ChipList';

type EntryCardType = IEntry;

const EntryCard = ({
	id,
	content,
	date: propsDate,
	emotion,
	tags,
}: EntryCardType) => {
	const router = useRouter();
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

	const areaPrefix = router.pathname.includes('app') ? '/app' : '/demo';
	const path = areaPrefix + '/entry';

	const date = propsDate as string;

	// this should be replaced
	const query = {
		id: id,
		content: content,
		date: date as string,
		emotion: emotion,
		tags: tags,
	};

	return (
		<>
			<Card>
				<CardBody>
					<CardLeft>
						<MiniCalendar date={date} />
						<button
							onClick={() => setIsBottomSheetOpen(true)}
							className='flex justify-center w-12 h-12 p-1 mx-auto transition-all rounded-full hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-700'>
							<DotsHorizontalIcon className='stroke-stone-200' />
						</button>
					</CardLeft>

					<Link
						href={{
							pathname: path,
							query: query,
						}}
						as={path}>
						<CardRight>
							<SanitizeHTML content={content} />
							<div className='flex flex-wrap w-full gap-2 p-2 mt-2'>
								<ChipList data={emotion} />
								<ChipList data={tags} />
							</div>
						</CardRight>
					</Link>
				</CardBody>
			</Card>

			<BottomSheet
				isOpen={isBottomSheetOpen}
				onDismiss={() => setIsBottomSheetOpen(false)}
				onOpen={() => setIsBottomSheetOpen((state) => !state)}>
				<BottomSheet.Sheet>
					<Container className='flex flex-col px-2 pb-5 divide-y divide-zinc-800 font-jost text-zinc-200'>
						<BottomSheet.Section>
							<CalendarIcon className='w-6 h-6 stroke-2 min-w-fit' />
							<p className='m-0'>{date}</p>
						</BottomSheet.Section>

						<BottomSheet.Section>
							<FaceSmileIcon className='w-6 h-6 stroke-2 min-w-fit' />
							<p className='m-0'>{emotion ? emotion : 'No emotion selected'}</p>
						</BottomSheet.Section>

						{/* TAGS */}
						<BottomSheet.Section>
							<TagIcon className='w-6 h-6 stroke-2 min-w-fit' />
							<BottomSheet.ValueList values={tags} fallbackValue='No Tags' />
						</BottomSheet.Section>
					</Container>
				</BottomSheet.Sheet>
			</BottomSheet>
		</>
	);
};

export default EntryCard;

export const MiniCalendar = ({ date }: { date: string | Date }) => {
	const day = moment(new Date(date)).format('DD');
	const dayNumber = moment(new Date(date)).format('ddd');
	return (
		<div className='flex flex-col items-center justify-between w-16 h-16 pt-1 pb-3 bg-white shadow-sm rounded-xl dark:bg-black'>
			<div className='tracking-wider uppercase font-jost'>{dayNumber}</div>
			<div className='m-0 text-2xl font-bold'>{day}</div>
		</div>
	);
};
