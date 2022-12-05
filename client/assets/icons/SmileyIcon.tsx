import { SVGProps } from 'react';

// solar icon set
const SmileyIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={24}
		height={24}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}>
		<circle
			cx={12}
			cy={12}
			r={10}
			stroke='#1C274C'
			strokeWidth={1.5}
			{...(props as any)}
		/>
		<path
			d='M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1'
			stroke='#1C274C'
			strokeWidth={1.5}
			strokeLinecap='round'
			{...(props as any)}
		/>
		<path
			d='M16 10.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5.448-1.5 1-1.5 1 .672 1 1.5Z'
			fill='#1C274C'
			{...(props as any)}
		/>
		<ellipse
			cx={9}
			cy={10.5}
			rx={1}
			ry={1.5}
			fill='#1C274C'
			{...(props as any)}
		/>
	</svg>
);

export default SmileyIcon;
