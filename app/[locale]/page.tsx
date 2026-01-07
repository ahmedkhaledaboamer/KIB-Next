import LocaleSwitcher from "@/components/locale-switcher";
import Header from "@/components/screens/home/header";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("page");

  return (
    <section>
      <Header />
      <LocaleSwitcher />
    </section>
  );
}
