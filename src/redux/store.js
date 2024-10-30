import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsSlice.js";
import { filtersReducer } from "./filtersSlice.js";
import { authSlice } from "./auth/slice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root-auth",
  version: 1,
  storage,
  whitelist: ['token'], //зберігаємо тільки токін щоб користувач логінячись в свій еканом міг отримати доступ
};


export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
    auth:  persistReducer(persistConfig, authSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);