import axiosClient from './createApiService';
import { Student, ListResponse, ListParams } from 'models';

const apiStudent = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    const url = '/students';
    return axiosClient.get(url, { params });
  },
  find(id: string): Promise<Student> {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },
  add(data: Student): Promise<Student> {
    const url = '/students';
    return axiosClient.post(url, data);
  },
  update(data: Partial<Student>): Promise<Student> {
    //Partial: một phần, chỉ cần truyền một phần của Student không cần truyền full
    const url = `/students/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id: string): Promise<any> {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
};

export default apiStudent;
