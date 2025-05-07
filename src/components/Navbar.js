"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex space-x-6">
        <Link
          href="/dashboard"
          className={`hover:text-primary-dark ${
            pathname === "/dashboard"
              ? "text-primary-dark font-bold"
              : "text-gray-600"
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/tasks"
          className={`hover:text-primary-dark ${
            pathname.startsWith("/tasks")
              ? "text-primary-dark font-bold"
              : "text-gray-600"
          }`}
        >
          Tasks
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </nav>
  );
}
