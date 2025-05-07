// app/dashboard/page.js

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // client‑only check
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("userId");

    if (!token) {
      router.push("/login");
      return;
    }
    setUserId(uid);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };

  const assigned = tasks.filter((t) => t.assignedTo?._id === userId);
  const created = tasks.filter((t) => t.createdBy === userId);
  const overdue = tasks.filter(
    (t) => new Date(t.dueDate) < new Date() && t.status !== "Completed"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light">
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Assigned to Me */}
          <div className="bg-white/70 p-4 rounded-lg shadow-md">
            <h3 className="text-xl mb-4 text-center text-gray-800">
              Assigned to Me
            </h3>
            <div className="flex flex-col space-y-4">
              {assigned.length > 0 ? (
                assigned.map((t) => <TaskCard key={t._id} task={t} />)
              ) : (
                <p className="text-gray-600 text-center">No tasks assigned.</p>
              )}
            </div>
          </div>

          {/* Created by Me */}
          <div className="bg-white/70 p-4 rounded-lg shadow-md">
            <h3 className="text-xl mb-4 text-center text-gray-800">
              Created by Me
            </h3>
            <div className="flex flex-col space-y-4">
              {created.length > 0 ? (
                created.map((t) => <TaskCard key={t._id} task={t} />)
              ) : (
                <p className="text-gray-600 text-center">
                  You haven&apos;t created any tasks.
                </p>
              )}
            </div>
          </div>

          {/* Overdue Tasks */}
          <div className="bg-white/70 p-4 rounded-lg shadow-md">
            <h3 className="text-xl mb-4 text-center text-gray-800">
              Overdue Tasks
            </h3>
            <div className="flex flex-col space-y-4">
              {overdue.length > 0 ? (
                overdue.map((t) => <TaskCard key={t._id} task={t} />)
              ) : (
                <p className="text-green-600 text-center font-medium">
                  No overdue tasks. Great job!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
