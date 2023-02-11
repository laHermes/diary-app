import React from 'react';
import Link from 'next/link';

// hooks
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

// components
import { SectionAction, SectionCard } from '@styles/styles';
import {
	InspirationAuthor,
	InspirationContentWrapper,
	InspirationQuote,
	ThinBorder,
} from './Styles';
import Spinner from '@components/Spinner/Spinner';

// icons
import { ChevronRightIcon } from '@heroicons/react/solid';

const Inspiration = () => {
	const { data, error } = useSWR('/api/daily-inspiration');
	const { status } = useSession();

	const SUB_LINK = status === 'authenticated' ? '/app' : '/demo';

	const linkHref = {
		pathname: `${SUB_LINK}/entry`,
		query: {
			content: `${data?.data?.content}  -${data?.data?.author}
		`,
		},
	};

	const isLoading = !data && !error;
	const quoteData = data ? data?.data : null;

	if (isLoading) {
		return (
			<SectionCard>
				<InspirationContentWrapper className='flex-col items-center justify-center h-24'>
					<Spinner />
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
