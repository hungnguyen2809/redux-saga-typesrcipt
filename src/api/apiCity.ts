import { apis } from 'api/createApiService';
import { City, ListResponse } from 'models';

export const getAllStudent = (): Promise<ListResponse<City>> => {
  return apis.makeRequestApi({
    url: '/cities',
    method: 'GET',
  });
};
