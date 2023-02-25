import React from 'react';
import EntryCard from '@components/Entry/EntryCard/EntryCard';

const EntriesList = ({ entries = [] }: { entries: IEntry[] }) => {
	if (entries?.length === 0) return null;
	return (
		<>
			{entries.map(({ id, ...entryProps }: IEntry) => {
				return <EntryCard key={id} id={id} {...entryProps} />;
			})}
		</>
	);
};

export default EntriesList;
