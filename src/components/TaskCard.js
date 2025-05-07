"use client";
import Link from "next/link";

export default function TaskCard({ task }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-primary-dark">{task.title}</h3>
      <p className="mt-2 text-gray-600 text-sm line-clamp-3">
        {task.description}
      </p>
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        <span
          className={`px-2 py-1 rounded-full ${
            task.priority === "High"
              ? "bg-accent/20 text-accent"
              : task.priority === "Medium"
              ? "bg-secondary/20 text-secondary"
              : "bg-green-200 text-green-600"
          }`}
        >
          {task.priority}
        </span>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span
          className={`text-sm font-medium ${
            task.status === "Completed"
              ? "text-green-600"
              : task.status === "In Progress"
              ? "text-secondary-dark"
              : "text-gray-600"
          }`}
        >
          {task.status}
        </span>
        <Link
          href={`/tasks/${task._id}`}
          className="text-primary hover:underline text-sm"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
