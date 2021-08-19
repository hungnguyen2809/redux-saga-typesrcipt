import { PayloadAction } from '@reduxjs/toolkit';
import apiStudent from 'api/apiStudent';
import { ListParams, ListResponse, Student } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
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

export default function* StudentSaga() {
  yield takeLatest(studentActions.fetchStudents.type, fetchStudents);
}
