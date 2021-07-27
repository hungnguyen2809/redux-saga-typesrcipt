import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import merge from 'lodash/merge';

const instanceAxios = axios.create({
  baseURL: 'http://js-post-api.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instanceAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return { status: response.status, ...response.data };
  },
  (error) => {
    return Promise.reject(error);
  }
);

const _makeRequestApi =
  (instanceRequest: AxiosInstance) =>
  async (config: AxiosRequestConfig): Promise<any> => {
    try {
      const targetConfig = {
        headers: {
          Authorization: 'vithingochuyen',
        },
      };
      const options: AxiosRequestConfig = merge(targetConfig, config);

      return await instanceRequest(options);
    } catch (error) {
      throw error;
    }
  };

export const apis = {
  makeRequestApi: _makeRequestApi(instanceAxios),
};
