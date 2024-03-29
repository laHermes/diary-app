import React from 'react';

const HeadingOneIcon = (props: any) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M15 9L16.6343 7.36569C17.0627 6.93731 17.2769 6.72312 17.4608 6.70865C17.6203 6.69609 17.7763 6.76068 17.8802 6.88238C18 7.02265 18 7.32555 18 7.93137V18M15 18H21M3 6V18M10 12H3M10 6V18'
				stroke='#131A29'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				{...props}
			/>
		</svg>
	);
};

export default HeadingOneIcon;
