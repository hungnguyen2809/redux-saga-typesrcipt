import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Student } from 'models';
import { DashboardState, DashboardStatistics, RankingCity } from './types';

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    hightMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudents: [],
  lowestStudents: [],
  rankingByCitys: [],
};

const dashboardSlice = createSlice({
  name: 'DashboardSlice',
  initialState,
  reducers: {
    fetchData: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state) => {
      state.loading = false;
    },
    fetchDataFailed: (state) => {
      state.loading = false;
    },

    setStatistics: (state, action: PayloadAction<DashboardStatistics>) => {
      state.statistics = action.payload;
    },
    setHigestStudent: (state, action: PayloadAction<Student[]>) => {
      state.highestStudents = action.payload;
    },
    setLowestStudent: (state, action: PayloadAction<Student[]>) => {
      state.lowestStudents = action.payload;
    },
    setRankingByCitys: (state, action: PayloadAction<RankingCity[]>) => {
      state.rankingByCitys = action.payload;
    },
  },
});

//Actions
export const dashboardActions = dashboardSlice.actions;

//Selectors
export const dashboardSelectors = {
  loadingDashboard: (state: RootState) => state.dashboard.loading,
  statisticsDashboard: (state: RootState) => state.dashboard.statistics,
  highestStudentsDashboard: (state: RootState) => state.dashboard.highestStudents,
  lowestStudentsDashboard: (state: RootState) => state.dashboard.lowestStudents,
  rankByCitysDashboard: (state: RootState) => state.dashboard.rankingByCitys,
};

//Reducer
const dashboardReducer = dashboardSlice.reducer;
//**----------*/
export default dashboardReducer;
