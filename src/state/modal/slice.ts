import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export enum ModalSize { sm = 'small', md = 'medium', lg = 'large', xl = 'extraLarge' }

interface ModalState {
  show: boolean; content: string | Array<any>; title: string;
  size: ModalSize; Component: React.FunctionComponent<any> | null;
  onSave: Function | null; showTitle: boolean; showButton: boolean;
  remarkOpen: boolean; preview: boolean;
}

const initialState: ModalState = {
  show: false, content: 'Modal', title: 'Title', Component: null,
  onSave: null, size: ModalSize.md, showTitle: true, showButton: false,
  remarkOpen: true, preview: true,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.show = true;
      state.size = action.payload.size;
      state.content = action.payload.content;
      state.title = action.payload.title;
      state.showTitle = action.payload.showTitle;
      state.showButton = action.payload.showButton;
      state.onSave = action.payload.onSave;
      state.Component = action.payload.Component;
      state.remarkOpen = action.payload.remarkOpen;
      state.preview = action.payload.preview;
    },
    closeModal: (state) => {
      state.content = ''; state.show = false; state.title = 'Title';
      state.Component = null; state.size = ModalSize.md;
      state.showTitle = true; state.showButton = false;
      state.onSave = null; state.remarkOpen = true;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal.show;
export const selectModalTitle = (state: RootState) => state.modal.title;
export const selectModalComponent = (state: RootState) => state.modal.Component;
export const selectModalSize = (state: RootState) => state.modal.size;
export const selectModalonSave = (state: RootState) => state.modal.onSave;
export const selectModalContent = (state: RootState) => state.modal.content;
export const selectModalshowButton = (state: RootState) => state.modal.showButton;
export const selectModalShowTitle = (state: RootState) => state.modal.showTitle;
export const selectremarkOpen = (state: RootState) => state.modal.remarkOpen;
export const selectPreview = (state: RootState) => state.modal.preview;
const modalReducer = modalSlice.reducer;
export default modalReducer;
