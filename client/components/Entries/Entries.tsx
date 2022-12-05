import EntryCard from '@components/EntryCard/EntryCard';
import React from 'react';

const Entries = ({ entries = [] }: { entries: IEntry[] }) => {
	if (entries.length < 1) {
	}

	return (
		<>
			{entries.map(({ id, content, date, ...entryProps }: IEntry) => {
				return (
					<EntryCard
						path='/app/entry'
						key={id}
						id={id}
						content={content}
						date={date}
						{...entryProps}
					/>
				);
			})}
		</>
	);
};

export default Entries;
