import React from 'react';
import Chip from './Chip';

type ChipListProps = {
	data: string[] | number[] | string | undefined;
};
const ChipList = ({ data = [] }: ChipListProps) => {
	if (data?.length === 0) return null;
	if (typeof data === 'string' || typeof data === 'number') {
		return <Chip>{data}</Chip>;
	}

	const hasData = Boolean(data?.length);

	return (
		<>
			{hasData &&
				data.map((value, index) => {
					return <Chip key={`${index}-${value}`}>{value}</Chip>;
				})}
		</>
	);
};

export default ChipList;
