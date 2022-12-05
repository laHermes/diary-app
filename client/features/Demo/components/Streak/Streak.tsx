import React from 'react';
import { IStreakObject } from 'utils/dates';
import { StatisticsCard } from '../Styles';

interface IStreak {
	values: IStreakObject[];
	title?: string;
}

const Streak = ({ values, title }: IStreak) => {
	return (
		<StatisticsCard>
			<p className='mb-3 mt-1 text-xl font-medium font-playfair'>{title}</p>
			<div className='flex flex-row justify-between w-full'>
				{values.map(({ date, numberOfStories }: IStreakObject) => {
					return (
						<div key={date.date.toString()}>
							<div className='flex flex-col gap-1 p-1 pt-2 justify-between items-center text-zinc-500  rounded-lg cursor-pointer dark:border-zinc-700 '>
								<div
									className={`w-8 h-8 rounded-full  ${
										numberOfStories === 1
											? 'bg-green-200'
											: numberOfStories === 2
											? 'bg-green-300'
											: numberOfStories >= 3
											? 'bg-green-400'
											: 'bg-zinc-100'
									} `}></div>
								<p>{date.dayString[0]}</p>
							</div>
						</div>
					);
				})}
			</div>
		</StatisticsCard>
	);
};

export default Streak;
