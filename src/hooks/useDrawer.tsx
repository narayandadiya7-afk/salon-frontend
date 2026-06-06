/**
 * useDrawer.tsx
 * Hook to manage drawer functionality via Redux state
 */
'use client';

import { useSelector } from 'react-redux';
import {
  DrawerOpen,
  closeDrawer,
  selectDrawer,
  selectDrawerComponent,
  selectDrawerDimmer,
  selectDrawerName,
  selectDrawerPosition,
  selectDrawerWidth,
  showDrawer,
} from '../state/drawer/slice';
import { useAppDispatch } from '../state/hook';

export type DrawerProps = {
  name?: string;
  width?: string;
  dimmer?: boolean;
  position?: DrawerOpen;
  showCloseButton?: boolean;
  Component?: React.FunctionComponent<any>;
  className?: string;
};

export default function useDrawer() {
  const dispatch = useAppDispatch();

  const show = useSelector(selectDrawer);
  const dimmer = useSelector(selectDrawerDimmer);
  const name = useSelector(selectDrawerName);
  const Component = useSelector(selectDrawerComponent);
  const position = useSelector(selectDrawerPosition);
  const width = useSelector(selectDrawerWidth);

  const onShowDrawer = (props: DrawerProps) => {
    dispatch(showDrawer(props));
  };

  const onCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  return {
    width,
    dimmer,
    position,
    onShowDrawer,
    onCloseDrawer,
    showDrawer: show,
    drawerTitle: name,
    DrawerComponent: Component,
  };
}
