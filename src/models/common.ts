interface BaseResponse {
  status: number;
}

interface PaginationParams {
  _limit: number;
  _page: number;
  _total: number;
}

export interface ListResponse<T> extends BaseResponse {
  data: T[];
  pagination?: PaginationParams;
}
