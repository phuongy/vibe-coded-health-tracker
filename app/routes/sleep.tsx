import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppFooter } from "@/app/components/app-footer";
import { AppHeader } from "@/app/components/app-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/atoms/card/card";

export default function SleepPage() {
  const { t } = useTranslation();

  // Mock data for demonstration
  const mockData = [
    { date: "2024-01-01", value: 7.5 },
    { date: "2024-01-02", value: 8.0 },
    { date: "2024-01-03", value: 6.5 },
    { date: "2024-01-04", value: 7.8 },
    { date: "2024-01-05", value: 8.2 },
    { date: "2024-01-06", value: 9.0 },
    { date: "2024-01-07", value: 7.0 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t("statTypes.sleep")}</h1>
            <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Chart Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("statTypes.sleep")} {t("healthStats.history")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">{t("common.loading")}</p>
              <p className="text-sm text-muted-foreground">Line chart will be implemented here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("statTypes.sleep")} {t("healthStats.entries")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">{t("common.date")}</th>
                  <th className="text-left py-3 px-4 font-medium">{t("addEntry.value")}</th>
                  <th className="text-left py-3 px-4 font-medium">{t("common.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((entry, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">{entry.date}</td>
                    <td className="py-3 px-4">{entry.value} {t("units.hours")}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        {t("common.edit")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </main>
      
      <AppFooter />
    </div>
  );
} 