import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Button } from "@/shared/ui/atoms/button/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/atoms/form/form";
import { Input } from "@/shared/ui/atoms/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select/select";

// Validation schema for edit entry form
const editEntrySchema = z.object({
  date: z.string().min(1, "Date is required"),
  statType: z.string().min(1, "Please select a stat type"),
  value: z.string().min(1, "Value is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Please enter a valid positive number"),
});

type EditEntryFormData = z.infer<typeof editEntrySchema>;

interface EditEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditEntryFormData) => void;
  initialData: {
    statType: string;
    value: number;
    date: string;
    unit: string;
  };
}

export function EditEntryModal({ isOpen, onClose, onSave, initialData }: EditEntryModalProps) {
  const { t } = useTranslation();

  const form = useForm<EditEntryFormData>({
    resolver: zodResolver(editEntrySchema),
    defaultValues: {
      date: initialData.date,
      statType: initialData.statType,
      value: initialData.value.toString(),
    },
  });

  const onSubmit = (data: EditEntryFormData) => {
    onSave(data);
    onClose();
  };

  const statTypes = [
    { value: "weight", label: t("statTypes.weight") },
    { value: "heart-rate", label: t("statTypes.heartRate") },
    { value: "sleep", label: t("statTypes.sleep") },
    { value: "steps", label: t("statTypes.steps") },
  ];

  const getUnitForStatType = (statType: string) => {
    switch (statType) {
      case "weight":
        return t("units.kg");
      case "heart-rate":
        return t("units.bpm");
      case "sleep":
        return t("units.hours");
      case "steps":
        return t("units.steps");
      default:
        return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {t("addEntry.title").replace("Add", "Edit")}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common.date")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="statType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addEntry.statType")}</FormLabel>
                  <Select
                    disabled
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("addEntry.selectStatType")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addEntry.value")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="number"
                        step="0.1"
                        placeholder={t("addEntry.enterValue")}
                        className="pr-16"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-sm text-muted-foreground">
                          {getUnitForStatType(form.watch("statType"))}
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                {t("common.cancel")}
              </Button>
              <Button type="submit">
                {t("common.save")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 