import tw from 'tailwind-styled-components';

export const InsightsItems = tw.div<any>`inline-flex items-center w-full gap-3 px-5 py-3 text-lg justify-evenly`;
export const InsightsItem = tw.div<any>`flex flex-col items-center gap-3`;

export const InsightsValue = tw.div<any>`text-3xl text-center font-jost`;
export const InsightsSub = tw.div<any>`w-16 m-0 text-sm text-center uppercase break-normal leading-1 font-jost dark:text-white/80`;

export const ThinBorder = tw.div<any>`w-[47em] h-[1.5px] mx-auto bg-stone-50 dark:bg-stone-800`;
