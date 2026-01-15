import CommentsSection from "@/components/screens/home/CommentsSection";
 import Header from "@/components/screens/home/header";
import Legal from "@/components/screens/home/Legal";
import LegalCTASection from "@/components/screens/home/LegalCTASection";
import OurProcess from "@/components/screens/home/OurProcess";
import PartnersSection from "@/components/screens/home/PartnersSection";
import PracticeAreas from "@/components/screens/home/PracticeAreas";
import SectorSlider from "@/components/screens/home/SectorSlider";
import ServicesShowcase from "@/components/screens/home/ServicesShowcase";
 import WhyChooseUs from "@/components/screens/home/WhyChooseUs";
  import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("page");

  return (
    <section>
      <Header />
      <PartnersSection/>
      <ServicesShowcase/>
       <Legal/>
      <OurProcess/>
      <WhyChooseUs/>
      {/* <CustomerCare/> */}
      <CommentsSection/>
      <SectorSlider/>
      <LegalCTASection/>
     </section>
  );
}
