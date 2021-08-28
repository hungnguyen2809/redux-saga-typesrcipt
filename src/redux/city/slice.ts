import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

interface ICityState {
  loading: boolean;
  citys: City[];
}

const initialState: ICityState = {
  loading: false,
  citys: [],
};

const citySlice = createSlice({
  name: 'CitySlice',
  initialState,
  reducers: {
    fetchCitys(state) {
      state.loading = true;
    },
    fetchCitySuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.citys = action.payload.data;
    },
    fetchCityFailed(state) {
      state.loading = false;
    },
  },
});

//Actions
export const cityActions = citySlice.actions;

//Selectors
export const selectCityLoading = (state: RootState) => state.city.loading;
export const selectCityList = (state: RootState) => state.city.citys;
export const selectCityMap = createSelector(selectCityList, (citys) => {
  return citys.reduce((cityMap: { [key: string]: City }, city) => {
    cityMap[city.code] = city;
    return cityMap;
  }, {});
});
export const selectCityOptions = createSelector(selectCityList, (citys) =>
  citys.map((city) => ({ value: city.code, label: city.name }))
);

//Reducer
const cityReducer = citySlice.reducer;

export default cityReducer;
