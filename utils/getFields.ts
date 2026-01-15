import { getLocale } from "next-intl/server";

let isLoading = true;
let errorMessage: string | null = null;

async function getFields() {
  try {
    const locale = await getLocale();
    const res = await fetch(`https://shazmlc.cloud/webhook/field?lang=${locale}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch fields: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error: unknown) {
    isLoading = false;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error fetching fields:", error);
    return [];
  } finally {
    isLoading = false;
  }
}

export { isLoading, getFields, errorMessage };


