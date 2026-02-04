"use client";

import { useState } from "react";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Lottie from "lottie-react";
import registerAnimation from "@/assets/form-registration.json";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError("Registration failed");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* LEFT — REGISTER FORM */}
        <div className="flex items-center justify-center bg-gray-100 px-6">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Create an Account ✨
            </h2>
            <p className="text-gray-500 text-sm">
              Join us and start building today
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
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

                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error && (
                <p className="text-white text-sm text-center bg-red-500 p-2 rounded-md">{error}</p>
              )}

              {success && (
                <p className="text-green-600 text-sm text-center">{success}</p>
              )}

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Registering..." : "Create Account"}
              </button>
            </form>
            <p className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>

        {/* RIGHT — LOTTIE ANIMATION */}
        <div className="hidden md:flex md:flex-row items-center justify-center bg-gradient-to-b from-blue-500 to-blue-800 px-12 text-white space-x-12">
          {/* Left: Lottie Animation */}
          <div className="w-1/2 max-w-lg">
            <Lottie
              animationData={registerAnimation}
              loop
              className="w-full h-full"
            />
          </div>

          {/* Right: Text Content */}
          <div className="w-1/2 flex flex-col justify-center items-center text-center space-y-4">
            <h2 className="text-3xl font-extrabold leading-tight">
              Create Your Account in Seconds
            </h2>

            <p className="text-white/80 mt-2 max-w-md">
              Register to save your shortened links, track clicks, and manage everything
              from a single dashboard.
            </p>

            {/* Value points */}
            <div className="mt-4 space-y-2 text-sm text-white/90">
              <p>✨ Save and manage your links</p>
              <p>📊 Track clicks and performance</p>
              <p>🔐 Secure and private access</p>
            </div>

            <div className="w-16 h-[2px] bg-white/30 rounded-full my-4" />

            <p className="text-xs text-white/70 max-w-xs">
              No credit card required. Free to start.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
