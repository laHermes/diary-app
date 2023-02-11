import React, { forwardRef, useState } from 'react';
import { StyledTextArea, StyledTextContainer } from './Styles';

interface ITextAreaProp {
	className: string;
	onChange: React.Dispatch<React.ChangeEventHandler<any>>;
	invalid?: boolean;
	value?: string;
}

const TextArea = forwardRef(
	(
		{
			className,
			invalid,
			onChange: propsOnChange,
			value: propsValue,
			...props
		}: ITextAreaProp,
		ref?: React.Ref<HTMLTextAreaElement>
	) => {
		const [stateValue, setStateValue] = useState<string>(
			propsValue ? propsValue : ''
		);

		const onChangeHandler = (event: any) => {
			setStateValue(event.target.value);
			propsOnChange(event.target.value);
		};

		return (
			<StyledTextContainer>
				<StyledTextArea
					rows={4}
					className={className}
					onChange={onChangeHandler}
					invalid={invalid}
					{...props}
					ref={ref}
					value={stateValue}></StyledTextArea>
			</StyledTextContainer>
		);
	}
);
TextArea.displayName = 'TextArea';

export default TextArea;
