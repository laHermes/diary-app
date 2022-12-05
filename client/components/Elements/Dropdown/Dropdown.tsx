import React, { useState } from 'react';
import Button from 'components/Elements/Button/Button';
import { ChevronDownIcon } from '@heroicons/react/outline';

interface IDropdown {
	placeholder?: string;
	values: string[];
	externalSetValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({
	placeholder = 'Select...',
	values,
	externalSetValue,
}: IDropdown) => {
	const [value, setValue] = useState<string>('');

	const handleChangeValue = (valuesInstance: string) => {
		if (externalSetValue) {
			externalSetValue(valuesInstance);
		}
		setValue(valuesInstance);
	};

	return (
		<div className='dropdown'>
			<Button tabIndex={0}>
				<div className='inline-flex'>
					{value ? value : placeholder}
					<ChevronDownIcon className='self-center ml-2 w-4 h-4' />
				</div>
			</Button>
			<ul
				tabIndex={0}
				className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'>
				{values.map((valuesInstance) => {
					return (
						<li
							key={valuesInstance}
							onClick={() => handleChangeValue(valuesInstance)}>
							<a>{valuesInstance}</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Dropdown;
