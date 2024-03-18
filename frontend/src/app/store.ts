import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/Users/usersSlice.ts';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { messagesReducer } from '../features/Messages/messagesSlice.ts';
import { webSocketReducer } from '../features/WebSocket/webSocketSlice.ts';

const usersPersistConfig = {
  key: 'chat:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  webSocket: webSocketReducer,
  messages: messagesReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
