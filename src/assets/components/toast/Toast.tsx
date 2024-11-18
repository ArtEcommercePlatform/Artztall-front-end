import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

interface ToastState {
  message: string;
  type: ToastType;
  id: number;
}

// Toast Component
const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down`}>
      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getColors()} shadow-lg`}>
        {getIcon()}
        <p className="text-gray-700">{message}</p>
        <button onClick={onClose} className="ml-2">
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    </div>
  );
};

// Toast Container Component
export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);



  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};

// Hook to use toast
export const useToast = () => {
  const [, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { message, type, id }]);
  };

  return {
    success: (message: string) => showToast(message, 'success'),
    error: (message: string) => showToast(message, 'error'),
    warning: (message: string) => showToast(message, 'warning'),
  };
};

export default Toast;