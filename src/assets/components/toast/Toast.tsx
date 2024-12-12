import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useTransition,
} from "react";
import { AlertCircle, CheckCircle, XCircle, X } from "lucide-react";


// Types
export type ToastType = "success" | "error" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: number) => void;
  toasts: Toast[];
}

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

interface ToastVariant {
  icon: JSX.Element;
  style: string;
  progressBar: string;
}

type ToastVariants = {
  [key in ToastType]: ToastVariant;
};

// Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast variants configuration
const toastVariants: ToastVariants = {
  success: {
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    style: "border-green-500 bg-green-50",
    progressBar: "bg-green-500",
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-red-600" />,
    style: "border-red-500 bg-red-50",
    progressBar: "bg-red-500",
  },
  warning: {
    icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    style: "border-yellow-500 bg-yellow-50",
    progressBar: "bg-yellow-500",
  },
};

// Individual Toast Component
const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  const [progress, setProgress] = useState(100);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        onClose();
      });
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  useEffect(() => {
    const step = 10;
    const updateRate = duration / step;
    const decrementValue = 100 / step;

    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - decrementValue, 0));
    }, updateRate);

    return () => clearInterval(interval);
  }, [duration]);

  const variant = toastVariants[type];

  return (
    <div
      className={`relative flex items-center w-96 p-4 rounded-lg border shadow-lg transform transition-all duration-500 ease-in-out ${variant.style}`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3">{variant.icon}</div>

      <div className="flex-grow mr-2">
        <p className="text-sm font-medium text-gray-800">{message}</p>
      </div>

      <button
        onClick={() => startTransition(() => onClose())}
        className="flex-shrink-0 p-1 transition-colors duration-200 rounded-full hover:bg-gray-200"
        aria-label="Close notification"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>

      <div
        className="absolute bottom-0 left-0 h-1 transition-all duration-300 ease-in-out rounded-b-lg"
        style={{
          width: `${progress}%`,
          backgroundColor: variant.progressBar.split(" ")[1],
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};

// Toast Container Component
const ToastContainer: React.FC = () => {
  const context = useContext(ToastContext);
  if (!context) return null;
  const { toasts, removeToast } = context;

  return (
    <div
      className="fixed z-50 space-y-4 top-4 right-4"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="transition-all duration-500 ease-in-out transform"
          style={{
            animation: "slideIn 0.5s ease-out",
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

// Toast Provider Component
export const ToastProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [, startTransition] = useTransition();

  const addToast = useCallback((message: string, type: ToastType) => {
    startTransition(() => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
    });
  }, []);

  const removeToast = useCallback((id: number) => {
    startTransition(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    });
  }, []);

  const contextValue = React.useMemo(
    () => ({ addToast, removeToast, toasts }),
    [addToast, removeToast, toasts],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Custom Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return {
    success: useCallback(
      (message: string) => context.addToast(message, "success"),
      [context],
    ),
    error: useCallback(
      (message: string) => context.addToast(message, "error"),
      [context],
    ),
    warning: useCallback(
      (message: string) => context.addToast(message, "warning"),
      [context],
    ),
  };
};

// Add keyframes for slide-in animation
const styles = `
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
`;

// Create and inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default ToastProvider;
