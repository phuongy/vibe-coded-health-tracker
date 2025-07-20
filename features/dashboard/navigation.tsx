import { Plus, Heart, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/shared/provider/dialog-provider";
import { Button } from "@/shared/ui/atoms/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/atoms/card/card";
import { AddEntryDialog } from "./add-entry-dialog";

export function QuickActionsCard() {
  const { t } = useTranslation();
  const { showDialog } = useDialog();
  
  const handleAddEntry = (defaultStatType: string) => {
    const AddEntryDialogContent = ({ hideDialog }: { hideDialog: () => void }) => (
      <AddEntryDialog
        defaultStatType={defaultStatType}
        onClose={hideDialog}
      />
    );
    
    showDialog(AddEntryDialogContent);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.quickActions")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          variant="ghost" 
          className="w-full justify-between p-3 h-auto"
          onClick={() => handleAddEntry("weight")}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
              <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-foreground">{t("quickActions.logWeight")}</span>
          </div>
        </Button>

        <Button 
          variant="ghost" 
          className="w-full justify-between p-3 h-auto"
          onClick={() => handleAddEntry("heart-rate")}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
              <Heart className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-foreground">{t("quickActions.recordHeartRate")}</span>
          </div>
        </Button>

        <Button 
          variant="ghost" 
          className="w-full justify-between p-3 h-auto"
          onClick={() => handleAddEntry("sleep")}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-foreground">{t("quickActions.logSleep")}</span>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
} 