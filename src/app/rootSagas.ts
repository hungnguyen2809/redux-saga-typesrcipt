import { all, call } from 'redux-saga/effects';
import counterSaga from 'features/counter/counterSaga';
import AuthSaga from 'redux/auth/saga';
import DashboardSaga from 'redux/dashboard/saga';
import StudentSaga from 'redux/student/saga';
import CitySaga from 'redux/city/saga';

export default function* rootSagas() {
  yield all([
    call(counterSaga),
    call(AuthSaga),
    call(DashboardSaga),
    call(StudentSaga),
    call(CitySaga),
  ]);
}
