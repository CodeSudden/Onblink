import { apiFetch } from "@/lib/api";

type HistoryParams = {
  page?: number;
  limit?: number;
  search?: string;
  fromDate?: string;
  toDate?: string;
};

export function getHistory(params: HistoryParams = {}) {
  const query = new URLSearchParams();

  if (params.page) query.append("page", String(params.page));
  if (params.limit) query.append("limit", String(params.limit));
  if (params.search) query.append("search", params.search);
  if (params.fromDate) query.append("from_date", params.fromDate);
  if (params.toDate) query.append("to_date", params.toDate);

  const qs = query.toString();
  return apiFetch(`/urls/history${qs ? `?${qs}` : ""}`);
}

export function deleteUrl(shortCode: string) {
  return apiFetch(`/urls/${shortCode}`, {
    method: "DELETE",
  });
}

export function getHistoryStats() {
  return apiFetch("/urls/history/stats");
}
