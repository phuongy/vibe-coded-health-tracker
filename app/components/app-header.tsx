import { Link, useLocation } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { AddEntryModal } from "@/features/dashboard/add-entry-modal";
import { ThemeToggle } from "@/shared/ui/molecules/theme-toggle/theme-toggle";

export function AppHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getNavLinkClasses = (path: string) => {
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
    const activeClasses = "text-foreground bg-accent";
    const inactiveClasses = "text-muted-foreground hover:text-foreground";
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const getTitleClasses = () => {
    const baseClasses = "text-xl font-semibold transition-colors";
    const activeClasses = "text-foreground";
    const inactiveClasses = "text-foreground hover:text-foreground/80";
    
    return `${baseClasses} ${isActive("/dashboard") ? activeClasses : inactiveClasses}`;
  };
  
  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/dashboard" 
              className={getTitleClasses()}
            >
              {t("dashboard.title")}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/weight"
              className={getNavLinkClasses("/weight")}
            >
              {t("statTypes.weight")}
            </Link>
            <Link
              to="/heart-rate"
              className={getNavLinkClasses("/heart-rate")}
            >
              {t("statTypes.heartRate")}
            </Link>
            <Link
              to="/sleep"
              className={getNavLinkClasses("/sleep")}
            >
              {t("statTypes.sleep")}
            </Link>
            <Link
              to="/steps"
              className={getNavLinkClasses("/steps")}
            >
              {t("statTypes.steps")}
            </Link>
            <ThemeToggle />
            <AddEntryModal />
          </div>
        </div>
      </div>
    </nav>
  );
} 