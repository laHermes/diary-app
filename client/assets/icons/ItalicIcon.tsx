import React from 'react';

const ItalicIcon = (props: any) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M10 3H20M4 21H14M15 3L9 21'
				stroke='#131A29'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				{...props}
			/>
		</svg>
	);
};

export default ItalicIcon;
