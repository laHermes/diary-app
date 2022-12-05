import React from 'react';
import { StatisticsCard } from '../Styles';

const Statistics = ({ values, title }: any) => {
	return (
		<StatisticsCard>
			<p className='mb-3 mt-1 text-xl font-medium'>{title}</p>
			{values.map(({ label, value }: any) => {
				return (
					<div key={label}>
						<p className='text-md font-semibold'>{label}</p>
						<div className='w-full bg-zinc-200 rounded-full h-3 mb-4 dark:bg-zinc-700'>
							<div
								className={`bg-teal-600 h-3 rounded-full dark:bg-teal-500 `}
								style={{ width: `${value}%` }}></div>
						</div>
					</div>
				);
			})}
		</StatisticsCard>
	);
};

export default Statistics;
