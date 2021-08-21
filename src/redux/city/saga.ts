import apiCity from 'api/apiCity';
import { City, ListResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { cityActions } from './slice';

function* fetchCitys() {
  try {
    const response: ListResponse<City> = yield call(apiCity.getAllCity);
    yield put(cityActions.fetchCitySuccess(response));
  } catch (error) {
    console.log('Error', error);
    yield put(cityActions.fetchCityFailed());
  }
}

export default function* CitySaga() {
  yield takeLatest(cityActions.fetchCitys.type, fetchCitys);
}
