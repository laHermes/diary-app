import React from 'react';

const ArrowRightToArc = (props: any) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M16.9992 8L20.9992 12M20.9992 12L16.9992 16M20.9992 12H8.99922M11.9992 3H6.2C5.07989 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.0799 3 6.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H11.9992'
				stroke='#131A29'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				{...props}
			/>
		</svg>
	);
};

export default ArrowRightToArc;
