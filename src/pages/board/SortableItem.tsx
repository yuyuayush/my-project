import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ id, task }: { id: string; task: { id: string; title: string } }) {
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
      className="bg-gray-100 dark:bg-neutral-700 rounded p-3 mb-2 shadow cursor-grab hover:bg-gray-200 dark:hover:bg-neutral-600 transition"
    >
      {task.title}
    </div>
  );
}
