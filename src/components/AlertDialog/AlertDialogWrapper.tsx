import type { ReactNode, MouseEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useAlertDialogStore, type AlertDialogVariant } from '@/stores/useAlertDialogStore';
import { AlertVariantIcons, type AlertVariantKey } from './Icons';

const variantAlias: Record<string, AlertVariantKey> = {
  delete: 'destructive',
  failed: 'error',
  confirm: 'info',
};

const iconTileClass: Record<AlertVariantKey, string> = {
  destructive: 'bg-destructive/10 text-destructive',
  error: 'bg-destructive/10 text-destructive',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  info: 'bg-info-soft text-info',
};

function resolveAlertDialogVariant(
  variant: AlertDialogVariant,
  isDestructive: boolean,
): AlertVariantKey {
  const key = variantAlias[variant] ?? variant;
  if (key in AlertVariantIcons) {
    return key as AlertVariantKey;
  }
  return isDestructive ? 'destructive' : 'info';
}

type AlertDialogWrapperProps = {
  children?: ReactNode;
};

export function AlertDialogWrapper({ children }: AlertDialogWrapperProps) {
  const {
    isAlertDialogOpen,
    toggleAlertDialogOpen,
    setAlertDialogState,
    confirmActionFn,
    isDestructive,
    variant,
    icon,
    title,
    description,
    details,
    cancelBtnText,
    confirmBtnText,
    isLoading,
    loadingBtnText,
  } = useAlertDialogStore(
    useShallow((state) => ({
      isAlertDialogOpen: state.isAlertDialogOpen,
      toggleAlertDialogOpen: state.toggleAlertDialogOpen,
      setAlertDialogState: state.setAlertDialogState,
      confirmActionFn: state.confirmActionFn,
      isDestructive: state.isDestructive,
      variant: state.variant,
      icon: state.icon,
      title: state.title,
      description: state.description,
      details: state.details,
      cancelBtnText: state.cancelBtnText,
      confirmBtnText: state.confirmBtnText,
      isLoading: state.isLoading,
      loadingBtnText: state.loadingBtnText,
    })),
  );

  const resolvedVariant = resolveAlertDialogVariant(variant, isDestructive);
  const showCancel = Boolean(cancelBtnText);
  const isConfirmDestructive = resolvedVariant === 'destructive' || resolvedVariant === 'error';
  const DefaultIcon = AlertVariantIcons[resolvedVariant];

  const handleOpenChange = (open: boolean, eventDetails?: { cancel?: () => void }) => {
    if (isLoading) {
      eventDetails?.cancel?.();
      return;
    }
    toggleAlertDialogOpen(open);
  };

  const handleConfirm = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading) return;

    try {
      const result = confirmActionFn?.();
      if (result && typeof (result as Promise<unknown>).then === 'function') {
        setAlertDialogState({ isLoading: true });
        await result;
      }
      toggleAlertDialogOpen(false);
    } catch {
      setAlertDialogState({ isLoading: false });
    }
  };

  return (
    <>
      {children}
      <Dialog open={isAlertDialogOpen} onOpenChange={handleOpenChange}>
        {isAlertDialogOpen ? (
          <DialogContent
            hideCloseButton
            className="w-[calc(100%-2rem)] max-w-md gap-0 rounded-[var(--radius-panel)] border border-border bg-card p-5 text-card-foreground shadow-[var(--shadow-pop)] sm:max-w-md"
          >
            <div
              className={cn(
                'mb-4 flex size-10 items-center justify-center rounded-[var(--radius-card)]',
                iconTileClass[resolvedVariant],
              )}
            >
              {icon ?? <DefaultIcon className="size-5" />}
            </div>

            <DialogHeader className="space-y-1 text-left">
              <DialogTitle className="text-left font-heading text-lg leading-6 font-semibold text-foreground">
                {title}
              </DialogTitle>
              <DialogDescription className="text-left text-sm leading-5 text-muted-foreground">
                {description}
              </DialogDescription>
            </DialogHeader>

            {details ? (
              <p className="mt-2 text-sm leading-5 text-muted-foreground">{details}</p>
            ) : null}

            <DialogFooter className="mt-5 gap-2 sm:justify-end">
              {showCancel ? (
                <DialogClose
                  disabled={isLoading}
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                      disabled={isLoading}
                    />
                  }
                >
                  {cancelBtnText}
                </DialogClose>
              ) : null}

              <Button
                size="sm"
                variant={isConfirmDestructive ? 'destructive' : 'default'}
                className="w-full sm:w-auto"
                onClick={handleConfirm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {loadingBtnText || 'Please wait...'}
                  </>
                ) : (
                  confirmBtnText
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}

export default AlertDialogWrapper;
