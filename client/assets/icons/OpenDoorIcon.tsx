import * as React from 'react';
import { SVGProps } from 'react';

const OpenDoorIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={24}
		height={24}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}>
		<path
			d='M3 21.003h11V5.993c0-1.365 0-2.047-.281-2.52a2 2 0 0 0-1.093-.876c-.523-.172-1.189-.025-2.52.271l-2.6.578c-.894.199-1.341.298-1.675.539a2 2 0 0 0-.669.833C5 5.196 5 5.654 5 6.57v14.433m8.994-16H15.8c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874c.218.428.218.988.218 2.108v12.8h2m-10-9h.01'
			stroke='#131A29'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			{...(props as any)}
		/>
	</svg>
);

export default OpenDoorIcon;
