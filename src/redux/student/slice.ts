import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';

interface IStudentState {
  loading: boolean;
  list: Student[];
  filter?: ListParams;
  pagination?: PaginationParams;
}

const initialState: IStudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
};

const studentSilce = createSlice({
  name: 'StudentSilce',
  initialState,
  reducers: {
    fetchStudents(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentsSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchStudentsFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
  },
});

//Actions
export const studentActions = studentSilce.actions;

//Selectors
export const studentSelectors = {
  loading: (state: RootState) => state.student.loading,
  listStudent: (state: RootState) => state.student.list,
  filter: (state: RootState) => state.student.filter,
  pagination: (state: RootState) => state.student.pagination,
};

//Reducers
const studentReducer = studentSilce.reducer;

export default studentReducer;
