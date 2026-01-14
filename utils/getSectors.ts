import { getLocale } from "next-intl/server";

let isLoading = true;
let errorMessage = null;

async function getSectors() {
  try {
    const locale = await getLocale();
    const res = await fetch(`https://shazmlc.cloud/webhook/Sector-task?lang=${locale}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch sectors: ${res.status}`);
    }

    return await res.json();
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

