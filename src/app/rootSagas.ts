import { all, call } from 'redux-saga/effects';
import counterSaga from 'features/counter/counterSaga';
import AuthSaga from 'redux/auth/saga';
import DashboardSaga from 'redux/dashboard/saga';

export default function* rootSagas() {
  yield all([call(counterSaga), call(AuthSaga), call(DashboardSaga)]);
}
