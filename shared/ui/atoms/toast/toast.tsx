import { X } from "lucide-react";
import * as React from "react";
import { Button } from "@/shared/ui/atoms/button/button";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  title?: string;
  message: string;
  type?: ToastType;
  onClose?: () => void;
  duration?: number;
}

export function Toast({ 
  title, 
  message, 
  type = "info", 
  onClose, 
  duration = 5000 
}: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300); // Wait for fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400";
      case "error":
        return "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400";
      case "info":
      default:
        return "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400";
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`
        relative w-80 max-w-sm p-4 border rounded-lg shadow-lg transition-all duration-300 ease-in-out
        ${getTypeStyles()}
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {title && (
            <h4 className="font-medium mb-1">{title}</h4>
          )}
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose(), 300);
            }}
            className="h-6 w-6 p-0 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
} 