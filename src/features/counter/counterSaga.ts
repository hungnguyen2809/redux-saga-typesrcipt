import { PayloadAction } from '@reduxjs/toolkit';
import { delay, fork, put, takeLatest } from 'redux-saga/effects';
import { incrementSaga, incrementSagaDone } from './counterSlice';

function* workIncrement(actions: PayloadAction<number>) {
  // const response = yield call(fetchCount, actions.payload);
  yield delay(1000);
  yield put(incrementSagaDone(actions.payload));
}

function* watcherLog() {
  yield takeLatest(incrementSaga.toString(), workIncrement);
}

export default function* counterSaga() {
  yield fork(watcherLog);
}
