import { useEffect, useState } from 'react';

export enum FILTER {
	REASON = 'REASON',
	EMOTION = 'EMOTION',
	SEARCH = 'SEARCH',
	TAG = 'TAG',
}

export type FilterObject = {
	value: string | number;
	filterType: FILTER;
	action: Function;
	moreThenOneType?: boolean;
};

// TODO: instead of IStory use generics
const useFilter = <T>({ data }: { data: T[] }) => {
	const [filteredData, setFilteredData] = useState<any[]>([]);
	const [filters, setFilters] = useState<FilterObject[]>([]);

	useEffect(() => {
		if (filters.length > 0 && data.length > 0) {
			const filteredInstances = data.filter((instance: T) => {
				const fullyFiltered = filters.map((filter: FilterObject) =>
					isTypeFilterActive(instance, filters, filter.filterType)
				);
				return fullyFiltered.every((value) => value === true);
			});
			setFilteredData(filteredInstances);
			return;
		}
	}, [data, filters]);

	// moreThenOneType -> sometimes we need to apply multiple filters of the same filter type e.g. range of dates
	const addFilter = ({
		value,
		filterType,
		action,
		moreThenOneType = false,
	}: FilterObject) => {
		if (value === '' || value === null) {
			removeFilterType(filterType);
			return;
		}
		if ([...filters.filter((flt) => flt.value == value)].length > 0) {
			setFilters([...filters.filter((flt) => flt.value != value)]);
			return;
		}

		// if same type filter is applied remove it
		const prevFilters = moreThenOneType
			? [...filters.filter((flt) => flt.value != value)]
			: [...filters.filter((flt) => flt.filterType != filterType)];

		setFilters(() => [...prevFilters, { value, filterType, action }]);
	};

	// removes all filters
	const resetFilters = () => {
		setFilters([]);
	};

	// removes filter of specified type
	const removeFilter = (value: string | number, filterType: FILTER) =>
		setFilters((currentFilters) =>
			currentFilters.filter(
				(filter) =>
					!(filter.value === value && filter.filterType === filterType)
			)
		);
	// removes specific filter
	const removeFilterType = (filterType: FILTER) =>
		setFilters((currentFilters) =>
			currentFilters.filter((filter) => !(filter.filterType === filterType))
		);

	// if filter type is active, filter data
	const isTypeFilterActive = (
		instance: any,
		filters: FilterObject[],
		filterType?: FILTER
	) => {
		// get filter of particular type
		const typeFilters = filterType
			? filters.filter((filter) => filter.filterType === filterType)
			: filters;
		if (!typeFilters.length) return true;
		return typeFilters.some((filter) => filter.action(instance));
	};

	return { filteredData, filters, addFilter, resetFilters, removeFilter };
};

export default useFilter;
