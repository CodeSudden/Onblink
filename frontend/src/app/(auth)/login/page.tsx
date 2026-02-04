"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Lottie from "lottie-react";
import loginAnimation from "@/assets/Login.json";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError("Unexpected Error logging in");
      // console.log(err.mesage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE — LOGIN */}
        <div className="flex items-center justify-center px-6 bg-gray-100">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500 text-sm">
              Please sign in to your account
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error && (
                <p className="text-white text-sm text-center bg-red-500 p-2 rounded-md">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="text-sm text-center text-gray-500">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-600 font-medium hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>

        {/* RIGHT — LOTTIE ANIMATION */}
        <div className="hidden md:flex flex-col items-center justify-center px-12 text-white bg-gradient-to-b from-blue-500 to-blue-800">
          {/* Animation */}
          <div className="max-w-md w-full mb-6">
            <Lottie
              animationData={loginAnimation}
              loop
              className="w-full h-full"
            />
          </div>

          <h2 className="text-3xl font-extrabold text-center leading-tight">
            Shorten, Track, and Manage Your Links
          </h2>

          <p className="text-white/80 text-center mt-3 max-w-md">
            Create short URLs, monitor click analytics, and manage your link history —
            all in one dashboard.
          </p>

          <div className="w-16 h-[2px] bg-white/30 rounded-full my-6" />

          <a
            href="/"
            className="text-sm font-medium text-white/90 hover:text-white underline underline-offset-4 transition"
          >
            Continue without logging in →
          </a>
        </div>
      </div>
    </>
  );
}
