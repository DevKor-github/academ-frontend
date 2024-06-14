"use client";

import axios from 'axios';
import { AxiosError } from 'axios';
import { AxiosRequestConfig } from 'axios';

const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  maxRedirects: 0,
  withCredentials: true,
});

class ApiError extends Error {
  code: number | undefined;

  constructor(code? : number) {
    super();
    this.code = code;
  }
}

const buildUrlWithParams = (baseUrl: string, req: Record<string, (string | number)>) => {
  const newReq = Object.keys(req).reduce((acc : Record<string, string>, key) => { acc[key] = String(req[key]);  return acc}, {});
  const params = new URLSearchParams(newReq).toString();
  return params !== '' ? `${baseUrl}?${params}` : baseUrl;
};


export interface ApiResponse<T> {
  status: "SUCCESS" | "ERROR",
  data: T,
  message: string,
  version: string,
};

export function build<Req, Res>(method: "POST" | "GET", path: string, allowedStatus: number[], config? : AxiosRequestConfig) {
  return async function (req: Req): Promise<ApiResponse<Res>> {
    try {

      const ret = (method === "POST" ? backend
        .post(path, req,
          {
            ...{validateStatus: (status: number) => status >= 200 && status < 300 || allowedStatus.includes(status)},
            ...config
          }) : backend.get(buildUrlWithParams(path, req as Record<string, string | number>),
            {
              ...{validateStatus: (status: number) => status >= 200 && status < 300 || allowedStatus.includes(status)},
              ...config
            }));

    
      return await ret.then((res) => {
        try {
          return Promise.resolve(res.data as ApiResponse<Res>);
          
          }
          catch {

            return Promise.reject("parse error");
          }
      }
      ).catch((error: AxiosError) => {
        if (error.response) {
          return Promise.reject(new ApiError(error.response?.status));
        }
        return Promise.reject(new ApiError());
      }).catch((e) =>
        Promise.reject("unknown error ")
      );
    }
    catch (e) {
      return Promise.reject("unknown error ");
    }
  }
}
