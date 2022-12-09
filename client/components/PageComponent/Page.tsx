import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import {
	PageCard,
	PageCardBody,
	PageCardAction,
	PageComponent,
	PageLayout,
	PageLogo,
	PageLogoSection,
	PageSection,
	PageSubtitle,
	PageTitle,
} from './Styles';

const Page = ({ children, className }: IChildren & { className?: string }) => {
	return <PageComponent className={className}>{children}</PageComponent>;
};
const Layout = ({ children }: IChildren) => {
	return <PageLayout>{children}</PageLayout>;
};
const Title = ({ children }: IChildren) => {
	return <PageTitle>{children}</PageTitle>;
};
const Subtitle = ({ children }: IChildren) => {
	return <PageSubtitle>{children}</PageSubtitle>;
};
const Section = ({ children }: IChildren) => {
	return <PageSection>{children}</PageSection>;
};

const Card = ({ children }: IChildren) => {
	return <PageCard>{children}</PageCard>;
};

const CardBody = ({ children }: IChildren) => {
	return <PageCardBody>{children}</PageCardBody>;
};

const Action = ({
	children,
	hasIcon = true,
	onClick = () => {},
}: IChildren & { hasIcon?: boolean; onClick?: (...args: any[]) => void }) => {
	return (
		<PageCardAction onClick={() => onClick()}>
			{children}
			{hasIcon && <ChevronRightIcon className='self-center w-5 h-5' />}
		</PageCardAction>
	);
};

const LogoSection = ({ children }: IChildren) => {
	return <PageLogoSection>{children}</PageLogoSection>;
};
const Logo = ({ children }: IChildren) => {
	return <PageLogo>{children}</PageLogo>;
};

Page.Layout = Layout;
Page.Title = Title;
Page.Subtitle = Subtitle;
Page.Section = Section;
Page.Card = Card;
Page.CardBody = CardBody;
Page.Logo = Logo;
Page.LogoSection = LogoSection;
Page.CardAction = Action;

export default Page;
