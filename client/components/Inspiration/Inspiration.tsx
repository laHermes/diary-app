import { SectionActionButton, SectionCard } from '@styles/styles';
import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import {
	InspirationAuthor,
	InspirationContentWrapper,
	InspirationQuote,
	ThinBorder,
} from './Styles';
import { ChevronRightIcon } from '@heroicons/react/solid';
import Spinner from '@components/Spinner/Spinner';
import { useSession } from 'next-auth/react';

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

	return (
		<SectionCard>
			<InspirationContentWrapper>
				<InspirationQuote>{quoteData?.content}</InspirationQuote>
				<InspirationAuthor>{quoteData?.author}</InspirationAuthor>
				{isLoading && <Spinner />}
			</InspirationContentWrapper>
			<ThinBorder />
			<Link href={linkHref} as={`${SUB_LINK}/entry`}>
				<SectionActionButton>
					<p className='m-0 dark:text-accent'>Journal the quote</p>
					<ChevronRightIcon className='h-5 w-5 self-center dark:fill-accent' />
				</SectionActionButton>
			</Link>
		</SectionCard>
	);
};

export default Inspiration;
