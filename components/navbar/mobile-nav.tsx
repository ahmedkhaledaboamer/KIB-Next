"use client";
import { cn } from "@/utils/cn";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../button";
import LocaleSwitcher from "../locale-switcher";

interface Route {
  href: string;
  label: string;
}

const MobileNavbar = () => {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const routesRaw = t.raw("routes");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Memoize routes processing
  const routes = useMemo<Route[]>(() => {
    if (!Array.isArray(routesRaw)) return [];
    return routesRaw
      .map((route: unknown) => {
        const r = route as { label?: unknown; href?: unknown };
        return {
          label: String(r.label || ""),
          href: String(r.href || ""),
        };
      })
      .filter((route) => route.href && route.href !== "[object Object]");
  }, [routesRaw]);

  // Memoize active route check
  const isActive = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/" || pathname === `/${locale}`;
      }
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname, locale]
  );

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden relative z-50" dir={isRTL ? "rtl" : "ltr"}>
      <Button
        variant="ghost"
        onClick={toggleMenu}
        className="relative z-50"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <X
            className={cn(
              "absolute text-white size-6 transition-all duration-300",
              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"
            )}
            aria-hidden="true"
          />
          <Menu
            className={cn(
              "absolute text-white size-6 transition-all duration-300",
              isOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
            )}
            aria-hidden="true"
          />
        </div>
      </Button>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={handleLinkClick}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed top-0 h-screen w-full max-w-sm bg-secondary z-40",
          "transition-transform duration-300 ease-in-out",
          "shadow-2xl",
          isRTL ? "right-0" : "left-0",
          isOpen
            ? isRTL
              ? "translate-x-0"
              : "translate-x-0"
            : isRTL
              ? "translate-x-full"
              : "-translate-x-full"
        )}
        dir={isRTL ? "rtl" : "ltr"}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-white text-xl font-bold">Menu</h2>
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="text-white hover:text-primary"
              aria-label="Close menu"
            >
              <X className="size-6" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6" role="navigation">
            <ul className="flex flex-col gap-2 px-6">
              {routes.map((route, index) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-white text-lg font-semibold",
                      "transition-all duration-200",
                      "hover:bg-white/10 hover:text-primary",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary",
                      isActive(route.href)
                        ? "bg-primary/20 text-primary border-l-4 border-primary"
                        : ""
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                    aria-current={isActive(route.href) ? "page" : undefined}
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer with Locale Switcher */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center justify-center">
              <LocaleSwitcher />
            </div>
            <Button
              variant="primary"
              className="w-full mt-4"
              onClick={handleLinkClick}
              aria-label={t("cta")}
            >
              {t("cta")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
