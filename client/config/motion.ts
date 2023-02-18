export const motionVariants = {
	hidden: { opacity: 0, x: 0, y: 0 },
	enter: {
		opacity: 1,
		transition: {
			delayChildren: 0.1,
		},
	},
	exit: { opacity: 0, x: 0, y: 0 },
};
