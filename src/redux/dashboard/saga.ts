import apiCity from 'api/apiCity';
import apiStudent from 'api/apiStudent';
import { City, ListResponse, Student } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardActions } from './slice';
import { RankingCity } from './types';

function* fetchStatistics() {
  const response: Array<ListResponse<Student>> = yield all([
    call(apiStudent.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(apiStudent.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(apiStudent.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(apiStudent.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);

  const statisticsList = response.map((item) => item.pagination._totalRows);
  const [maleCount, femaleCount, hightMarkCount, lowMarkCount] = statisticsList;
  yield put(
    dashboardActions.setStatistics({ maleCount, femaleCount, hightMarkCount, lowMarkCount })
  );
}

function* fetchHighestStudent() {
  const response: ListResponse<Student> = yield call(apiStudent.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });
  yield put(dashboardActions.setHigestStudent(response.data));
}

function* fetchLowestStudent() {
  const response: ListResponse<Student> = yield call(apiStudent.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });
  yield put(dashboardActions.setLowestStudent(response.data));
}

function* fetchRankingByCity() {
  // fetch list city
  const { data: cityList }: ListResponse<City> = yield call(apiCity.getAllCity);

  // map listCity
  const callList = cityList.map((city) =>
    call(apiStudent.getAll, { _page: 1, _limit: 5, _sort: 'mark', _order: 'desc', city: city.code })
  );
  const response: Array<ListResponse<Student>> = yield all(callList);

  const rankingByCityList: Array<RankingCity> = response.map((student, idx) => ({
    id: cityList[idx].code,
    name: cityList[idx].name,
    rankings: student.data,
  }));

  yield put(dashboardActions.setRankingByCitys(rankingByCityList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudent),
      call(fetchLowestStudent),
      call(fetchRankingByCity),
    ]);
    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    yield put(dashboardActions.fetchDataFailed());
    console.log('Error get dashboard data: ', JSON.stringify(error));
  }
}

export default function* DashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
