import createSagaMiddleware from 'redux-saga';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootSagas from './rootSagas';
import rootReducers from './rootReducers';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([sagaMiddleware]),
});

sagaMiddleware.run(rootSagas);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
