import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

interface FooterLink {
  label: string;
  href: string;
}

interface GroupEntity {
  name: string;
  href: string;
}

export default async function Footer() {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const isRTL = locale === "ar";

  // Get contact information
  const contact = {
    title: t("contact.title"),
    phone: t("contact.phone"),
    email: t("contact.email"),
    location: t("contact.location"),
  };

  // Get quick links
  const quickLinksRaw = t.raw("quickLinks.links");
  const quickLinks: FooterLink[] = Array.isArray(quickLinksRaw)
    ? quickLinksRaw
        .map((link: unknown) => {
          const l = link as { label?: unknown; href?: unknown };
          return {
            label: String(l.label || ""),
            href: String(l.href || ""),
          };
        })
        .filter((link) => link.href && link.href !== "[object Object]")
    : [];

  // Get group entities
  const groupEntitiesRaw = t.raw("ourGroup.entities");
  const groupEntities: GroupEntity[] = Array.isArray(groupEntitiesRaw)
    ? groupEntitiesRaw
        .map((entity: unknown) => {
          const e = entity as { name?: unknown; href?: unknown };
          return {
            name: String(e.name || ""),
            href: String(e.href || ""),
          };
        })
        .filter((entity) => entity.name)
    : [];

  // Social media links
  const socialLinks = [
    {
      name: t("socialMedia.linkedin"),
      icon: Linkedin,
      href: "https://linkedin.com",
      ariaLabel: t("socialMedia.linkedin"),
    },
    {
      name: t("socialMedia.twitter"),
      icon: Twitter,
      href: "https://twitter.com",
      ariaLabel: t("socialMedia.twitter"),
    },
    {
      name: t("socialMedia.instagram"),
      icon: Instagram,
      href: "https://instagram.com",
      ariaLabel: t("socialMedia.instagram"),
    },
    {
      name: t("socialMedia.facebook"),
      icon: Facebook,
      href: "https://facebook.com",
      ariaLabel: t("socialMedia.facebook"),
    },
  ];

  return (
    <footer className="bg-secondary text-white py-12 md:py-16 lg:py-20" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-12 ">
          {/* Column 1: Logo and Mission Statement */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="flex flex-col items-center md:items-start gap-4 hover:opacity-90 transition-opacity group"
              aria-label="Home"
            >
              <div className="relative">
                <Image
                  src="/logo.webp"
                  alt="Logo"
                  width={120}
                  height={120}
                  className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              {t("description") && (
                <p className="text-white/80 text-sm md:text-base leading-relaxed text-center md:text-start max-w-full">
                  {t("description")}
                </p>
              )}
            </Link>
          </div>

          {/* Column 2: Our Group */}
          <div className="flex flex-col gap-6">
            <h3 className="text-primary text-xl md:text-2xl font-bold">{t("ourGroup.title")}</h3>
            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              {groupEntities.map((entity, index) => (
                <a
                  key={index}
                  href={entity.href}
                  className="bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg px-4 py-3 text-white/90 hover:text-primary transition-all duration-200 text-sm md:text-base font-medium"
                  aria-label={entity.name}
                >
                  {entity.name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-primary text-xl md:text-2xl font-bold">{t("quickLinks.title")}</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-primary transition-colors text-base md:text-lg font-medium block py-1"
                    aria-label={link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="flex flex-col gap-6">
            <h3 className="text-primary text-xl md:text-2xl font-bold">{contact.title}</h3>
            <div className="flex flex-col gap-4">
              {/* Phone */}
              <Link
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-white/90 hover:text-primary transition-colors group"
                aria-label={`Call us: ${contact.phone}`}
              >
                <Phone className="size-5 text-primary group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-base md:text-lg">{contact.phone}</span>
              </Link>

              {/* Email */}
              <Link
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-white/90 hover:text-primary transition-colors group"
                aria-label={`Email us: ${contact.email}`}
              >
                <Mail className="size-5 text-primary group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-base md:text-lg break-all">{contact.email}</span>
              </Link>

              {/* Location */}
              <div className="flex items-start gap-3 text-white/90">
                <MapPin className="size-5 text-primary shrink-0 mt-1" />
                <span className="text-base md:text-lg">{contact.location}</span>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-4 mt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-primary transition-colors hover:scale-110 transform duration-200"
                      aria-label={social.ariaLabel}
                    >
                      <Icon className="size-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={cn(
            "pt-8 border-t border-white/10 text-sm md:text-base text-white/60",
            isRTL ? "text-right" : "text-left md:text-center"
          )}
        >
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
