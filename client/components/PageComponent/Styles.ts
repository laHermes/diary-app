import tw from 'tailwind-styled-components';

export const PageComponent = tw.div<any>`w-full min-h-screen pt-12 sm:pl-28 md:pl-48`;
export const PageLayout = tw.div<any>`flex flex-col w-full max-w-screen-md gap-10 px-5 mx-auto `;
export const PageTitle = tw.h1<any>`m-0 text-3xl font-semibold leading-none text-black cursor-pointer w-fit dark:text-white font-playfair`;
export const PageSubtitle = tw.p<any>`mb-0 text-xl leading-none`;

export const PageCard = tw.div<any>`py-2 overflow-hidden bg-white rounded-xl dark:bg-cardDark drop-shadow-lg`;
export const PageCardBody = tw.div<any>`flex flex-col w-full gap-2 divide-y`;
export const PageCardButton = tw.button<any>`flex items-center self-center justify-between w-full px-5 py-3 font-semibold text-left transition-all text-[16px] hover:bg-gray-100 dark:hover:bg-darkButtonHover`;
export const PageSection = tw.div<any>`flex flex-col gap-2 m-0`;

export const PageLogoSection = tw.div<any>`flex flex-col gap-2 p-5`;
export const PageLogo = tw.p<any>`self-center p-0 m-0 text-4xl font-semibold leading-none cursor-pointer font-playfair dark:text-white`;
