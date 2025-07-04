import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {BACKEND_URL, REQUEST_TIMEOUT} from '../const';
import {getToken} from './token';
import {processErrorHandle} from './process-error-handle';

type MessageDetails = {
  type: string;
  message: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldShowError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

function createApi(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<MessageDetails>) => {
      if (error.response && shouldShowError(error.response)) {
        const messageDetails = (error.response.data);

        processErrorHandle(messageDetails.message);
      }
    }
  );

  return api;
}

export {createApi};
