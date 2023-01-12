import EntryCard from '@components/EntryCard/EntryCard';
import { useRouter } from 'next/router';
import React from 'react';

const Entries = ({ entries = [] }: { entries: IEntry[] }) => {
	const router = useRouter();

	const areaPrefix = router.pathname.includes('app') ? '/app' : '/demo';
	const path = areaPrefix + '/entry';
	return (
		<>
			{entries.map(({ id, content, date, ...entryProps }: IEntry) => {
				return (
					<EntryCard
						path={path}
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
