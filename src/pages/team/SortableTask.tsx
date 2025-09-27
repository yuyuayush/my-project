"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "./TeamBoard";

interface SortableTaskProps {
  id: string;
  task: Task;
}

export const SortableTask: React.FC<SortableTaskProps> = ({ id, task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-indigo-50 border-l-4 border-indigo-600 rounded p-2 shadow hover:bg-indigo-100 cursor-grab"
    >
      {task.title}
    </div>
  );
};
