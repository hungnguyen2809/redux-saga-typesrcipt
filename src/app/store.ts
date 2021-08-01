import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import createRootReducers from './rootReducers';
import rootSagas from './rootSagas';

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(history);
const rootReducers = createRootReducers(history);

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([sagaMiddleware, routerMiddleware]),
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
