import axios from "axios";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;
axios.defaults.responseType = "json";
axios.defaults.transformResponse = [
  (data) => {
    if (!data) return null;
    return JSON.parse(data).data;
  },
];

export default axios;
