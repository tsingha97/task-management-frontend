"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import TaskForm from "@/components/TaskForm";
import { api } from "@/lib/api";

export default function TaskDetailPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
    else {
      fetchTask();
      fetchUsers();
    }
  }, []);

  const fetchTask = async () => {
    const res = await api.get("/tasks");
    const found = res.data.find((t) => t._id === id);
    setTask(found);
  };

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const handleUpdate = async (data) => {
    await api.put(`/tasks/${id}`, data);
    router.push("/tasks");
  };

  if (!task) return <div className="p-6">Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl mb-4">Edit Task</h2>
        <TaskForm initialData={task} onSubmit={handleUpdate} users={users} />
      </div>
    </div>
  );
}
