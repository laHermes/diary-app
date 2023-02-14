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
	className,
	onClick = () => {},
}: IChildren & {
	hasIcon?: boolean;
	className?: string;
	onClick?: (...args: any[]) => void;
}) => {
	return (
		<PageCardAction className={className} onClick={() => onClick()}>
			{children}
			{hasIcon && <ChevronRightIcon className='mr-4 h-5 w-5 self-center' />}
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
