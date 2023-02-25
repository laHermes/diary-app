import { Reducer, useCallback, useReducer } from 'react';

const ACTION_TYPES = {
	OPEN: 'OPEN',
	CLOSE: 'CLOSE',
};

type TOpenAction = {
	type: Exclude<keyof typeof ACTION_TYPES, 'CLOSE'>;
	payload: string;
};
type TCloseAction = {
	type: Exclude<keyof typeof ACTION_TYPES, 'OPEN'>;
};

type ReducerType = TOpenAction | TCloseAction;

const reducer: Reducer<any, ReducerType> = (
	state: any,
	action: ReducerType
) => {
	switch (action.type) {
		case 'OPEN':
			return { ...state, modal: action.payload };
		case 'CLOSE':
			return { ...state, modal: null };
		default:
			throw new Error();
	}
};

type useModalStateType = {
	initialModal?: string;
};

const useModalState = ({ initialModal = '' }: useModalStateType) => {
	const initialState = {
		modal: initialModal || null,
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const isModalOpen = useCallback(
		(modal: string) => modal === state.modal,
		[state]
	);

	const onOpenModal = (payload: string) => {
		dispatch({ type: 'OPEN', payload });
	};
	const onCloseModal = () => {
		dispatch({ type: 'CLOSE' });
	};
	return { state, dispatch, onOpenModal, onCloseModal, isModalOpen };
};

export default useModalState;
