import { useEffect, useState } from "react";
import axios from '../lib/axios';

const useChatToken = () => {
	const [token, setToken] = useState<string|null>(null);

	useEffect(() => {
		axios("/token")
			.then(({data}) => {
				setToken(data.token);
			})
		.catch(console.error);
	}, [])

	return token;
}

export default useChatToken
