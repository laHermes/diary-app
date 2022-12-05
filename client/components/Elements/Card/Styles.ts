import tw from 'tailwind-styled-components';

export const Card = tw.div<any>`overflow-hidden rounded-xl w-full shadow-md p-3 bg-wite hover:bg-stone-100 dark:bg-cardDark dark:hover:bg-darkButtonHover transition-all`;
export const CardBody = tw.div<any>`flex flex-row gap-4`;
export const CardLeft = tw.div<any>`flex flex-col justify-start gap-1`;
export const CardRight = tw.div<any>`flex-1 flex flex-col justify-between w-72 overflow-hidden`;
