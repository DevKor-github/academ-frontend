import axios from 'axios';

const backend = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

enum AxiosCommonFailure {
  UNCAUGHT,
}

export default backend;
