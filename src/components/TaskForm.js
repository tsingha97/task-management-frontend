"use client";
import { useState } from "react";

export default function TaskForm({ initialData = {}, onSubmit, users }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    dueDate: initialData.dueDate?.slice(0, 10) || "",
    priority: initialData.priority || "Medium",
    status: initialData.status || "Pending",
    assignedTo: initialData.assignedTo || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div>
        <label className="block text-gray-700">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          rows="4"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Assign To</label>
          <select
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold"
      >
        {initialData._id ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}
