"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { api } from "@/lib/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      fetchTasks();
      fetchUsers();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      await api.post("/tasks", data);
      fetchTasks();
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl mb-4">All Tasks</h2>

        {/* Toggle Create Task Form */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showForm ? "Cancel" : "Create Task"}
          </button>

          {showForm && (
            <div className="mt-4">
              <TaskForm onSubmit={handleCreate} users={users} />
            </div>
          )}
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="relative">
              <TaskCard task={task} />
              <button
                onClick={() => handleDelete(task._id)}
                className="absolute top-2 right-2 text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
