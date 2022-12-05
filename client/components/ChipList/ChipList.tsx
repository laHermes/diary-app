import { Chip } from '@styles/styles';
import React from 'react';

const ChipList = ({ values = [] }: { values: string[] }) => {
	return (
		<>
			{values.map((tag: string) => {
				return <Chip key={tag}>{tag}</Chip>;
			})}
		</>
	);
};

export default ChipList;
