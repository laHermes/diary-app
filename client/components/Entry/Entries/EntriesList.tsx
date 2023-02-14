import React from 'react';
import EntryCard from '@components/Entry/EntryCard/EntryCard';

const EntriesList = ({ entries = [] }: { entries: IEntry[] }) => {
	return (
		<>
			{entries.map(({ id, ...entryProps }: IEntry) => {
				return <EntryCard key={id} id={id} {...entryProps} />;
			})}
		</>
	);
};

export default EntriesList;
