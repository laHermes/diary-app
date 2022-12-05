import type { NextPage } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';
import 'tailwindcss/tailwind.css';
import ChangeThemeButton from '@features/Theme/components/ChangeThemeButton';
import ArrowRightIcon from '@icons/ArrowRight';
import Button from '@components/Elements/Button/Button';
import {
	Container,
	Header,
	HeaderWrapper,
	Section,
	TextLogo,
	WelcomeContent,
	WelcomeText,
} from '@styles/styles';
import { useRouter } from 'next/router';

export type Page<P = {}> = NextPage<P> & {
	getLayout?: (page: ReactElement) => ReactNode;
	layout?: ComponentType;
};

const Home: Page = () => {
	const router = useRouter();

	const handleNavigate = (path: string) => {
		router.push(path);
	};

	return (
		<>
			<Header>
				<Container>
					<HeaderWrapper>
						<TextLogo>diaryapp</TextLogo>
						<Section>
							<ChangeThemeButton />
							<Button
								onClick={() => handleNavigate('/login')}
								$rounded
								className='hidden md:inline-flex'>
								<span>Get started</span>
								<ArrowRightIcon />
							</Button>
						</Section>
					</HeaderWrapper>
				</Container>
			</Header>

			<Container>
				<WelcomeContent>
					<WelcomeText>A journal for soul</WelcomeText>
					<Section>
						<Button onClick={() => handleNavigate('/demo')} $rounded>
							Try for free
						</Button>
						<span className='opacity-30'>or</span>
						<Button onClick={() => handleNavigate('/login')} $rounded>
							<span>Login</span>
							<ArrowRightIcon />
						</Button>
					</Section>
				</WelcomeContent>
			</Container>
		</>
	);
};

export default Home;
