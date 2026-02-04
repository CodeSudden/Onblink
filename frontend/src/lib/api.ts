import { logout } from "@/lib/auth";

let refreshPromise: Promise<boolean | null> | null = null;

async function refreshAccessToken(): Promise<boolean | null> {
  if (!refreshPromise) {
    refreshPromise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Refresh failed");
        return true; // cookies updated by backend
      })
      .catch(() => {
        logout();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      credentials: "include", // 🔑 THIS is the magic
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    }
  );

  if (res.status === 401) {
    const refreshed = await refreshAccessToken();

    if (!refreshed) {
      throw new Error("Session expired");
    }

    // retry original request
    res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      }
    );
  }

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Request failed");
  }

  return res.json();
}

