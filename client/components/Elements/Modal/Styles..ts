import tw from 'tailwind-styled-components';

export const ModalTitle = tw.div<any>`font-medium text-left`;
export const ModalSubtitle = tw.div<any>`text-left`;

export const ModalFooter = tw.div<any>`flex justify-center py-4`;
export const ModalFooterButton = tw.button`inline-flex justify-center gap-3 px-8 py-4 text-xl font-semibold text-center text-white transition-all duration-200 bg-indigo-800 rounded-full w-fit font-jost hover:bg-indigo-900 hover:dark:bg-slate-800`;