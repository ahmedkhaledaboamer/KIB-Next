'use client';

import DepartmentsHero from "@/components/screens/department/DepartmentsHero";
import DepartmentSlider from "@/components/screens/department/DepartmentSlider";
import QuickContact from "@/components/screens/department/QuickContact";

export default function DepartmentPage() {
  return (
    <div>
      <DepartmentsHero />
      <QuickContact/>
      <DepartmentSlider/>
      
    </div>
  );
}
