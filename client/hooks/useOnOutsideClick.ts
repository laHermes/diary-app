import { useEffect, useRef } from 'react';
import useMemoizeCompare from './useMemoizeCompare';

interface IUseOnOutsideClick {
	(
		$ignoredElementRefs: any,
		isListening: any,
		onOutsideClick: any,
		$listeningElementRef: any
	): any;
}

// Allows modal to be closed on outside click
const useOnOutsideClick: IUseOnOutsideClick = (
	$ignoredElementRefs,
	isListening,
	onOutsideClick,
	$listeningElementRef
) => {
	const $mouseDownTargetRef = useRef();

	const $ignoredMemoizedElementsRefs = useMemoizeCompare(
		[$ignoredElementRefs].flat()
	);

	useEffect(() => {
		const handleMouseDown = (event: any) => {
			$mouseDownTargetRef.current = event.target;
		};

		const handleMouseUp = (event: any) => {
			const isAnyIgnoredElementAncestorOfTarget =
				$ignoredMemoizedElementsRefs.some(
					($elemRef: any) =>
						$elemRef.current.contains($mouseDownTargetRef.current) ||
						$elemRef.current.contains(event.target)
				);

			if (event.button === 0 && !isAnyIgnoredElementAncestorOfTarget) {
				onOutsideClick();
			}
		};

		const $listeningElement = ($listeningElementRef || {}).current || document;
		if (isListening) {
			$listeningElement.addEventListener('mousedown', handleMouseDown);
			$listeningElement.addEventListener('mouseup', handleMouseUp);
		}
		return () => {
			$listeningElement.removeEventListener('mousedown', handleMouseDown);
			$listeningElement.removeEventListener('mouseup', handleMouseUp);
		};
	}, [
		$ignoredMemoizedElementsRefs,
		$listeningElementRef,
		isListening,
		onOutsideClick,
	]);

	return {};
};

export default useOnOutsideClick;
