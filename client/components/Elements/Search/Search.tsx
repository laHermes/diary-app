import CloseIcon from '@icons/CloseIcon';
import SearchIcon from '@icons/SearchIcon';
import { forwardRef, useState } from 'react';
import { ClearSearchButton, SearchIconWrapper, SearchInput } from './Styles';

interface ISearch {
	placeholder?: string;
	onChange: Function;
	disabled?: boolean;
	name?: string;
	value?: string | number;
}

const Search = forwardRef(
	(
		{ placeholder, value: propsValue, onChange = () => {}, disabled }: ISearch,
		ref?: React.Ref<HTMLInputElement>
	) => {
		const [stateValue, setStateValue] = useState(propsValue || '');

		const handleChange = (event: any) => {
			setStateValue(event.target.value);
			onChange(event.target.value);
		};
		const handleResetSearch = () => {
			setStateValue('');
			onChange('');
		};

		return (
			<div className='relative w-full'>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>

				<SearchInput
					onChange={handleChange}
					value={stateValue}
					ref={ref}
					disabled={disabled}
					type='text'
					id='simple-search'
					placeholder={placeholder || 'Search'}
				/>

				{stateValue && (
					<ClearSearchButton onClick={handleResetSearch}>
						<CloseIcon />
					</ClearSearchButton>
				)}
			</div>
		);
	}
);

Search.displayName = 'Search';

export default Search;
