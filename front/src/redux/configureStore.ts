import { configureStore } from '@reduxjs/toolkit';
import { sessionSlice, userSlice } from './slices';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// Create a persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'user'],
};

// Combine your reducers
const rootReducer = combineReducers({
  session: sessionSlice.reducer,
  user: userSlice.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
