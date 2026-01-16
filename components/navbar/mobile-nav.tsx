"use client";
import { cn } from "@/utils/cn";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, ListMinus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../button";
import LocaleSwitcher from "../locale-switcher";
import { usePopupModal } from "../PopupModalProvider";

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
  const { openModal, isOpen: isModalOpen, closeModal } = usePopupModal();

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

  // Close modal when mobile menu opens
  useEffect(() => {
    if (isOpen && isModalOpen) {
      closeModal();
    }
  }, [isOpen, isModalOpen, closeModal]);

  // Close mobile menu when modal opens
  useEffect(() => {
    if (isModalOpen && isOpen) {
      setIsOpen(false);
    }
  }, [isModalOpen, isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      // Only reset overflow if modal is not open
      if (!isModalOpen) {
        document.body.style.overflow = "";
      }
    }
    return () => {
      // Only reset overflow if modal is not open
      if (!isModalOpen) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen, isModalOpen]);

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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on the backdrop, not on the menu
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
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
        <div
          className="relative flex items-center justify-center"
          style={{
            width: "clamp(2.5rem, 3vw, 3.5rem)",
            height: "clamp(2.5rem, 3vw, 3.5rem)",
          }}
        >
          <Menu
            className={cn(
              "absolute text-white transition-all duration-300",
              isOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
            )}
            style={{
              width: "clamp(1.5rem, 2vw, 2rem)",
              height: "clamp(1.5rem, 2vw, 2rem)",
            }}
            aria-hidden="true"
          />
        </div>
      </Button>

      {/* Backdrop - only visible when menu is open */}
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-[10000]",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed top-0 h-screen w-full bg-secondary z-[10001]",
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
        style={{
          maxWidth: "clamp(20rem, 30vw, 28rem)",
        }}
        dir={isRTL ? "rtl" : "ltr"}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div
            className="flex items-center justify-between border-b border-white/10"
            style={{
              padding: "clamp(1rem, 2vw, 2rem)",
            }}
          >
            <h2
              className="text-white font-bold"
              style={{
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              }}
            >
              Menu
            </h2>
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="text-white hover:text-primary"
              aria-label="Close menu"
            >
              <X
                style={{
                  width: "clamp(1.5rem, 2vw, 2rem)",
                  height: "clamp(1.5rem, 2vw, 2rem)",
                }}
              />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav
            className="flex-1 overflow-y-auto"
            style={{
              paddingTop: "clamp(1rem, 2vw, 2rem)",
              paddingBottom: "clamp(1rem, 2vw, 2rem)",
            }}
            role="navigation"
          >
            <ul
              className="flex flex-col"
              style={{
                gap: "clamp(0.5rem, 1vw, 1rem)",
                paddingLeft: "clamp(1rem, 2vw, 2rem)",
                paddingRight: "clamp(1rem, 2vw, 2rem)",
              }}
            >
              {routes.map((route, index) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "block rounded-lg text-white font-semibold",
                      "transition-all duration-200",
                      "hover:bg-white/10 hover:text-primary",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary",
                      isActive(route.href)
                        ? "bg-primary/20 text-primary border-l-4 border-primary"
                        : ""
                    )}
                    style={{
                      fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
                      paddingTop: "clamp(0.75rem, 1.25vw, 1.25rem)",
                      paddingBottom: "clamp(0.75rem, 1.25vw, 1.25rem)",
                      paddingLeft: "clamp(1rem, 1.5vw, 1.5rem)",
                      paddingRight: "clamp(1rem, 1.5vw, 1.5rem)",
                      borderLeftWidth: isActive(route.href) ? "clamp(2px, 0.5vw, 4px)" : "0",
                      animationDelay: `${index * 50}ms`,
                    }}
                    aria-current={isActive(route.href) ? "page" : undefined}
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 px-4 mt-4">
              <button
                onClick={() => {
                  openModal();
                  handleLinkClick();
                }}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg text-white font-semibold",
                  "transition-all duration-200",
                  "hover:bg-white/10 hover:text-primary",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
                )}
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
                  paddingTop: "clamp(0.75rem, 1.25vw, 1.25rem)",
                  paddingBottom: "clamp(0.75rem, 1.25vw, 1.25rem)",
                  paddingLeft: "clamp(1rem, 1.5vw, 1.5rem)",
                  paddingRight: "clamp(1rem, 1.5vw, 1.5rem)",
                }}
                aria-label={t("openGroupInfo")}
              >
                <ListMinus
                  style={{
                    width: "clamp(1.25rem, 1.75vw, 1.75rem)",
                    height: "clamp(1.25rem, 1.75vw, 1.75rem)",
                  }}
                />
                <span>{t("openGroupInfo")}</span>
              </button>
              <div className="flex">
                <LocaleSwitcher />
              </div>
            </div>
          </nav>

          {/* Footer with Locale Switcher */}
          <div
            className="border-t border-white/10"
            style={{
              padding: "clamp(1rem, 2vw, 2rem)",
            }}
          >
            <div className="flex items-center justify-center"></div>
            <Button
              variant="primary"
              className="w-full"
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
