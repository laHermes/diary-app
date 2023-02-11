import React, { forwardRef } from 'react';
import { InputElement, StyledIcon, StyledInput } from './Styles';

interface IInput {
	onChange: (value: any, event: Event) => any;
	icon?: HTMLElement;
	className?: string;
	filter?: RegExp;
}

const Input = forwardRef(
	(
		{ icon, className, filter, onChange, ...inputProps }: IInput,
		ref?: React.Ref<HTMLButtonElement>
	) => {
		//TODO: change event type
		const handleChange = (event: any) => {
			if (!filter || filter.test(event.target.value)) {
				onChange(event.target.value, event);
			}
		};

		return (
			<StyledInput className={className}>
				{icon && <StyledIcon type={icon} size={15} />}
				<InputElement {...inputProps} onChange={handleChange} ref={ref} />
			</StyledInput>
		);
	}
);

Input.displayName = 'Input';

export default Input;
