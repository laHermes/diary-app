import React from 'react';
import LoginButton from '@components/Auth/SignIn/SignIn';
import {
	LoginPage,
	PrivacyPolicy,
	Wrapper,
} from '@components/Auth/SignIn/Styles';
import { Title } from '@components/Modals/TagsModal/Tags';
import { TextLogo } from '@styles/styles';
import { useRouter } from 'next/router';

const Index = () => {
	const router = useRouter();
	return (
		<LoginPage>
			<Wrapper>
				<Title>Sign in</Title>
				<TextLogo onClick={() => router.push('/')}>diaryapp</TextLogo>
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

export default Index;
