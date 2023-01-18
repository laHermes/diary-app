import { ChevronRightIcon } from '@heroicons/react/outline';
import React from 'react';
import { PageCard as PCard, PageCardAction, PageCardBody } from './Styles';

const PageCard = ({
	children,
	className,
}: IChildren & { className?: string }) => {
	return <PCard className={className}>{children}</PCard>;
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
				<div className='inline-flex w-fit justify-center gap-4 self-center rounded-full px-4 py-4 transition-all duration-200 hover:bg-zinc-100 hover:dark:bg-zinc-800'>
					<ChevronRightIcon className='h-5 w-5 self-center' />
				</div>
			)}
		</PageCardAction>
	);
};

PageCard.Body = CardBody;
PageCard.Action = Action;

export default PageCard;
