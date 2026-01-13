"use client";

import Button from "@/components/button";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import LocaleSwitcher from "../locale-switcher";
import Logo from "../logo";
import MobileNavbar from "./mobile-nav";

interface Route {
  label: string;
  href: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const locale = useLocale();
  const isRTL = useMemo(() => locale === "ar", [locale]);
  const routesRaw = t.raw("routes");

  // Memoize routes processing
  const routes = useMemo<Route[]>(() => {
    if (!Array.isArray(routesRaw)) return [];
    return routesRaw
      .map((route: unknown) => {
        const r = route as { label?: unknown; href?: unknown };
        const href = String(r.href || "");
        const label = String(r.label || "");
        return { href, label };
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

  return (
    <nav
      className={cn(
        "bg-secondary/95 backdrop-blur-sm",
        "absolute left-1/2 -translate-x-1/2 z-50",
        "flex justify-between items-center",
        "shadow-lg shadow-black/20",
        "transition-all duration-300 ease-in-out",
        "w-full top-0 rounded-none fixed",
        'px-4 py-4'
      )}
      role="navigation"
      aria-label="Main navigation"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Logo */}
      <Logo className=" transition-transform duration-300 hover:scale-105 w-fit" size={100} />

      {/* Desktop Navigation Links */}
      <ul
        className={cn("hidden md:flex items-center")}
        style={{
          gap: "clamp(1rem, 2vw, 2rem)",
        }}
        role="list"
      >
        {routes.map((route) => (
          <li key={route.href} role="none">
            <Link
              href={route.href}
              className={cn(
                "relative text-white font-semibold",
                "transition-colors duration-200",
                "hover:text-primary focus:outline-none rounded-md",
                isActive(route.href) ? "text-primary" : "hover:opacity-90"
              )}
              style={{
                fontSize: "clamp(1.5rem, 1.25vw, 3rem)",
                paddingTop: "clamp(0.25rem, 0.5vw, 0.5rem)",
                paddingBottom: "clamp(0.25rem, 0.5vw, 0.5rem)",
                paddingLeft: "clamp(0.5rem, 0.75vw, 1rem)",
                paddingRight: "clamp(0.5rem, 0.75vw, 1rem)",
              }}
              aria-current={isActive(route.href) ? "page" : undefined}
            >
              {route.label}
              {isActive(route.href) && (
                <span
                  className={cn(
                    "absolute bottom-0 left-0 right-0 bg-primary rounded-full",
                    "animate-in fade-in slide-in-from-left-1 duration-300"
                  )}
                  style={{
                    height: "clamp(2px, 0.25vw, 4px)",
                  }}
                  aria-hidden="true"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA Section */}
      <div
        className={cn("flex items-center", isRTL ? "flex-row-reverse" : "flex-row")}
        style={{
          gap: "clamp(0.75rem, 1vw, 1.5rem)",
        }}
      >
        <div className="hidden md:flex">
          <LocaleSwitcher />
        </div>
        <Button
          className="hidden lg:flex whitespace-nowrap"
          variant="primary"
          size="sm"
          aria-label={t("cta")}
        >
          {t("cta")}
        </Button>
        <MobileNavbar />
      </div>
    </nav>
  );
}
