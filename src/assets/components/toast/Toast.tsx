import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { AlertCircle, CheckCircle, XCircle, X } from "lucide-react";

// Types and Context
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

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Individual Toast Component
const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variants: ToastVariants = {
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

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const step = 10;
    const updateRate = duration / step;
    const decrementValue = 100 / step;

    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - decrementValue, 0));
    }, updateRate);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div
      className={`relative flex items-center w-96 p-4 rounded-lg border shadow-lg transform transition-all duration-500 ease-in-out ${variants[type].style}`}
    >
      <div className="flex-shrink-0 mr-3">{variants[type].icon}</div>

      <div className="flex-grow mr-2">
        <p className="text-sm font-medium text-gray-800">{message}</p>
      </div>

      <button
        onClick={onClose}
        className="flex-shrink-0 rounded-full p-1 transition-colors duration-200 hover:bg-gray-200"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>

      <div
        className="absolute bottom-0 left-0 h-1 rounded-b-lg transition-all duration-300 ease-in-out"
        style={{
          width: `${progress}%`,
          backgroundColor: variants[type].progressBar.split(" ")[1],
        }}
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
    <div className="fixed top-4 right-4 z-50 space-y-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="transform transition-all duration-500 ease-in-out"
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

interface ToastProviderProps {
  children: React.ReactNode;
}

// Toast Provider Component
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
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
    success: (message: string) => context.addToast(message, "success"),
    error: (message: string) => context.addToast(message, "error"),
    warning: (message: string) => context.addToast(message, "warning"),
  };
};

export default ToastProvider;
