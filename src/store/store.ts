import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';
import storage from 'redux-persist/lib/storage';
import {createFilter} from 'redux-persist-transform-filter';

import mainReducer from './slices/main';

const saveTheme = createFilter('main', ['theme']);

const persistConfig = {
  key: 'root',
  version: 1,
  whitelist: ['main'],
  transforms: [saveTheme],
  storage,
};

const reducers = {
  main: mainReducer,
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
