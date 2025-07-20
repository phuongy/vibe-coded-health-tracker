import * as React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/atoms/card/card";
import { fetchRecentActivity, type RecentActivity, API_ERRORS } from "@/shared/lib/api";

export function RecentActivityCard() {
  const { t } = useTranslation();
  const [activities, setActivities] = React.useState<RecentActivity[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadRecentActivity = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRecentActivity();
        setActivities(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : t("errors.failedToLoadRecentActivity");
        // Check if it's a known API error and translate it
        if (errorMessage === API_ERRORS.RECENT_ACTIVITY_FAILED) {
          setError(t("errors.failedToLoadRecentActivity"));
        } else {
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    loadRecentActivity();
  }, []);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} ${t("healthStats.hours")} ${t("healthStats.ago")}`;
    } else {
      return t("healthStats.yesterday");
    }
  };

  const formatValue = (value: number, unit: string) => {
    const translatedUnit = t(`units.${unit}`);
    return `${value} ${translatedUnit}`;
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'weight': return 'bg-blue-500';
      case 'heart-rate': return 'bg-green-500';
      case 'sleep': return 'bg-purple-500';
      case 'steps': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getActivityDescription = (activity: RecentActivity) => {
    const value = formatValue(activity.value, activity.unit);
    switch (activity.type) {
      case 'weight':
        return `${t("healthStats.weight")} ${t("healthStats.logged")}: ${value}`;
      case 'heart-rate':
        return `${t("healthStats.heartRate")}: ${value}`;
      case 'sleep':
        return `${t("healthStats.sleep")} ${t("healthStats.logged")}: ${value}`;
      case 'steps':
        return `${t("healthStats.steps")}: ${value}`;
      default:
        return activity.description;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-3 animate-pulse" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-600 dark:text-red-400">
            <p>{t("common.error")}: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-muted-foreground">{t("dashboard.noActivity")}</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <div className={`w-2 h-2 ${getActivityColor(activity.type)} rounded-full mr-3`} />
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  {getActivityDescription(activity)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatTimeAgo(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
} 