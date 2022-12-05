import React from 'react';

const BoldIcon = (props: any) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M6 12H12.5C14.9853 12 17 9.98528 17 7.5C17 5.01472 14.9853 3 12.5 3H6V12ZM6 12H13.5C15.9853 12 18 14.0147 18 16.5C18 18.9853 15.9853 21 13.5 21H6V12Z'
				stroke='#131A29'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				{...props}
			/>
		</svg>
	);
};

export default BoldIcon;
