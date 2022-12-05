import tw from 'tailwind-styled-components';

export const LoginPage = tw.div<any>`w-screen h-screen flex flex-col gap-4 justify-center items-center text-center `;
export const Wrapper = tw.div<any>`flex flex-col gap-1 justify-center items-center`;
export const Title = tw.p<any>`font-bold text-2xl`;
export const Subtitle = tw.p<any>`text-md`;
export const PrivacyPolicy = tw.p`w-72 text-xs font-light`;

export const StyledLoginSocialButton = tw.button<any>`border relative flex items-center justify-center px-6 w-72 h-16 font-semibold rounded-xl text-background-nav bg-white text-black/80`;
export const IconContainer = tw.div<any>`absolute left-6 flex items-center h-full`;
