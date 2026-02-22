import { toast as sonnerToast } from 'sonner';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const toast = {
  success: (message, options = {}) => {
    return sonnerToast.success(message, {
      icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
      ...options,
    });
  },
  
  error: (message, options = {}) => {
    return sonnerToast.error(message, {
      icon: <AlertCircle className="w-4 h-4 text-red-500" />,
      ...options,
    });
  },
  
  warning: (message, options = {}) => {
    return sonnerToast.warning(message, {
      icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
      ...options,
    });
  },
  
  info: (message, options = {}) => {
    return sonnerToast.info(message, {
      icon: <Info className="w-4 h-4 text-blue-500" />,
      ...options,
    });
  },
  
  loading: (message, options = {}) => {
    return sonnerToast.loading(message, options);
  },
  
  dismiss: (id) => {
    sonnerToast.dismiss(id);
  },
};

export function Toaster() {
  return (
    <sonnerToast.Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        className: 'bg-zinc-800 border-zinc-700 text-white',
        actionClassName: 'bg-emerald-500 hover:bg-emerald-600 text-white',
        cancelClassName: 'bg-zinc-700 hover:bg-zinc-600 text-white',
      }}
    />
  );
}
