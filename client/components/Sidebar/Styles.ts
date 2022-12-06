import tw from 'tailwind-styled-components';

export const StyledSidebar = tw.div<any>`flex-col hidden h-full gap-5 sm:flex w-28 md:w-48`;
export const StyledSidebarBody = tw.div<any>`fixed inset-y-0 flex flex-col justify-between h-full pt-12 dark:bg-black w-28 md:w-48`;
export const StyledSidebarButton = tw.button<any>`inline-flex justify-center w-full gap-3 px-6 py-6 text-center transition-all duration-200 rounded-full md:justify-start hover:bg-accent/20 hover:dark:bg-accent/20`;
export const StyledSidebarButtonText = tw.span<any>`self-center hidden text-base font-light md:block font-jost text-zinc-400`;
