import { useEffect, useRef, useState } from 'react';

const useHasChanges = ({ deps }: { deps: any[] }) => {
	const [hasChanges, setHasChanges] = useState<boolean>(false);

	const isInitialMount = useRef(true);

	// runs after component is mounted
	// changes state for save or cancel - FLOATING BUTTON
	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			setHasChanges(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps || []);

	const resetHasChanges = () => {
		setHasChanges(false);
	};

	return { hasChanges, resetHasChanges };
};

export default useHasChanges;
