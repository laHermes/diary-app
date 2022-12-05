import React from 'react';

export const Card = ({ children }: IChildren) => {
	return (
		<div className='flex flex-col gap-3 bg-base-100 p-5 rounded-[20px] drop-shadow-2xl max-w-screen-sm w-full '>
			{children}
		</div>
	);
};
