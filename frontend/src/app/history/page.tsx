"use client";

import { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getHistory, deleteUrl, getHistoryStats } from "@/lib/urls";
import {
  FaClipboard,
  FaClipboardCheck,
  FaExternalLinkAlt,
  FaTrash,
  FaChartBar,
  FaEdit,
} from "react-icons/fa";

const ITEMS_PER_PAGE = 5;

type UrlItem = {
  short_code: string;
  original_url: string;
  clicks: number;
  created_at: string;
};

export default function HistoryPage() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: ITEMS_PER_PAGE,
    total: 0,
    total_pages: 1,
  });

  const [stats, setStats] = useState({
    total_links: 0,
    total_clicks: 0,
    average_clicks: 0,
  });

  useEffect(() => {
    setLoading(true);

    getHistory({
      page,
      limit: ITEMS_PER_PAGE,
      search: search || undefined,
    })
      .then((res) => {
        setUrls(res.data);
        setPagination(res.pagination);
        console.log(res);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, search]);

  useEffect(() => {
    getHistoryStats()
      .then(setStats)
      .catch(console.error);
  }, []);


  const copyToClipboard = async (text: string) => {
    const shortUrl = `http://localhost:3000/${text}`;

    await navigator.clipboard.writeText(shortUrl);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleDelete = async (shortCode: string) => {
    if (!confirm("Delete this URL?")) return;

    await deleteUrl(shortCode);

    getHistory({
      page,
      limit: ITEMS_PER_PAGE,
      search: search || undefined,
    }).then((res) => {
      setUrls(res.data);
      setPagination(res.pagination);

      if (res.data.length === 0 && page > 1) {
        setPage(page - 1);
      }
    });
  };

  const handleStats = (shortCode: string) => {
    alert(`Viewing stats for ${shortCode}`);
  };

  const handleUpdate = (shortCode: string) => {
    alert(`Updating ${shortCode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar />
      <main className="h-screen max-w-7xl mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage and track all your shortened URLs</p>
        </div>

        {/* Stats Cards */}
        {/* {!loading && ( */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="text-gray-600 text-sm font-medium mb-1">Total Links</div>
              <div className="text-3xl font-bold text-gray-800">
                  {stats.total_links}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="text-gray-600 text-sm font-medium mb-1">Total Clicks</div>
              <div className="text-3xl font-bold text-gray-800">
                {stats.total_clicks.toLocaleString()}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="text-gray-600 text-sm font-medium mb-1">Average Clicks</div>
              <div className="text-3xl font-bold text-gray-800">
                {stats.average_clicks}
              </div>
            </div>
          </div>
        {/* )} */}

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search short code or URL..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full px-4 text-black py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Errors */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        )}

        {!loading && urls.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No URLs found. Start shortening URLs to see them here!</p>
          </div>
        )}

        {!loading && urls.length > 0 && (
          <>
            {/* Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                      <th className="px-6 py-4 text-left text-sm font-semibold">Shortened URL</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Original Link</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Clicks</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {urls.map((url, index) => {
                      return (
                        <tr
                          key={url.short_code}
                          className={`border-b border-gray-200 hover:bg-blue-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-blue-600 font-medium">{url.short_code}</span>
                              <button
                                onClick={() => copyToClipboard(url.short_code)}
                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                title="Copy to clipboard"
                              >
                                {copied === url.short_code ? (
                                  <span className="text-green-600 text-xs font-medium flex items-center gap-1">
                                    <FaClipboardCheck size={16} /> Copied!
                                  </span>
                                ) : (
                                  <FaClipboard size={16} />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 max-w-md">
                              <span className="text-gray-700 truncate">{url.original_url}</span>
                              <a
                                href={url.original_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
                                title="Open link"
                              >
                                <FaExternalLinkAlt size={14} />
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                              {(url.clicks || 0).toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => handleStats(url.short_code)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                title="View stats"
                              >
                                <FaChartBar size={18} />
                              </button>
                              <button
                                onClick={() => handleUpdate(url.short_code)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Edit link"
                              >
                                <FaEdit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(url.short_code)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete link"
                              >
                                <FaTrash size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {pagination.total_pages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: pagination.total_pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      page === i + 1
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}