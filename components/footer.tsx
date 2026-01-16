import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Logo from "./logo";

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
    <footer
      className="bg-secondary text-white"
      style={{
        paddingTop: "clamp(3rem, 4vw, 6rem)",
        paddingBottom: "clamp(3rem, 4vw, 6rem)",
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="px-[5%]">
        {/* Main Footer Content */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{
            gap: "clamp(2rem, 3vw, 4rem)",
            marginBottom: "clamp(2rem, 3vw, 4rem)",
          }}
        >
          {/* Column 1: Logo and Mission Statement */}
          <div className="flex items-center   flex-col" style={{ gap: "clamp(1rem, 1.5vw, 2rem)" }}>
            <Logo className=" transition-transform duration-300 hover:scale-105 w-fit" size={300} />
            {t("description") && (
              <p
                className="text-white/80 leading-relaxed text-center   max-w-full"
                style={{
                  fontSize: "clamp(0.875rem, 1vw, 4rem)",
                }}
              >
                {t("description")}
              </p>
            )}
          </div>

          {/* Column 2: Our Group */}
          <div className="flex flex-col" style={{ gap: "clamp(1rem, 1.5vw, 2rem)" }}>
            <h3
              className="text-primary font-bold"
              style={{
                fontSize: "clamp(1.25rem, 1.75vw, 4rem)",
              }}
            >
              {t("ourGroup.title")}
            </h3>
            <div
              className="flex flex-col overflow-y-auto custom-scrollbar"
              style={{
                gap: "clamp(0.5rem, 0.75vw, 1rem)",
                maxHeight: "clamp(20rem, 25vw, 30rem)",
              }}
            >
              {groupEntities.map((entity, index) => (
                <a
                  key={index}
                  href={entity.href}
                  className="bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-white/90 hover:text-primary transition-all duration-200 font-medium"
                  style={{
                    padding: "clamp(0.75rem, 1vw, 1.25rem) clamp(1rem, 1.5vw, 2rem)",
                    fontSize: "clamp(0.875rem, 1vw, 2rem)",
                  }}
                  aria-label={entity.name}
                >
                  {entity.name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col text-center"  style={{ gap: "clamp(1rem, 1.5vw, 2rem)" }}>
            <h3
              className="text-primary font-bold"
              style={{
                fontSize: "clamp(1.25rem, 1.75vw, 4rem)",
              }}
            >
              {t("quickLinks.title")}
            </h3>
            <ul className="flex flex-col" style={{ gap: "clamp(0.75rem, 1vw, 1.25rem)" }}>
              {quickLinks.map((link) => (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-primary transition-colors font-medium block"
                    style={{
                      fontSize: "clamp(1rem, 1.25vw, 2rem)",
                      paddingTop: "clamp(0.25rem, 0.5vw, 0.5rem)",
                      paddingBottom: "clamp(0.25rem, 0.5vw, 0.5rem)",
                    }}
                    aria-label={link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="flex flex-col" style={{ gap: "clamp(1rem, 1.5vw, 2rem)" }}>
            <p  style={{
                fontSize: "clamp(1.25rem, 1.75vw, 2rem)",
              }}>قناة الاتصال التنفيذية لكبار العملاء والمستثمرين نستقبل تواصلك عبر مسار مخصص للعملاء المميزين، رجال الأعمال، والشركاء الاستراتيجيين.</p>
            <h3
              className="text-primary font-bold"
              style={{
                fontSize: "clamp(1.25rem, 1.75vw, 4rem)",
              }}
            >
              {contact.title}
            </h3>
            <div className="flex flex-col" style={{ gap: "clamp(0.75rem, 1vw, 1.5rem)" }}>
              {/* Phone */}
              <Link
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center text-white/90 hover:text-primary transition-colors group"
                style={{
                  gap: "clamp(0.75rem, 1vw, 1.25rem)",
                }}
                aria-label={`Call us: ${contact.phone}`}
              >
                <Phone
                  className="text-primary group-hover:scale-110 transition-transform shrink-0"
                  style={{
                    width: "clamp(1.25rem, 1.5vw, 1.75rem)",
                    height: "clamp(1.25rem, 1.5vw, 1.75rem)",
                  }}
                />
                <span
                  style={{
                    fontSize: "clamp(1rem, 1.25vw, 2rem)",
                  }}
                >
                  {contact.phone}
                </span>
              </Link>

              {/* Email */}
              <Link
                href={`mailto:${contact.email}`}
                className="flex items-center text-white/90 hover:text-primary transition-colors group"
                style={{
                  gap: "clamp(0.75rem, 1vw, 1.25rem)",
                }}
                aria-label={`Email us: ${contact.email}`}
              >
                <Mail
                  className="text-primary group-hover:scale-110 transition-transform shrink-0"
                  style={{
                    width: "clamp(1.25rem, 1.5vw, 1.75rem)",
                    height: "clamp(1.25rem, 1.5vw, 1.75rem)",
                  }}
                />
                <span
                  className="break-all"
                  style={{
                    fontSize: "clamp(1rem, 1.25vw, 1.5rem)",
                  }}
                >
                  {contact.email}
                </span>
              </Link>

              {/* Location */}
              <div
                className="flex items-start text-white/90"
                style={{
                  gap: "clamp(0.75rem, 1vw, 1.25rem)",
                }}
              >
                <MapPin
                  className="text-primary shrink-0"
                  style={{
                    width: "clamp(1.25rem, 1.5vw, 1.75rem)",
                    height: "clamp(1.25rem, 1.5vw, 1.75rem)",
                    marginTop: "clamp(0.25rem, 0.5vw, 0.5rem)",
                  }}
                />
                <span
                  style={{
                    fontSize: "clamp(1rem, 1.25vw, 1.5rem)",
                  }}
                >
                  {contact.location}
                </span>
              </div>

              {/* Social Media Icons */}
              <div
                className="flex items-center"
                style={{
                  gap: "clamp(0.75rem, 1vw, 1.5rem)",
                  marginTop: "clamp(0.5rem, 0.75vw, 1rem)",
                }}
              >
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
                      <Icon
                        style={{
                          width: "clamp(1.25rem, 1.5vw, 2rem)",
                          height: "clamp(1.25rem, 1.5vw, 2rem)",
                        }}
                      />
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
            "border-t border-white/10 text-white/60",
            isRTL ? "text-center" : "text-center md:text-center"
          )}
          style={{
            paddingTop: "clamp(1.5rem, 2vw, 2.5rem)",
            fontSize: "clamp(0.875rem, 1vw, 3rem)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <p>{t("copyright")}</p>
            <span className="hidden md:inline text-white/40">|</span>
            <Link
              href="/privacy-policy"
              className="text-white/80 hover:text-primary transition-colors underline underline-offset-4 hover:underline-offset-2"
            >
              {t("privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
