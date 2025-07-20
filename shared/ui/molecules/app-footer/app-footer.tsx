import { LanguageSwitcher } from "@/shared/ui/molecules/language-switcher/language-switcher";

export function AppFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center items-center">
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
} 