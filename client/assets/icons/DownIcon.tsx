import React from 'react';

const DownIcon = (props: any) => {
	return (
		<svg
			width={24}
			height={24}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<path
				d='M12 15.91c-.19 0-.38-.07-.53-.22l-3.53-3.53a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l3 3 3-3c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-3.53 3.53c-.15.15-.34.22-.53.22Z'
				fill='#000'
				{...props}
			/>
		</svg>
	);
};

export default DownIcon;
