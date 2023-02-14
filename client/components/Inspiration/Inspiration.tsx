import React from 'react';
import Link from 'next/link';

// hooks, utils and api
import { useSession } from 'next-auth/react';
import { fetchInspiration } from '@config/api';

// components
import { SectionAction, SectionCard } from '@styles/styles';
import {
	InspirationAuthor,
	InspirationContentWrapper,
	InspirationQuote,
	ThinBorder,
} from './Styles';
import Spinner from '@components/Elements/Spinner/Spinner';
import Message from '@components/Message/Message';

// icons
import { RefreshIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useQuery } from '@tanstack/react-query';

export const useInspiration = () => useQuery(['Inspiration'], fetchInspiration);

const Inspiration = () => {
	const { isLoading, error, data, refetch } = useInspiration();
	const { status } = useSession();

	const quoteData = data ? data?.data : null;

	const SUB_LINK = status === 'authenticated' ? '/app' : '/demo';

	const inspirationQuotePrep = `${data?.data?.content}  -${data?.data?.author}`;

	const linkHref = {
		pathname: `${SUB_LINK}/entry`,
		query: {
			content: inspirationQuotePrep,
		},
	};

	if (isLoading) {
		return (
			<SectionCard>
				<InspirationContentWrapper className='flex-col items-center justify-center h-24'>
					<Spinner />
				</InspirationContentWrapper>
			</SectionCard>
		);
	}

	if (!!error) {
		return (
			<SectionCard>
				<InspirationContentWrapper className='flex-row items-center justify-center h-24 gap-4'>
					<Message message='There has been an error. Try again later!' />
					<RefreshIcon
						onClick={() => refetch()}
						width={22}
						height={22}
						className='cursor-pointer opacity-85'
					/>
				</InspirationContentWrapper>
			</SectionCard>
		);
	}

	return (
		<SectionCard>
			<InspirationContentWrapper>
				<InspirationQuote>{quoteData?.content}</InspirationQuote>
				<InspirationAuthor>{quoteData?.author}</InspirationAuthor>
			</InspirationContentWrapper>
			<ThinBorder />
			<Link href={linkHref} as={`${SUB_LINK}/entry`}>
				<SectionAction>
					<p className='m-0 dark:text-accent'>Journal the quote</p>
					<ChevronRightIcon className='self-center w-5 h-5 dark:fill-accent' />
				</SectionAction>
			</Link>
		</SectionCard>
	);
};

export default Inspiration;
