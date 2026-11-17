import type { ReactNode } from 'react';
import { create } from 'zustand';

import type { AlertVariantKey } from '@/components/AlertDialog/Icons';

export type AlertDialogVariant =
  | AlertVariantKey
  | 'delete'
  | 'failed'
  | 'confirm'
  | (string & {});

export type AlertDialogConfirmFn = (() => void | Promise<unknown>) | null;

export type AlertDialogState = {
  isAlertDialogOpen: boolean;
  confirmActionFn: AlertDialogConfirmFn;
  isDestructive: boolean;
  variant: AlertDialogVariant;
  icon: ReactNode | null;
  title: string;
  description: string;
  details: string;
  cancelBtnText: string;
  confirmBtnText: string;
  isLoading: boolean;
  loadingBtnText: string;
};

type AlertDialogActions = {
  toggleAlertDialogOpen: (open: boolean) => void;
  setAlertDialogState: (partial: Partial<AlertDialogState>) => void;
  resetAlertDialog: () => void;
};

export type AlertDialogStore = AlertDialogState & AlertDialogActions;

export type ShowAlertDialogOptions = {
  variant?: AlertDialogVariant;
  isDestructive?: boolean;
  icon?: ReactNode | null;
  title?: string;
  description?: string;
  details?: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  loadingBtnText?: string;
  confirmActionFn?: AlertDialogConfirmFn;
};

const initialState: AlertDialogState = {
  isAlertDialogOpen: false,
  confirmActionFn: null,
  isDestructive: false,
  variant: 'info',
  icon: null,
  title: '',
  description: '',
  details: '',
  cancelBtnText: 'Cancel',
  confirmBtnText: 'Confirm',
  isLoading: false,
  loadingBtnText: 'Please wait...',
};

export const useAlertDialogStore = create<AlertDialogStore>((set, get) => ({
  ...initialState,
  toggleAlertDialogOpen: (open) => {
    if (get().isLoading && open === false) return;
    set({
      isAlertDialogOpen: open,
      ...(open ? {} : { isLoading: false }),
    });
  },
  setAlertDialogState: (partial) => set(partial),
  resetAlertDialog: () => set({ ...initialState }),
}));

export function showAlertDialog({
  variant = 'info',
  isDestructive,
  icon = null,
  title = '',
  description = '',
  details = '',
  cancelBtnText = 'Cancel',
  confirmBtnText = 'Confirm',
  loadingBtnText = 'Please wait...',
  confirmActionFn = null,
}: ShowAlertDialogOptions = {}) {
  const destructive =
    typeof isDestructive === 'boolean'
      ? isDestructive
      : variant === 'destructive' || variant === 'delete';

  useAlertDialogStore.setState({
    isAlertDialogOpen: true,
    isLoading: false,
    variant,
    isDestructive: destructive,
    icon,
    title,
    description,
    details,
    cancelBtnText,
    confirmBtnText,
    loadingBtnText,
    confirmActionFn,
  });
}
