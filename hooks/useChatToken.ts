import { useEffect, useState } from "react";
import axios from '../lib/axios';

type useChatToken = () => [string|null, boolean, string|null]
const useChatToken: useChatToken = () => {
	const [token, setToken] = useState<string|null>(null);
	const [error, setError] = useState<string|null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = window.localStorage.getItem("chatToken");
		if (token) {
			setToken(token);
			return;
		}

		axios("/token")
			.then(({data}) => {
				window.localStorage.setItem("chatToken", data.token);
				setToken(data.token);
			})
		.catch(() => setError('Unauthorized'))
		.finally(() => setLoading(false));
	}, [])

	return [token, loading, error];
}

export default useChatToken
