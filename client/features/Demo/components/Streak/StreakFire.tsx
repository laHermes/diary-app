import React from 'react';
import { StatisticsCard } from '../Styles';

const StreakFire = ({
	streakLength = 0,
}: {
	streakLength?: string | number;
}) => {
	return (
		<StatisticsCard>
			<div className='w-full h-full inline-flex items-center content-center align-center justify-between'>
				<div className='self-center text-6xl'>🔥</div>
				<div className='self-center text-2xl'>Current streak</div>
				<div className='self-center flex flex-col gap-3 leading-none text-2xl items-center '>
					<p className='m-0 text-4xl font-semibold'>{streakLength}</p>
					<p className='m-0'>Day</p>
				</div>
			</div>
		</StatisticsCard>
	);
};

export default StreakFire;
