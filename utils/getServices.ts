let isLoading = true;
let errorMessage = null;


async function getServices() {
  try {
    const res = await fetch("https://shazmlc.cloud/webhook/service");

    return await res.json();
  } catch (error: unknown) {
    isLoading = false;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error fetching services:", error);
  } finally {
    isLoading = false;
  }
}

export { isLoading, getServices, errorMessage };
