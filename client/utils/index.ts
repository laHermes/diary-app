interface getArrayFromObject {
	(array: any[], field?: string): any;
}

interface IGetRelativePercentage {
	(array: string[], precision?: number): any;
}

// Returns array from array of objects
export const getArrayFromObject: getArrayFromObject = (array, field) => {
	return array.map((instance) => (field ? instance[field] : instance));
};

// Calculates relative percentage of value in array
export const getRelativePercentage: IGetRelativePercentage = (
	array,
	precision
) => {
	const percentagePrecision = precision ? precision : 0;
	const totalItems = array.length;
	const uniqueItems = Array.from(new Set(array));

	const valuedArray = uniqueItems.map((instance) => {
		const numItems = array.filter((item) => item === instance);
		const percentage = (numItems.length * 100) / totalItems;
		return { label: instance, value: percentage.toFixed(percentagePrecision) };
	});

	const sorted = valuedArray.sort((a: any, b: any) => {
		return +b.value - +a.value;
	});

	return sorted;
};

// if array return array
// else (if string) return ['string']
// else return []

interface IStringToArray {
	value?: string | string[];
}

export const stringToArray = ({ value = [] }: IStringToArray): string[] => {
	return Array.isArray(value) ? value : value?.length ? [value] : [];
};

export const callAll =
	(...fns: Function[]) =>
	(...args: any) =>
		fns.forEach((fn: Function) => fn && fn(...args));
