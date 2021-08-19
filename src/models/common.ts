interface BaseResponse {
  status: number;
}

export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> extends BaseResponse {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _order?: 'asc' | 'desc';
  _sort?: string;

  [key: string]: any; //dùng để khai báo kiểu dữ liệu khác thêm tự do(thêm key bất kỳ và dữ liệu bất kỳ)
}

export interface AppPayload<D = any, S = any, E = any> {
  data: D;
  callbacks?: {
    onSuccess?: (res: S) => void;
    onError?: (error: E) => void;
  };
}
