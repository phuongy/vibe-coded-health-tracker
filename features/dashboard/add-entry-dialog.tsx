import { zodResolver } from "@hookform/resolvers/zod"
import { TrendingUp, Heart, Clock, BarChart3 } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { addHealthEntry, API_ERRORS } from "@/shared/lib/api"
import { Button } from "@/shared/ui/atoms/button/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/atoms/dialog/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/atoms/form/form"
import { Input } from "@/shared/ui/atoms/input/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/atoms/select/select"

const statTypes = [
  {
    value: "weight",
    icon: TrendingUp,
    unit: "kg",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  {
    value: "heart-rate",
    icon: Heart,
    unit: "bpm",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900",
  },
  {
    value: "sleep",
    icon: Clock,
    unit: "hours",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900",
  },
  {
    value: "steps",
    icon: BarChart3,
    unit: "steps",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900",
  },
]

const formSchema = z.object({
  type: z.string().min(1, "Please select a stat type"),
  value: z.string().min(1, "Value is required").refine((val) => {
    const num = parseFloat(val)
    return !isNaN(num) && num > 0
  }, "Please enter a valid positive number"),
})

type FormData = z.infer<typeof formSchema>

interface AddEntryDialogProps {
  defaultStatType?: string;
  onClose: () => void;
}

export function AddEntryDialog({ defaultStatType, onClose }: AddEntryDialogProps) {
  const { t } = useTranslation()
  const [selectedType, setSelectedType] = React.useState<string>(defaultStatType ?? "")

  const formSchema = z.object({
    type: z.string().min(1, t("addEntry.validation.statTypeRequired")),
    value: z.string().min(1, t("addEntry.validation.valueRequired")).refine((val) => {
      const num = parseFloat(val)
      return !isNaN(num) && num > 0
    }, t("addEntry.validation.valuePositive")),
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: defaultStatType ?? "",
      value: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await addHealthEntry({
        type: data.type,
        value: parseFloat(data.value),
      })
      onClose()
      form.reset()
      setSelectedType("")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t("errors.failedToAddHealthEntry");
      // Check if it's a known API error and translate it
      if (errorMessage === API_ERRORS.ADD_ENTRY_FAILED) {
        console.error(t("errors.failedToAddHealthEntry"), error);
      } else {
        console.error(errorMessage, error);
      }
      // In a real app, you would show a toast notification here
    }
  }

  const selectedStatType = statTypes.find((type) => type.value === selectedType)

  // Convert kebab-case to camelCase for translation keys
  const getTranslationKey = (value: string) => {
    return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  };

  React.useEffect(() => {
    if (defaultStatType) {
      setSelectedType(defaultStatType);
      form.setValue("type", defaultStatType);
    }
  }, [defaultStatType, form]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {selectedStatType && (
            <div className={`w-8 h-8 ${selectedStatType.bgColor} rounded-lg flex items-center justify-center`}>
              <selectedStatType.icon className={`w-5 h-5 ${selectedStatType.color}`} />
            </div>
          )}
          {t("addEntry.title")}
        </DialogTitle>
        <DialogDescription>
          {t("addEntry.subtitle")}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("addEntry.statType")}</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setSelectedType(value)
                  }}
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
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 ${type.bgColor} rounded-lg flex items-center justify-center`}>
                            <type.icon className={`w-4 h-4 ${type.color}`} />
                          </div>
                          {t(`statTypes.${getTranslationKey(type.value)}`)}
                        </div>
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
                      type="number"
                      step="0.1"
                      placeholder={t("addEntry.enterValue")}
                      {...field}
                    />
                    {selectedStatType && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        {t(`units.${selectedStatType.unit}`)}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onClose()
                form.reset()
                setSelectedType("")
              }}
            >
              {t("common.cancel")}
            </Button>
            <Button type="submit">{t("addEntry.addEntry")}</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
} 