import React, {
	ReactNode,
	useContext,
	useEffect,
	useState,
	createContext,
	ReactElement,
} from 'react';
import { BottomSheet as ReactBottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import warning from 'warning';
import clsx from 'clsx';

interface IBottomSheet {
	children: ReactNode;
	isOpen?: boolean;
	onDismiss?: () => any;
	onOpen?: () => any;
}
const BottomSheetContext = createContext<any>({});

function useBottomSheetContext() {
	const context = useContext(BottomSheetContext);
	if (!context) {
		throw new Error(
			`This compound components cannot be rendered outside the BottomSheet component`
		);
	}
	return context;
}

const callAll =
	(...fns: Function[]) =>
	(...args: any) =>
		fns.forEach((fn: Function) => fn && fn(...args));

const BottomSheet = ({ children, isOpen, onDismiss, onOpen }: IBottomSheet) => {
	const [stateValue, setStateValue] = useState<boolean>(false);

	const isControlled = isOpen != null;
	const state = isControlled ? isOpen : stateValue;

	const hasOnDismiss = Boolean(onDismiss);

	useEffect(() => {
		warning(
			!(!hasOnDismiss && isControlled),
			`An \`isOpen\` props was provided to BottomSheet component without an \`onDismiss\` handler.`
		);
	}, [hasOnDismiss, isControlled]);

	const handleOnDismiss = () => {
		if (!isControlled) {
			setStateValue(false);
		}
		onDismiss?.();
	};

	const handleToggle = () => {
		if (!isControlled) {
			setStateValue((state) => !state);
		}
		onOpen?.();
	};

	const getBottomSheetProps = ({ onClick = () => {}, ...props }) => {
		return {
			onClick: callAll(handleToggle, onClick),
			...props,
		};
	};
	const value = { state, handleOnDismiss, handleToggle, getBottomSheetProps };

	// looks for a direct child which has isOutsideSheet prop set to true
	// this may be an anti pattern since data flow should be unidirectional
	// const ExternalToggleChild = React.Children.map(
	// 	children,
	// 	(child: ReactNode) => {
	// 		if (React.isValidElement(child) && child?.props?.isOutsideSheet) {
	// 			return child;
	// 		}
	// 	}
	// );

	return (
		<BottomSheetContext.Provider value={value}>
			{children}
		</BottomSheetContext.Provider>
	);
};

const Sheet = ({ children }: { children: ReactElement }) => {
	const { state, handleOnDismiss } = useBottomSheetContext();

	return (
		<ReactBottomSheet
			open={state}
			onDismiss={handleOnDismiss}
			snapPoints={({ minHeight }) => minHeight}>
			{children}
		</ReactBottomSheet>
	);
};

// Section
const Section = ({
	children,
	onClick = () => {},
	className = '',
}: {
	children: ReactNode;
	onClick?: () => any;
	className?: string;
}) => {
	return (
		<div
			onClick={() => onClick()}
			className={clsx(
				'flex w-full items-center justify-between gap-1 px-1 py-3 text-left hover:bg-zinc-800',
				className
			)}>
			{children}
		</div>
	);
};
// Toggle
const Toggle = ({ children }: { children: ReactElement }) => {
	const { handleToggle } = useBottomSheetContext();

	return React.cloneElement(children, {
		onClick: () => handleToggle(),
	});
};

// Close
const Close = ({ children }: { children: ReactElement }) => {
	const { handleOnDismiss } = useBottomSheetContext();

	return React.cloneElement(children, {
		onClick: () => handleOnDismiss(),
	});
};

// Close
const ActionWithClose = ({
	children,
	onClick = () => {},
}: {
	children: ReactElement;
	onClick?: () => any;
}) => {
	const { getBottomSheetProps } = useBottomSheetContext();

	return React.cloneElement(children, {
		...getBottomSheetProps({ onClick: onClick }),
	});
};

// Close
const ValueList = ({
	values,
	fallbackValue,
}: {
	values?: string[];
	fallbackValue: string;
}) => {
	return (
		<div className='inline-flex gap-2 m-0 font-medium text-right uppercase'>
			{values?.map((value: string) => {
				return (
					<p className='m-0' key={value}>
						&ldquo;{value}&rdquo;
					</p>
				);
			})}

			{!values?.length && (fallbackValue ? fallbackValue : 'No tags')}
		</div>
	);
};

BottomSheet.Sheet = Sheet;
BottomSheet.Section = Section;
BottomSheet.Toggle = Toggle;
BottomSheet.Close = Close;
BottomSheet.ActionWithClose = ActionWithClose;
BottomSheet.ValueList = ValueList;

export default BottomSheet;
