import React from 'react';

const OrderedList = (props: any) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M10 6L21 6.00066M10 12L21 12.0007M10 18L21 18.0007M3 5L5 4V10M3 10H7M3 15.5C3.5 14.5 4.0335 14 5 14C5.9665 14 7 14.4615 7 15.6154C7 17.4615 3 20 3 20H7'
				stroke='#131A29'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				{...props}
			/>
		</svg>
	);
};

export default OrderedList;
