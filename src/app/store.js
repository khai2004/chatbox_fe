import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userReducer from '../features/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import { apiSlice } from '../features/apiSlice';
import chatReducer from '../features/chatSlice';

//saveUserOnlyFilter
const saveUserOnlyFilter = createFilter('user', ['user']);

//persist config
const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
  transforms: [saveUserOnlyFilter],
};

const rootReducer = combineReducers({
  chat: chatReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
