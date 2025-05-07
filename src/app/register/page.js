"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        { name, email, password }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);
      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4">Register</h2>
        <label className="block mb-2">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </label>
        <label className="block mb-2">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </label>
        <label className="block mb-4">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Register
        </button>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
