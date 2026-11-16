import { toast } from 'sonner';
import { Check, X, AlertTriangle, Info, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const baseStyles =
  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium shadow-lg w-[20rem] max-w-md min-h-[60px] max-h-[160px] overflow-hidden transition-all duration-200 ease-in-out';

const toastTones = {
  success: {
    panel:
      'border border-[var(--color-success)] bg-[var(--color-success-background)] text-[var(--color-success)]',
    icon: 'bg-[var(--color-success)] text-primary-foreground',
  },
  error: {
    panel:
      'border border-[var(--color-error)] bg-[var(--color-error-background)] text-[var(--color-error)]',
    icon: 'bg-[var(--color-error)] text-primary-foreground',
  },
  warning: {
    panel:
      'border border-[var(--color-warning)] bg-[var(--color-warning-background)] text-[var(--color-warning)]',
    icon: 'bg-[var(--color-warning)] text-primary-foreground',
  },
  info: {
    panel:
      'border border-[var(--color-info)] bg-[var(--color-info-background)] text-[var(--color-info)]',
    icon: 'bg-[var(--color-info)] text-primary-foreground',
  },
  message: {
    panel: 'border border-border bg-card text-card-foreground',
    icon: 'bg-foreground text-background',
  },
};

function ToastCard({ message, tone, icon }) {
  const styles = toastTones[tone] ?? toastTones.message;

  return (
    <div className={cn(baseStyles, styles.panel, 'hover:shadow-xl')}>
      {icon ? (
        <div
          className={cn(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
            styles.icon,
          )}
        >
          {icon}
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="mt-1 leading-relaxed font-comfortaa wrap-break-word">{message}</p>
      </div>
    </div>
  );
}

export const customToast = () => {
  const success = (msg) =>
    toast.custom(() => (
      <ToastCard tone="success" message={msg} icon={<Check className="h-3 w-3" />} />
    ));

  const error = (msg) =>
    toast.custom(() => <ToastCard tone="error" message={msg} icon={<X className="h-3 w-3" />} />);

  const warning = (msg) =>
    toast.custom(() => (
      <ToastCard tone="warning" message={msg} icon={<AlertTriangle className="h-3 w-3" />} />
    ));

  const info = (msg) =>
    toast.custom(() => <ToastCard tone="info" message={msg} icon={<Info className="h-3 w-3" />} />);

  const message = (msg) =>
    toast.custom(() => (
      <ToastCard tone="message" message={msg} icon={<MessageCircle className="h-3 w-3" />} />
    ));

  const custom = (msg, type = 'message', icon = null) =>
    toast.custom(() => <ToastCard tone={type} message={msg} icon={icon} />);

  return {
    success,
    error,
    warning,
    info,
    message,
    custom,
  };
};
