import axios from "axios";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;
axios.defaults.responseType = "json";
axios.defaults.withCredentials = true;
axios.defaults.transformResponse = [
  (data) => {
    if (!data) return null;
		if (data.status < 200 || data.status >= 300) return data;
		const parsedData = JSON.parse(data).data;
		if (!parsedData) return data;
    return parsedData;
  },
];

export default axios;
