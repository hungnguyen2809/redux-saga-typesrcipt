import axiosClient from './createApiService';
import { City, ListResponse } from 'models';

// export const getAllStudent = (): Promise<ListResponse<City>> => {
//   return apis.makeRequestApi({
//     url: '/cities',
//     method: 'GET',
//   });
// };

const apiCity = {
  getAllCity(): Promise<ListResponse<City>> {
    return axiosClient.get('/cities', {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
  },
};

export default apiCity;
