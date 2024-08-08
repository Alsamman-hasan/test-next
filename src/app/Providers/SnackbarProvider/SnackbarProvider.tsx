"use client";

import { closeSnackbar, SnackbarKey, SnackbarProvider } from 'notistack';
import { ReactNode, useCallback } from 'react';
import './SnackbarProvider.scss';
import { PTag } from '@/shared/ui/Paragraph/P';

export interface SnackbarProviderProps {
  children: ReactNode;
}
export const SnackbarProviderUi = (props: SnackbarProviderProps) => {
  const { children } = props;
  const action = useCallback(
    (snackbarId: SnackbarKey) => (
      <div className='close' onClick={() => closeSnackbar(snackbarId)}>
        <PTag tage='P3'>закрыть</PTag>
      </div>
    ),
    [],
  );

  return (
    <SnackbarProvider
      className='snackbar'
      maxSnack={3}
      action={snackbarId => action(snackbarId)}
    >
      {children}
    </SnackbarProvider>
  );
};
