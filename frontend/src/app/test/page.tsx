"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Test() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    apiFetch("/health")
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("error"));
  }, []);

  return <div>Status: {status}</div>;
}
