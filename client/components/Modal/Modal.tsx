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
	onChange?: Function;
}

// MODAL
const Modal = ({ children, value: propsValue = false, onChange }: IModal) => {
	const [isOpen, setIsOpen] = useState<boolean>(propsValue);

	useEffect(() => {
		setIsOpen(propsValue || false);
	}, [propsValue]);

	const changeHandler = () => {
		setIsOpen((state) => !state);
		onChange && onChange((state: any) => !state);
	};

	const value = { isOpen, changeHandler };

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

const Body = ({ children }: { children: ReactElement }) => {
	const { isOpen, changeHandler } = useModalContext();

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={changeHandler}>
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
							<Dialog.Panel className='max-w-md overflow-hidden text-left align-middle transition-all transform bg-transparent shadow-xl rounded-2xl'>
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
	const { changeHandler } = useModalContext();

	return React.cloneElement(children, {
		onClick: () => changeHandler(),
	});
};

// TOGGLE
const ToggleButton = ({ children }: { children: ReactElement }) => {
	const { changeHandler } = useModalContext();

	return React.cloneElement(children, {
		onClick: () => changeHandler(),
	});
};

Modal.Body = Body;
Modal.Close = CloseButton;
Modal.Toggle = ToggleButton;

export default Modal;

// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment, useState } from 'react';

// export default function MyModal() {
// 	let [isOpen, setIsOpen] = useState(true);

// 	function closeModal() {
// 		setIsOpen(false);
// 	}

// 	function openModal() {
// 		setIsOpen(true);
// 	}

// 	return (
// 		<>
// 			<Transition appear show={isOpen} as={Fragment}>
// 				<Dialog as='div' className='relative z-10' onClose={closeModal}>
// 					<Transition.Child
// 						as={Fragment}
// 						enter='ease-out duration-300'
// 						enterFrom='opacity-0'
// 						enterTo='opacity-100'
// 						leave='ease-in duration-200'
// 						leaveFrom='opacity-100'
// 						leaveTo='opacity-0'>
// 						<div className='fixed inset-0 bg-black bg-opacity-25' />
// 					</Transition.Child>

// 					<div className='fixed inset-0 overflow-y-auto'>
// 						<div className='flex items-center justify-center min-h-full p-4 text-center'>
// 							<Transition.Child
// 								as={Fragment}
// 								enter='ease-out duration-300'
// 								enterFrom='opacity-0 scale-95'
// 								enterTo='opacity-100 scale-100'
// 								leave='ease-in duration-200'
// 								leaveFrom='opacity-100 scale-100'
// 								leaveTo='opacity-0 scale-95'>
// 								<Dialog.Panel className='w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'></Dialog.Panel>
// 							</Transition.Child>
// 						</div>
// 					</div>
// 				</Dialog>
// 			</Transition>
// 		</>
// 	);
// }
