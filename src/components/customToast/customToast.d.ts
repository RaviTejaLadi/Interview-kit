export function customToast(): {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  message: (message: string) => void;
  custom: (message: string, type?: string, icon?: unknown) => void;
};
