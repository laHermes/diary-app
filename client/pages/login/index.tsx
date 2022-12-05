import React from 'react';
import LoginButton from '@features/Auth/components/LoginButton';
import {
	LoginPage,
	Wrapper,
	Title,
	Subtitle,
	PrivacyPolicy,
} from '@features/Auth/components/Styles';

const index = () => {
	return (
		<LoginPage>
			<Wrapper>
				<Title>Sign in</Title>
				<Subtitle>Welcome to diaryapp</Subtitle>
			</Wrapper>
			<Wrapper>
				<LoginButton />
				<PrivacyPolicy>
					By continuing you are agree with our Terms and Conditions, and our
					Privacy Policies.
				</PrivacyPolicy>
			</Wrapper>
		</LoginPage>
	);
};

export default index;
