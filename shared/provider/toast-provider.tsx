import * as React from "react";
import { Toast, ToastProps } from "@/shared/ui/atoms/toast/toast";

interface ToastContextType {
  showToast: (toast: ToastProps) => void;
  hideToast: () => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = React.useState<ToastProps | undefined>(undefined);

  const showToast = (toast: ToastProps) => {
    setToast(toast);
  }

  const hideToast = () => {
    setToast(undefined);
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {/* Render toast content at root level */}
      {toast && (
        <Toast type={toast.type} message={toast.message} />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
} 