import { callAll } from '@utils/index';
import React, {
	createContext,
	ReactElement,
	ReactNode,
	useContext,
} from 'react';

interface IFloatingButton {
	children: ReactNode;
	hasChanges: boolean;
}

const FloatingButtonContext = createContext<any>({});

const useFloatingButtonContext = () => {
	const context = useContext(FloatingButtonContext);

	if (!context) {
		throw new Error(
			`This compound components cannot be rendered outside the FloatingButton component`
		);
	}
	return context;
};

const FloatingButton = ({ children, hasChanges = false }: IFloatingButton) => {
	const getFloatingButtonProps = ({ onClick = () => {}, ...props }) => {
		return {
			onClick: callAll(onClick),
			...props,
		};
	};
	const value = { hasChanges, getFloatingButtonProps };

	return (
		<FloatingButtonContext.Provider value={value}>
			<div className='fixed transition-all duration-200 bg-indigo-800 rounded-full shadow-2xl right-10 bottom-20 drop-shadow-md hover:bg-indigo-900 md:right-5'>
				<div className='relative flex items-center justify-end w-full h-12 max-w-screen-md mx-auto md:h-fit '>
					<div className='z-50 -top-5 right-10'>
						<div className='z-50 flex items-center justify-center w-12 h-12 p-4 transition-all duration-200 bg-indigo-700 rounded-full shadow-2xl hover:bg-indigo-800'>
							{children}
						</div>
					</div>
				</div>
			</div>
		</FloatingButtonContext.Provider>
	);
};

const Action = ({
	children,
	onClick = () => {},
}: {
	children: ReactElement;
	onClick?: Function;
}) => {
	const { getFloatingButtonProps } = useFloatingButtonContext();

	return (
		<button {...getFloatingButtonProps({ onClick: () => onClick() })}>
			{children}
		</button>
	);
};

FloatingButton.Action = Action;

export default FloatingButton;
