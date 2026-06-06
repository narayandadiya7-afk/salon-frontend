import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export enum DrawerOpen { left = 'left', right = 'right' }

interface DrawerState {
  name: string; show: boolean; width: string; dimmer: boolean;
  position: DrawerOpen; Component: React.FunctionComponent<any> | null;
}

const initialState: DrawerState = {
  width: '50%', show: false, dimmer: true, name: 'Drawer',
  Component: null, position: DrawerOpen.right,
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    showDrawer: (state, action) => {
      state.show = true;
      state.name = action.payload.name;
      state.width = action.payload.width;
      state.dimmer = action.payload.dimmer;
      state.position = action.payload.position;
      state.Component = action.payload.Component;
    },
    closeDrawer: (state) => {
      state.name = ''; state.dimmer = true; state.show = false;
    },
  },
});

export const { showDrawer, closeDrawer } = drawerSlice.actions;
export const selectDrawer = (state: RootState) => state.drawer.show;
export const selectDrawerName = (state: RootState) => state.drawer.name;
export const selectDrawerPosition = (state: RootState) => state.drawer.position;
// Alias for backward compatibility
export const selectDrawerPostion = (state: RootState) => state.drawer.position;
export const selectDrawerDimmer = (state: RootState) => state.drawer.dimmer;
export const selectDrawerWidth = (state: RootState) => state.drawer.width;
export const selectDrawerComponent = (state: RootState) => state.drawer.Component;
const drawerReducer = drawerSlice.reducer;
export default drawerReducer;
