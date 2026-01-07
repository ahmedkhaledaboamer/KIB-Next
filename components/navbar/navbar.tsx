"use client";

import Button from "@/components/button";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import LocaleSwitcher from "../locale-switcher";
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

  // Initialize scroll state with lazy initialization
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > 10;
    }
    return false;
  });

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

  // Optimized scroll handler with requestAnimationFrame
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 10);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "bg-secondary/95 backdrop-blur-sm py-3 px-4 md:py-4 md:px-8",
        "absolute left-1/2 -translate-x-1/2 z-50",
        "flex justify-between items-center",
        "shadow-lg shadow-black/20",
        "transition-all duration-300 ease-in-out",

        isScrolled
          ? "w-full top-0 rounded-none fixed"
          : "w-full md:w-[90vw] md:rounded-full md:top-4"
      )}
      role="navigation"
      aria-label="Main navigation"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Logo */}
      <Link
        href="/"
        className="relative z-10 hover:scale-105 active:scale-95 drop-shadow-2xl drop-shadow-white/20 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary rounded-3xl"
        aria-label="Home"
      >
        <Image
          src="/logo.webp"
          alt="Logo"
          sizes="(max-width: 768px) 80px, 100px"
          width={100}
          height={100}
          className="rounded-3xl shadow-lg w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
          loading="eager"
          priority
        />
      </Link>

      {/* Desktop Navigation Links */}
      <ul className={cn("hidden md:flex items-center gap-6 lg:gap-8")} role="list">
        {routes.map((route) => (
          <li key={route.href} role="none">
            <Link
              href={route.href}
              className={cn(
                "relative text-white text-base lg:text-lg font-semibold",
                "transition-colors duration-200",
                "hover:text-primary focus:outline-none  rounded-md px-2 py-1",
                isActive(route.href) ? "text-primary" : "hover:opacity-90"
              )}
              aria-current={isActive(route.href) ? "page" : undefined}
            >
              {route.label}
              {isActive(route.href) && (
                <span
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full",
                    "animate-in fade-in slide-in-from-left-1 duration-300"
                  )}
                  aria-hidden="true"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA Section */}
      <div
        className={cn("flex items-center gap-3 md:gap-4", isRTL ? "flex-row-reverse" : "flex-row")}
      >
        <div className="hidden md:flex">
          <LocaleSwitcher />
        </div>
        <Button
          className="hidden lg:flex whitespace-nowrap"
          variant="primary"
          aria-label={t("cta")}
        >
          {t("cta")}
        </Button>
        <MobileNavbar />
      </div>
    </nav>
  );
}
