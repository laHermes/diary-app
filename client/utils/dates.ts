import { groupBy } from 'lodash';
import moment, { unitOfTime } from 'moment';

interface IDateCompare {
	date: string | Date;
}
interface IYesterdayCompareFunct extends IDateCompare {
	yesterdayDate: string | Date;
}
interface IStreak {
	array: Array<any>;
}
interface IGroupStoriesBy {
	[key: string]: string | Date;
	date: string | Date;
}
interface IGrouped {
	date: string;
	entries: IEntry[];
}

interface ICalculatesStreaks {
	currentStreak: number;
	longestStreak: number;
	currentStreakDates?: string[];
	longestStreakDates?: string[];
}

/**
 * Transforms an array of data to include a date field.
 * @param  { Array<any>} data - An array of data objects with a "clientDate" field.
 * @return {Array<{date: string, [key: string]: any}>} - An array of data objects with a "date" field added.
 */
export const transformEntryDate = (
	data: any[]
): Array<{ date: string; [key: string]: any }> => {
	if (!Boolean(data.length) || !Array.isArray(data)) {
		return [];
	}

	return data.map((entry: any) => {
		return { ...entry, date: entry.clientDate };
	});
};

/**
 * Calculates current and longest streaks for an array of dates
 * @param  { Array<string> } array - An array of dates to calculate streaks for
 * @return { ICalculatesStreaks } - An object containing current and longest streaks and their respective dates
 */
export const calculateStreaks = ({ array }: IStreak): ICalculatesStreaks => {
	// Group array by day, returning a dictionary with each day as a key
	const groupedByDay = groupStoriesBy({
		array,
		timeHorizon: 'day',
		dateSelector: 'created_at',
	});

	// Sort dates by newest
	const sortedArray = Object.keys(groupedByDay).sort(
		(a, b) => new Date(b).getTime() - new Date(a).getTime()
	);
	// Calculate the current streak by finding the longest consecutive sequence of dates
	const currentStreak = calculateCurrentStreak({ array: sortedArray });

	// Calculate the longest streak by finding the longest consecutive sequence of dates across the entire array
	const longestStreak = calculateLongestStreak({ array: sortedArray });

	// Return an object containing current and longest streaks and their respective dates
	return {
		currentStreak: currentStreak.length,
		longestStreak: longestStreak.length,
		currentStreakDates: currentStreak,
		longestStreakDates: longestStreak,
	};
};

/**
 * Takes an array of dates and calculates the longest streak of consecutive days.
 * @param  { Array<string>} array - An array of dates in string format (e.g. "2022-01-01").
 * @return {string[]} array of date
 */
export const calculateLongestStreak = ({
	array,
}: {
	array: Array<string>;
}): string[] => {
	let longestStreakBuffer: string[] = [];
	let longestStreak: string[] = [];

	array.forEach((date: string, index: number) => {
		//adds previous start date to array
		if (longestStreakBuffer.length === 0) {
			longestStreakBuffer = [array[index - 1]];
		}
		if (isYesterdayComparedTo({ date, yesterdayDate: array[index - 1] })) {
			longestStreakBuffer = [...longestStreakBuffer, date];
			if (array.length !== index + 1) {
				return;
			}
		}
		if (longestStreakBuffer.length > longestStreak.length) {
			longestStreak = longestStreakBuffer;
			longestStreakBuffer = [];
		}
	});

	return longestStreak;
};

/**
 * calculates current streaks (consecutive values) from today in to the past
 * @param  { Array<string>} array  array of dates
 * @return {string[]} array of date
 */
export const calculateCurrentStreak = ({
	array,
}: {
	array: Array<string>;
}): string[] => {
	let currentStreaks: string[] = [];

	array.forEach((date: string) => {
		if (isToday({ date })) {
			currentStreaks = [...currentStreaks, date];
			return;
		}

		if (isYesterday({ date })) {
			currentStreaks = [...currentStreaks, date];
			return;
		}

		if (
			isYesterdayComparedTo({
				date,
				yesterdayDate: currentStreaks.at(-1) as string,
			})
		) {
			currentStreaks = [...currentStreaks, date];
			return;
		}
	});

	return currentStreaks;
};

interface IGroupStoriesByParams<T> {
	array: Array<T>;
	timeHorizon: unitOfTime.StartOf;
	dateSelector?: keyof T;
	dateFormat?: string;
}
/**
 * grouped entries by time horizon
 * @param  { Array<T>} array  dictionary containing date to entries mapping
 * @param  {unitOfTime.StartOf}[timeHorizon="day"] grouping time horizon
 * @param  {keyof T=} dateSelector date selector
 * @return {Object} grouped stories
 */
export const groupStoriesBy = <T extends IGroupStoriesBy>({
	array,
	timeHorizon = 'day',
	dateSelector,
	dateFormat = 'MMMM YYYY',
}: IGroupStoriesByParams<T>): Object => {
	return groupBy(array, (entry: T) => {
		const date = dateSelector ? (entry[dateSelector] as string) : entry.date;
		return moment(new Date(date)).startOf(timeHorizon).format(dateFormat);
	});
};

/**
 * converts dict of date to entries mapping to array and
 * reverses the arr to makes the newest entry appear first
 * @param   {any}    obj  dictionary containing date to entries mapping
 * @param   {string}[nestedKeyName="entry"] object key that will map to array of entries
 * @return  {IGrouped[]} formatted array
 */
export const formatGroupedStories = (obj: any): IGrouped[] => {
	const keys = Object.keys(obj);

	const array: IGrouped[] = keys.map((key) => {
		return { date: key, entries: obj[key].reverse() };
	});
	return array.reverse();
};

/**
 * checks if a given date is today
 * @param   {IDateCompare}    date  date to be compared
 * @return  {boolean} true or false
 */
export const isToday = ({ date }: IDateCompare): boolean => {
	return moment(new Date(date)).isSame(new Date(), 'd');
};

/**
 * checks if a given date is yesterday
 * @param   {IDateCompare}    date  date to be compared
 * @return  {boolean} true or false
 */
export const isYesterday = ({ date }: IDateCompare): boolean => {
	const yesterdayDate = new Date();
	yesterdayDate.setDate(yesterdayDate.getDate() - 1);
	return moment(new Date(date)).isSame(yesterdayDate, 'd');
};

/**
 * checks if a given date is yesterday compared to the other date
 * @param   {IDateCompare}    date  date to be compared
 * @return  {boolean} true or false
 */
export const isYesterdayComparedTo = ({
	date,
	yesterdayDate: yd,
}: IYesterdayCompareFunct) => {
	const yesterday = new Date(yd);
	yesterday.setDate(yesterday.getDate() - 1);

	return moment(new Date(date)).isSame(yesterday, 'd');
};

/**
 *
 * NOT USED
 *
 */

// function isWithinAWeek(momentDate) {
// 	return momentDate.isAfter(A_WEEK_OLD);
// }
// function isTwoWeeksOrMore(momentDate) {
// 	return !isWithinAWeek(momentDate);
// }
export interface IDateObject {
	date: Date;
	day: number;
	dayString: string;
	month: number;
	monthString: string;
	year: number;
}

export interface IStreakObject {
	date: IDateObject;
	numberOfStories: number;
}

export interface IGetDateObject {
	(date: Date): IDateObject;
}

export interface IGetLastWeekStreak {
	(array: Date[]): IStreakObject[];
}

export const getLastWeekStreak: IGetLastWeekStreak = (array: Date[]) =>
	getLastWeekDates().map((date) => {
		const dateForDay = moment(new Date(date.date)).format('MM/DD/YYYY');
		const filteredPerDay = array.filter(
			(instance: any) =>
				moment(new Date(instance)).format('MM/DD/YYYY') === dateForDay
		);
		return {
			date: getDateObject(new Date(dateForDay)),
			numberOfStories: filteredPerDay.length,
		};
	});

// function to avoid formatting and parsing days and months in jsx
export const getDateObject: IGetDateObject = (date) => {
	return {
		date: date,
		day: date.getDate(),
		dayString: date.toLocaleDateString('en-US', { weekday: 'long' }),
		month: date.getMonth(),
		monthString: date.toLocaleDateString('en-US', { month: 'long' }),
		year: date.getFullYear(),
	};
};

export const getLastWeekDates = (): IDateObject[] =>
	[...Array(7)].map((_, i) => {
		const date = new Date();
		date.setDate(date.getDate() - i);
		return getDateObject(date);
	});
