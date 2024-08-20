export interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'loading';
    duration?: number;
    onClose: () => void;
  }