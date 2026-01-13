import { ServicesResponse } from "@/types/services";

export async function getServices(): Promise<ServicesResponse> {
  try {
    const res = await fetch("https://shazmlc.cloud/webhook/service", {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch services");

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
