import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/slice';
import drawerReducer from './drawer/slice';
import modalReducer from './modal/slice';
import toastReducer from './toast/slice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    drawer: drawerReducer,
    modal: modalReducer,
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
