import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { StyledButton } from './Styles';
import { ButtonProps } from './Styles';

interface IButtonProps {
	isWorking?: boolean;
}

type ButtonType = IButtonProps &
	ButtonProps &
	ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(
	(
		{ children, disabled, isWorking, onClick, role, ...props }: ButtonType,
		ref?: React.Ref<HTMLButtonElement>
	) => {
		return (
			<StyledButton
				disabled={disabled || isWorking}
				onClick={onClick}
				role={role || 'button'}
				ref={ref}
				{...props}>
				{children}
			</StyledButton>
		);
	}
);

Button.displayName = 'Button';

export default Button;
