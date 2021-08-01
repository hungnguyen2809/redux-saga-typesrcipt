import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { User } from 'models';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions } from './slice';
import { LoginPayload } from './types';

function* workerLogin(action: PayloadAction<LoginPayload>) {
  try {
    yield delay(1000);
    localStorage.setItem('access_token', 'hungnv_token_' + JSON.stringify(action.payload));
    const user: User = { id: 1, name: 'Nguyễn Văn Hùng' };
    yield put(authActions.action_Login_Success(user));
    yield put(push('./admin/dashboard'));
  } catch (error) {
    yield put(authActions.action_Login_Failed(error.message));
  }
}

function* workerLogout() {
  yield delay(1000);
  localStorage.removeItem('access_token');
  yield put(push('/login'));
}

function* watchLoginFlow() {
  // take is blocking => đứng đợi
  // bắt đầu vào đứng đợi action login sau đó thực hiện task login và đứng đợi một action logout
  // cuối cùng là nó chạy xong hết rồi, để muốn có thể liên tục lắng nghe dùng while true
  while (true) {
    const isLoggin = localStorage.getItem('access_token');
    //kiểm tra nếu đã đăng nhập có access_token thì không lắng nghe login
    if (!isLoggin) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.action_Login.type);
      yield fork(workerLogin, action);
    }

    yield take(authActions.action_Logout.type);
    yield call(workerLogout);
  }
}

export default function* AuthSaga() {
  yield fork(watchLoginFlow);
}
