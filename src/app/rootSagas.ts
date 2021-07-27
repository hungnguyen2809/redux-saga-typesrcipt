import { all, call } from 'redux-saga/effects';
import counterSaga from 'features/counter/counterSaga';

export default function* rootSagas() {
  yield all([call(counterSaga)]);
}
