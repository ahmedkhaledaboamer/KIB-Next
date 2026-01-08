import Header from "@/components/screens/home/header";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("page");

  return (
    <section>
      <Header />
    </section>
  );
}
