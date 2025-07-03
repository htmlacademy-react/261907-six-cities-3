import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {BACKEND_URL, REQUEST_TIMEOUT} from '../const';
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
