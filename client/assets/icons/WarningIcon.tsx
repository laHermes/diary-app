import React from 'react';

const WarningIcon = (props: any) => (
	<svg
		width={24}
		height={24}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}>
		<path
			d='M12 8v5m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
			stroke='#131A29'
			strokeWidth={2}
			strokeLinecap='round'
			{...props}
		/>
	</svg>
);

export default WarningIcon;
