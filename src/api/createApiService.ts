import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import merge from 'lodash/merge';

const axiosClient = axios.create({
  baseURL: 'http://js-post-api.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const configure = (config: AxiosRequestConfig = {}): AxiosRequestConfig => {
  const targetConfig = {
    headers: {
      Authorization: 'vithingochuyen',
    },
  };
  return merge(targetConfig, config);
};

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return configure(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return { status: response.status, ...response.data };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;

// const _makeRequestApi =
//   (instanceRequest: AxiosInstance) =>
//   async (config: AxiosRequestConfig): Promise<any> => {
//     try {
//       const targetConfig = {
//         headers: {
//           Authorization: 'vithingochuyen',
//         },
//       };
//       const options: AxiosRequestConfig = merge(targetConfig, config);

//       return await instanceRequest(options);
//     } catch (error) {
//       throw error;
//     }
//   };

// export const apis = {
//   makeRequestApi: _makeRequestApi(axiosClient),
// };
