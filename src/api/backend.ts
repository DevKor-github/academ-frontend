import axios from 'axios';

export const backend = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  withCredentials: true,
});

backend.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 302) {
      // Extract the redirect URL
      let redirectUrl = error.response.headers.location;

      // If the redirect URL is HTTP, change it to HTTPS
      if (redirectUrl.startsWith('http:')) {
        redirectUrl = redirectUrl.replace('http:', 'https:');
      }

      // Create a new request to the modified URL
      return axios({
        method: error.config.method,
        url: redirectUrl,
        headers: error.config.headers,
        data: error.config.data,
      });
    }

    return Promise.reject(error);
  },
);

export enum AxiosCommonFailure {
  UNCAUGHT,
}
