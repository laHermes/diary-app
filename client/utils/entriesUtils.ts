// ideally, put default tags elsewhere
const defaultTags = ['home', 'soul', 'love', 'work'];

export const getUniqueTags = (data: any) => {
	// combine entry tags with default or just return default tags
	console.log('TAGSSS', data);
	if (data.length === 0) {
		return defaultTags;
	}
	const entryTags = data.map(({ tags }: IEntry) => tags);
	const flattenedEntryTags = entryTags.flatMap((tag: string[]) => tag);
	const uniqueTags = new Set([...defaultTags, ...flattenedEntryTags]);
	return Array.from(uniqueTags);
};
export const getTotalWordsWritten = (data: any) => {
	return data.reduce(
		(previousValue: number, currentValue: IEntry) =>
			previousValue +
			(currentValue.numberOfWords ? +currentValue?.numberOfWords : 0),
		0
	);
};
