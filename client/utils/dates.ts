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
 * transforms array of data to include date field
 * @param  { Array<any>} data  array of dates
 * @return {Array<Object>} array of date
 */
export const transformEntryDate = (data: any[]): Array<Object> => {
	if (!Boolean(data.length)) {
		return [];
	}

	return data.map((entry: any) => {
		return { ...entry, date: entry.clientDate };
	});
};

/**
 * calculates current and longest streak
 * @param  { Array<string>} array  array of dates
 * @return {ICalculatesStreaks} array of date
 */
export const calculateStreaks = ({ array }: IStreak): ICalculatesStreaks => {
	// group array by day: returns dictionary
	const grouped = groupStoriesBy({
		array,
		timeHorizon: 'day',
		dateSelector: 'created_at',
	});

	// convert dictionary keys to array of dates
	const arrayOfDates = Array.from(Object.keys(grouped));

	// sort dates by newest
	const sortedArray = arrayOfDates.sort((a: string, b: string) => {
		return new Date(b).getTime() - new Date(a).getTime();
	});

	const currentStreak = calculateCurrentStreak({ array: sortedArray });
	const longestStreak = calculateLongestStreak({ array: sortedArray });

	return {
		currentStreak: currentStreak.length,
		longestStreak: longestStreak.length,
		currentStreakDates: currentStreak,
		longestStreakDates: longestStreak,
	};
};

/**
 * takes the array of dates and compares each consecutive date to find the longest streak
 * @param  { Array<string>} array  array of dates
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
	return moment(date).isSame(yesterdayDate, 'd');
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

	return moment(date).isSame(yesterday, 'd');
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
