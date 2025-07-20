import { Link } from "@remix-run/react";
import { TrendingUp, Heart, Clock, BarChart3 } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { fetchHealthStats, type HealthStats, API_ERRORS } from "@/shared/lib/api";
import { Card, CardContent } from "@/shared/ui/atoms/card/card";

export function HealthStatsWidget() {
  const { t } = useTranslation();
  const [healthStats, setHealthStats] = React.useState<HealthStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadHealthStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const stats = await fetchHealthStats();
        setHealthStats(stats);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : t("errors.failedToLoadHealthStats");
        // Check if it's a known API error and translate it
        if (errorMessage === API_ERRORS.HEALTH_STATS_FAILED) {
          setError(t("errors.failedToLoadHealthStats"));
        } else {
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    loadHealthStats();
  }, [t]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-600 dark:text-red-400">
              <p>{t("common.error")}: {error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!healthStats) {
    return null;
  }

  const formatValue = (value: number, unit: string) => {
    const translatedUnit = t(`units.${unit}`);
    return `${value} ${translatedUnit}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Link to="/weight" className="block">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{t("healthStats.weight")}</p>
                <p className="text-2xl font-semibold text-foreground">
                  {formatValue(healthStats.weight.value, healthStats.weight.unit)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link to="/heart-rate" className="block">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{t("healthStats.heartRate")}</p>
                <p className="text-2xl font-semibold text-foreground">
                  {formatValue(healthStats.heartRate.value, healthStats.heartRate.unit)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link to="/sleep" className="block">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{t("healthStats.sleep")}</p>
                <p className="text-2xl font-semibold text-foreground">
                  {formatValue(healthStats.sleep.value, healthStats.sleep.unit)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link to="/steps" className="block">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">{t("healthStats.steps")}</p>
              <p className="text-2xl font-semibold text-foreground">
                {formatValue(healthStats.steps.value, healthStats.steps.unit)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
    </div>
  );
} 