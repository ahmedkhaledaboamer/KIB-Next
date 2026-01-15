import DepartmentsHero from "@/components/screens/department/DepartmentsHero";
import DepartmentsPage from "@/components/screens/department/DepartmentsPage";
import QuickContact from "@/components/screens/department/QuickContact";
import LegalCTASection from "@/components/screens/home/LegalCTASection";

export default function DepartmentPage() {
  return (
    <div>
      <DepartmentsHero />
      <QuickContact/>
      <DepartmentsPage/>
      <LegalCTASection />
    </div>
  );
}
