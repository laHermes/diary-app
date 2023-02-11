import React from 'react';
import clsx from 'clsx';
import { Flex } from '@styles/styles';

export const DEFAULT_ENTRY_MESSAGES = {
	NO_SEARCH_RESULTS: 'No entries match you search.',
	NO_ENTRIES: 'You have no entries. Make sure you add some',
} as const;

type MessageProps = {
	hidden?: boolean | null;
	message?: string | keyof typeof DEFAULT_ENTRY_MESSAGES;
};

const Message = ({
	hidden = false,
	message = DEFAULT_ENTRY_MESSAGES.NO_ENTRIES,
}: MessageProps) => {
	return (
		<Flex className={clsx(`justify-center py-20`, hidden && 'hidden')}>
			{message}
		</Flex>
	);
};

export default Message;
