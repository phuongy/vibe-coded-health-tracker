import { useTranslation } from "react-i18next";
import { AppFooter } from "@/app/components/app-footer";
import { AppHeader } from "@/app/components/app-header";
import { HealthStatsWidget } from "@/components/widgets/health-stats";
import { QuickActionsCard } from "@/features/dashboard/navigation";
import { RecentActivityCard } from "@/features/dashboard/recent-activity";

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActionsCard />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivityCard />
          </div>
        </div>
      </main>
      
      <AppFooter />
    </div>
  );
} 