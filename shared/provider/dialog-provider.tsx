import * as React from "react";

type DialogContent = React.ComponentType<{ hideDialog: () => void }>;

interface DialogContextType {
  showDialog: (content: DialogContent) => void;
  hideDialog: () => void;
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
  children: React.ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [DialogContent, setDialogContent] = React.useState<DialogContent | undefined>(undefined);

  const showDialog = (Content: DialogContent) => {
    setDialogContent(Content);
  }

  const hideDialog = () => {
    setDialogContent(undefined);
  }

   return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      
      {/* Render dialog content at root level */}
      {DialogContent && (
        <DialogContent hideDialog={hideDialog} />
      )}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = React.useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
} 