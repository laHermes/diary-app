import GoogleIcon from '@icons/Google';
import React, { HtmlHTMLAttributes } from 'react';
import { IconContainer, StyledLoginSocialButton } from './Styles';
import { signIn } from 'next-auth/react';

const LoginButton: React.FC<HtmlHTMLAttributes<HTMLButtonElement>> = () => {
	return (
		<StyledLoginSocialButton
			onClick={() => signIn('google', { callbackUrl: '/app' })}>
			<IconContainer>
				<GoogleIcon />
			</IconContainer>
			Continue with Google
		</StyledLoginSocialButton>
	);
};

export default LoginButton;
