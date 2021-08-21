import { PayloadAction } from '@reduxjs/toolkit';
import apiStudent from 'api/apiStudent';
import { ListParams, ListResponse, Student } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { studentActions } from './slice';

function* fetchStudents(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(apiStudent.getAll, action.payload);
    yield put(studentActions.fetchStudentsSuccess(response));
  } catch (error) {
    yield put(studentActions.fetchStudentsFailed());
    console.log('Error ', error);
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}

export default function* StudentSaga() {
  yield takeLatest(studentActions.fetchStudents.type, fetchStudents);
  yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}
