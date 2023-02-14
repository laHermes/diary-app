import tw from 'tailwind-styled-components';

export const LoginPage = tw.div<any>`flex flex-col items-center justify-center w-screen h-screen gap-4 text-center `;
export const Wrapper = tw.div<any>`flex flex-col items-center justify-center gap-1`;
export const Title = tw.p<any>`m-0 text-2xl font-bold`;
export const Subtitle = tw.p<any>`text-md`;
export const PrivacyPolicy = tw.p`text-xs font-light w-72`;

export const StyledLoginSocialButton = tw.button<any>`border relative flex items-center justify-center px-6 w-72 h-16 font-semibold rounded-xl text-background-nav bg-white text-black/80`;
export const IconContainer = tw.div<any>`absolute flex items-center h-full left-6`;
