import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '@config/motion';

type MotionContainerProps = {
	children: React.ReactNode;
};

const MotionContainer = ({ children }: MotionContainerProps) => {
	return (
		<motion.div
			key='searchOverlay'
			variants={motionVariants}
			initial='hidden'
			animate='enter'
			exit='exit'
			className='absolute inset-x-0 flex justify-center min-h-screen pt-12 pl-0 mx-auto overflow-y-auto w-[100vw] bg-backgroundLight dark:bg-black'>
			{children}
		</motion.div>
	);
};

export default MotionContainer;
