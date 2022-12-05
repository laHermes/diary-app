import { ChevronRightIcon } from '@heroicons/react/outline';
import React from 'react';
import { PageCard as PCard, PageCardAction, PageCardBody } from './Styles';

const PageCard = ({ children }: IChildren) => {
	return <PCard>{children}</PCard>;
};

const CardBody = ({ children }: IChildren) => {
	return <PageCardBody>{children}</PageCardBody>;
};

const Action = ({
	children,
	hasIcon = true,
	onClick = () => {},
}: IChildren & { hasIcon?: boolean; onClick?: Function }) => {
	return (
		<PageCardAction onClick={() => onClick()}>
			{children}
			{hasIcon && (
				<div className='inline-flex self-center justify-center gap-4 px-4 py-4 transition-all duration-200 rounded-full w-fit hover:bg-zinc-100 hover:dark:bg-zinc-800'>
					<ChevronRightIcon className='self-center w-5 h-5' />
				</div>
			)}
		</PageCardAction>
	);
};

PageCard.Body = CardBody;
PageCard.Action = Action;

export default PageCard;
