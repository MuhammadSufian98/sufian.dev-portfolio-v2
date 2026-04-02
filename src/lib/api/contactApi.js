export async function submitContactForm(formData) {
  const payload = {
    name: String(formData?.name ?? "").trim(),
    email: String(formData?.email ?? "").trim(),
    subject: String(formData?.subject ?? "").trim(),
    message: String(formData?.message ?? "").trim(),
  };

  const endpoints = ["/api/contact"];
  if (typeof window !== "undefined") {
    endpoints.unshift(`${window.location.origin}/api/contact`);

    // Local fallback for cases where frontend and API are on different dev ports.
    if (window.location.hostname === "localhost") {
      const local3000 = "http://localhost:3000/api/contact";
      if (!endpoints.includes(local3000)) {
        endpoints.push(local3000);
      }
    }
  }

  try {
    let lastNetworkError = "";

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const body = await response.json().catch(() => ({}));

        if (!response.ok) {
          return {
            success: false,
            error: body.error || "Failed to submit contact form.",
          };
        }

        return { success: true };
      } catch (error) {
        lastNetworkError = error instanceof Error ? error.message : "Unknown network error";
      }
    }

    return {
      success: false,
      error: `Network failure. Please check your connection and try again. ${lastNetworkError}`,
    };
  } catch (error) {
    return {
      success: false,
      error: `Unexpected client error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
