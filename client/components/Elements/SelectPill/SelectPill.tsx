import React, { ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof button> {
	children: React.ReactNode;
}

const button = cva(
	'rounded-md uppercase border border-transparent w-fit rounded-xl px-2 py-0.5 uppercase shadow-md font-jost transition-all duration-200',
	{
		variants: {
			variant: {
				default:
					'bg-white dark:bg-cardDark hover:bg-zinc-50 hover:dark:bg-zinc-800',
				selected: 'bg-zinc-800 text-white dark:bg-zinc-800 hover:bg-zinc-900',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

const SelectPill = ({ children, onClick, variant }: ButtonProps) => {
	return (
		<button onClick={onClick} className={button({ variant })}>
			{children}
		</button>
	);
};

export default SelectPill;
