import { useTranslation } from "react-i18next";
import { QuickActionsCard } from "@/features/dashboard/navigation";
import { RecentActivityCard } from "@/features/dashboard/recent-activity";
import { AppFooter } from "@/shared/ui/molecules/app-footer/app-footer";
import { AppHeader } from "@/shared/ui/molecules/app-header/app-header";
import { HealthStatsWidget } from "@/shared/ui/molecules/health-stats/health-stats";

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("dashboard.welcome")}
          </h1>
          <p className="text-muted-foreground">
            {t("dashboard.welcomeSubtitle")}
          </p>
        </div>

        {/* Health Stats Widget */}
        <HealthStatsWidget />

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div>
            <QuickActionsCard />
          </div>

          {/* Recent Activity */}
          <div>
            <RecentActivityCard />
          </div>
        </div>
      </main>
      
      <AppFooter />
    </div>
  );
} 