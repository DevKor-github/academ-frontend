import axios from 'axios';

export const backend = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export enum AxiosCommonFailure {
  UNCAUGHT,
}
