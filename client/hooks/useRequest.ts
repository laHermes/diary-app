import axios from 'axios';
import { useState } from 'react';

export const useRequest = ({ url, method, onSuccess }: any) => {
	const [errors, setErrors] = useState(null);

	const onRequest = async (body: any) => {
		return new Promise(async (resolve, reject) => {
			try {
				setErrors(null);
				const response = await axios({
					method,
					url,
					data: body,
					withCredentials: true,
				});

				if (onSuccess) {
					onSuccess(response.data);
				}
				resolve(response.data);
				return response.data;
			} catch (err: any) {
				reject(err);
				setErrors(err.message);
			}
		});
	};

	return { onRequest, errors };
};
