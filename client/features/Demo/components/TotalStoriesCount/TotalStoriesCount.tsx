import React from 'react';
import { StatisticsCard } from '../Styles';

const TotalStoriesCount = ({
	numberOfStories = 0,
}: {
	numberOfStories?: string | number;
}) => {
	return (
		<StatisticsCard>
			<div className='w-full flex flex-col gap-3 items-center justify-center'>
				<p className='m-0 text-3xl font-semibold'>{numberOfStories}</p>
				<p className='m-0 text-2xl'>Total stories</p>
			</div>
		</StatisticsCard>
	);
};

export default TotalStoriesCount;
