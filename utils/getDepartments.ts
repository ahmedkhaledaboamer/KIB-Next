import { getLocale } from "next-intl/server";

let isLoading = true;
let errorMessage = null;

async function getDepartments() {
  try {
    const locale = await getLocale();
    const res = await fetch(`https://shazmlc.cloud/webhook/Department-task?lang=${locale}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch departments: ${res.status}`);
    }

    return await res.json();
  } catch (error: unknown) {
    isLoading = false;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error fetching departments:", error);
    return [];
  } finally {
    isLoading = false;
  }
}

export { isLoading, getDepartments, errorMessage };

