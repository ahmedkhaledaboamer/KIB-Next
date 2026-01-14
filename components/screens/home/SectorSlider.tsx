import { getSectors } from "@/utils/getSectors";
import { Suspense } from "react";
import SectorSliderContent from "./SectorSliderContent";

interface ApiSector {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ApiResponse {
  header: string;
  sectors: ApiSector[];
}

function SectorSliderSkeleton() {
  return <SectorSliderContent sectors={[]} isLoading={true} />;
}

async function SectorsContent() {
  const apiData = (await getSectors()) as ApiResponse[];

  if (!apiData || !Array.isArray(apiData) || apiData.length === 0 || !apiData[0]?.sectors) {
    return (
      <section className="w-full bg-gray-50 p-[5%]">
        <div className="mx-auto flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500">No sectors data available</p>
        </div>
      </section>
    );
  }

  const sectors = apiData[0].sectors;

  return <SectorSliderContent sectors={sectors} isLoading={false} />;
}

export default async function SectorSlider() {
  return (
    <Suspense fallback={<SectorSliderSkeleton />}>
      <SectorsContent />
    </Suspense>
  );
}
