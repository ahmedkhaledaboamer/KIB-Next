import { getLocale } from "next-intl/server";

let isLoading = true;
let errorMessage = null;

async function getSectors() {
  try {
    const locale = await getLocale();
    const res = await fetch(`https://shazmlc.cloud/webhook/sectors?lang=${locale}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch sectors: ${res.status}`);
    }

    const data = await res.json();
    // API returns array with object containing sectors array
    // Extract sectors from response[0].sectors or data.sectors
    if (Array.isArray(data) && data.length > 0 && data[0].sectors) {
      return data[0].sectors;
    }
    if (data.sectors) {
      return data.sectors;
    }
    return [];
  } catch (error: unknown) {
    isLoading = false;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error fetching sectors:", error);
    return [];
  } finally {
    isLoading = false;
  }
}

export { isLoading, getSectors, errorMessage };



