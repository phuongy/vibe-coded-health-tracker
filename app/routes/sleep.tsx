import { ColumnDef } from "@tanstack/react-table";
import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { EditEntryModal } from "@/features/dashboard";
import { useDialog } from "@/shared/provider/dialog-provider";
import { Button } from "@/shared/ui/atoms/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/atoms/card/card";
import { Chart } from "@/shared/ui/atoms/chart/chart";
import { DataTable } from "@/shared/ui/atoms/table/table";
import { AppFooter } from "@/shared/ui/molecules/app-footer/app-footer";
import { AppHeader } from "@/shared/ui/molecules/app-header/app-header";

export default function SleepPage() {
  const { t } = useTranslation();
  const { showDialog } = useDialog();

  // Define table columns
  const columns: ColumnDef<{ date: string; value: number }>[] = [
    {
      accessorKey: "date",
      header: t("common.date"),
    },
    {
      accessorKey: "value",
      header: t("addEntry.value"),
      cell: ({ row }) => `${row.getValue("value")} ${t("units.hours")}`,
    },
    {
      id: "actions",
      header: t("common.actions"),
      cell: ({ row }) => (
        <Button 
          variant="secondary"
          size="sm"
          onClick={() => handleEdit(row.original)}
        >
          {t("common.edit")}
        </Button>
      ),
    },
  ];

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

  const handleEdit = (entry: { date: string; value: number }) => {
    const EditEntryDialogContent = ({ hideDialog }: { hideDialog: () => void }) => (
      <EditEntryModal
        isOpen={true}
        onClose={hideDialog}
        onSave={(formData) => {
          console.log("Saving edited entry:", formData);
          hideDialog();
        }}
        initialData={{
          statType: "sleep",
          value: entry.value,
          date: entry.date,
          unit: "hours",
        }}
      />
    );
    
    showDialog(EditEntryDialogContent);
  };

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
          <Chart 
            data={mockData}
            valueLabel={t("units.hours")}
            color="#8b5cf6"
            height={300}
          />
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("statTypes.sleep")} {t("healthStats.entries")}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={mockData}
            showPagination={false}
          />
        </CardContent>
      </Card>
      </main>
      
      <AppFooter />
    </div>
  );
} 