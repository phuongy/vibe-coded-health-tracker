import { ColumnDef } from "@tanstack/react-table";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { EditEntryModal } from "@/features/dashboard";
import { useDialog } from "@/shared/provider/dialog-provider";
import { Button } from "@/shared/ui/atoms/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/atoms/card/card";
import { Chart } from "@/shared/ui/atoms/chart/chart";
import { DataTable } from "@/shared/ui/atoms/table/table";
import { AppFooter } from "@/shared/ui/molecules/app-footer/app-footer";
import { AppHeader } from "@/shared/ui/molecules/app-header/app-header";

export default function HeartRatePage() {
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
      cell: ({ row }) => `${row.getValue("value")} ${t("units.bpm")}`,
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
    { date: "2024-01-01", value: 72 },
    { date: "2024-01-02", value: 75 },
    { date: "2024-01-03", value: 68 },
    { date: "2024-01-04", value: 80 },
    { date: "2024-01-05", value: 73 },
    { date: "2024-01-06", value: 77 },
    { date: "2024-01-07", value: 71 },
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
          statType: "heart-rate",
          value: entry.value,
          date: entry.date,
          unit: "bpm",
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
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t("statTypes.heartRate")}</h1>
            <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Chart Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("statTypes.heartRate")} {t("healthStats.history")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart 
            data={mockData}
            valueLabel={t("units.bpm")}
            color="#ef4444"
            height={300}
          />
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("statTypes.heartRate")} {t("healthStats.entries")}</CardTitle>
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