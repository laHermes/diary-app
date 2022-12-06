import React from 'react';
import LoginButton from '@components/SignIn/SignIn';
import {
	LoginPage,
	PrivacyPolicy,
	Subtitle,
	Wrapper,
} from '@components/SignIn/Styles';
import { Title } from '@components/Tags/Tags';

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
					This is a personal project, not for public use!
				</PrivacyPolicy>
			</Wrapper>
		</LoginPage>
	);
};

export default index;
