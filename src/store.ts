import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice';
import cartSlice from './redux/cartSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  //whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedCartReducer = persistReducer(persistConfig,cartSlice );

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;