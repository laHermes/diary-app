import React from 'react';

const UnorderedList = (props: any) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M8 6L21 6.00078M8 12L21 12.0008M8 18L21 18.0007M3 6.5H4V5.5H3V6.5ZM3 12.5H4V11.5H3V12.5ZM3 18.5H4V17.5H3V18.5Z'
				stroke='#131A29'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				{...props}
			/>
		</svg>
	);
};

export default UnorderedList;
