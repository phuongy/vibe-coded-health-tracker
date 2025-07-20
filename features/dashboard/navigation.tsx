import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/atoms/card/card";
import { Button } from "@/shared/ui/atoms/button/button";
import { Plus, Heart, Clock } from "lucide-react";
import { AddEntryModal } from "./add-entry-modal";

export function QuickActionsCard() {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.quickActions")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <AddEntryModal
          defaultStatType="weight"
          trigger={
            <Button variant="ghost" className="w-full justify-between p-3 h-auto">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                  <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-foreground">{t("quickActions.logWeight")}</span>
              </div>
            </Button>
          }
        />

        <AddEntryModal
          defaultStatType="heart-rate"
          trigger={
            <Button variant="ghost" className="w-full justify-between p-3 h-auto">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                  <Heart className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-foreground">{t("quickActions.recordHeartRate")}</span>
              </div>
            </Button>
          }
        />

        <AddEntryModal
          defaultStatType="sleep"
          trigger={
            <Button variant="ghost" className="w-full justify-between p-3 h-auto">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-foreground">{t("quickActions.logSleep")}</span>
              </div>
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
} 