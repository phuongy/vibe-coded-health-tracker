import { X } from "lucide-react";
import * as React from "react";
import { Button } from "@/shared/ui/atoms/button/button";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

export function Modal({ 
  title, 
  children, 
  onClose, 
  size = "md",
  showCloseButton = true 
}: ModalProps) {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      default:
        return "max-w-md";
    }
  };

  return (
    <div className={`w-full ${getSizeClasses()} bg-background border rounded-lg shadow-xl`}>
      {(title || showCloseButton) && (
        <div className="flex items-center justify-between p-6 border-b">
          {title && (
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          )}
          {showCloseButton && onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
} 