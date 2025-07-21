import * as React from "react";
import { Dialog, DialogPortal } from "../ui/atoms/dialog/dialog";


export type DialogProps = {
  onClose: () => void;
}

type DialogContent = React.ComponentType<DialogProps>;

interface DialogContextType {
  showDialog: (Content: DialogContent) => void;
  hideDialog: () => void;
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
  children: React.ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [DialogContent, setDialogContent] = React.useState<React.ReactNode | undefined>(undefined);

  const showDialog = (Content: React.ComponentType<DialogProps>) => {
    setDialogContent(<Content onClose={hideDialog} />);
  }

  const hideDialog = () => {
    setDialogContent(undefined);
  }

   return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      
      {/* Render dialog content at root level */}
      {DialogContent && 
      <Dialog open={true}>
        {DialogContent}
        <DialogPortal />
      </Dialog>
      }
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