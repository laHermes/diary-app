import React from 'react';
import { TagButton } from './Styles';
import { TagIcon } from '@heroicons/react/outline';

interface TagsSelectedListProps {
	data: string[];
	onClick: (value: string) => void;
	filterFunction: (value: string) => boolean;
	selected?: boolean;
}

const TagsList = ({
	data,
	selected = false,
	onClick: onClickProps,
	filterFunction,
}: TagsSelectedListProps) => {
	const hasData = Boolean(data?.length);

	return (
		<>
			{hasData &&
				data.map((value: string) => {
					return (
						<TagButton
							key={value}
							onClick={() => onClickProps(value)}
							$selected={selected}
							$hidden={!filterFunction(value)}>
							<TagIcon className='w-4 h-4' />
							<span>{value}</span>
						</TagButton>
					);
				})}
		</>
	);
};

export default TagsList;
