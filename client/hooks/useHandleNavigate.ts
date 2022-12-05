import { useRouter } from 'next/router';

const useHandleNavigate = () => {
	const router = useRouter();

	const handleRedirect = (target: string) => {
		const prefix = router.pathname.includes('app') ? '/app' : '/demo';
		router.push(prefix + target);
	};

	return { handleRedirect };
};

export default useHandleNavigate;
