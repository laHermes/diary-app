import React, {
	useState,
	Fragment,
	createContext,
	useEffect,
	useContext,
	ReactElement,
	ReactNode,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';

const ModalContext = createContext<any>({});

function useModalContext() {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error(
			`Modal compound components cannot be rendered outside the Modal component`
		);
	}
	return context;
}

interface IModal {
	children: ReactNode;
	value?: boolean;
	onCloseModal?: () => any;
}

// MODAL
const Modal = ({
	children,
	value: propsValue = false,
	onCloseModal,
}: IModal) => {
	const [isOpen, setIsOpen] = useState<boolean>(propsValue);

	useEffect(() => {
		setIsOpen(propsValue);
	}, [propsValue]);

	const closeHandler = () => {
		setIsOpen(false);
		onCloseModal && onCloseModal();
	};

	const value = { isOpen, closeHandler };

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

const Body = ({ children }: { children: ReactElement }) => {
	const { isOpen, closeHandler } = useModalContext();

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={closeHandler}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex items-center justify-center min-h-full p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<Dialog.Panel className='w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-transparent shadow-xl rounded-2xl'>
								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

// CLOSE
const CloseButton = ({ children }: { children: ReactElement }) => {
	const { closeHandler } = useModalContext();

	return React.cloneElement(children, {
		onClick: closeHandler,
	});
};

Modal.Body = Body;
Modal.Close = CloseButton;

export default Modal;
