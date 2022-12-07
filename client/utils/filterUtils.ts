interface filterDataProps {
	data: any[];
	filter: Record<string, any>;
}

// {data: [], filerObject, filterValues}

// TODO: add more edge cases
export const filterData = ({ data, filter }: filterDataProps) => {
	const isEmpty = Object.values(filter).every(
		(x) => x === null || x === '' || x.length === 0
	);
	if (isEmpty) return { data, filter: null };
	const filtered = data.filter((item: IEntry) => {
		return Object.keys(filter).every((key) => {
			const instance = item[key as keyof IEntry];
			const filterValues = filter[key];

			if (filterValues === '') return true;

			if (Array.isArray(instance) && Array.isArray(filterValues)) {
				return filterValues.every((filterValue: string) =>
					instance.includes(filterValue)
				);
			}

			if (typeof instance === 'string' && typeof filterValues === 'string') {
				const providedText = removeHTMLMarkup(instance.toLowerCase());
				const targetValue = filterValues.toLowerCase();
				console.log(
					providedText,
					targetValue,
					providedText.includes(targetValue)
				);
				return providedText.includes(targetValue);
			}

			return false;
		});
	});
	return { data: filtered, filter };
};

export const removeHTMLMarkup = (data: string) => {
	const HTML_MARKUP_REGEX = /<\/?[^>]+(>|$)/g;
	return data.replace(HTML_MARKUP_REGEX, '');
};
interface FilterFieldValueProps<T> {
	instance: T;
	selector: keyof T;
	targetValue: string;
	ignoreCase?: boolean;
	removeMarkup?: boolean;
}

export const filterFieldValue = <T>({
	instance,
	selector,
	targetValue,
	ignoreCase = true,
	removeMarkup = true,
}: FilterFieldValueProps<T>) => {
	const HTML_MARKUP_REGEX = /<\/?[^>]+(>|$)/g;
	let selectedValue = instance[selector] as any;
	const targetQuery = ignoreCase ? targetValue.toLowerCase() : targetValue;

	if (Array.isArray(selectedValue)) {
		return selectedValue.every((value: string | number) => {
			value =
				ignoreCase && typeof value === 'string' ? value.toLowerCase() : value;
			return value === targetQuery;
		});
	}

	selectedValue = ignoreCase ? selectedValue.toLowerCase() : selectedValue;
	selectedValue = removeMarkup
		? selectedValue.replace(HTML_MARKUP_REGEX, '')
		: selectedValue;

	return selectedValue.includes(targetQuery);
};
