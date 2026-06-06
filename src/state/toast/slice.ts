import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export enum ToastOpen { leftTop = 'leftTop', rightTop = 'rightTop', leftBottom = 'leftBottom', rightBottom = 'rightBottom' }
export enum ToastType { info = 'info', error = 'error', success = 'success' }

interface ToastState {
  show: boolean; position: ToastOpen; type: ToastType; content: string; title: string;
}

const initialState: ToastState = {
  title: '', content: '', show: false,
  type: ToastType.info, position: ToastOpen.leftBottom,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.show = true;
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.position = action.payload.position;
    },
    closeToast: (state) => {
      state.title = ''; state.content = ''; state.show = false;
      state.type = ToastType.info; state.position = ToastOpen.leftBottom;
    },
  },
});

export const { showToast, closeToast } = toastSlice.actions;
export const selectToast = (state: RootState) => state.toast.show;
export const selectToastType = (state: RootState) => state.toast.type;
export const selectToastTitle = (state: RootState) => state.toast.title;
export const selectToastContent = (state: RootState) => state.toast.content;
export const selectToastPosition = (state: RootState) => state.toast.position;
const toastReducer = toastSlice.reducer;
export default toastReducer;
