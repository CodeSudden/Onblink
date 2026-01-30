import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>

      <p className="mt-4 text-lg text-gray-600">
        This short link doesn’t exist or has expired.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
      >
        Go back to OnBlink
      </Link>
    </div>
  );
}
