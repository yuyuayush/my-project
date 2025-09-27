"use client";
import React from "react";
import { SortableItem } from "./SortableItem";
import type { Column } from "./Board";

interface ColumnProps {
  column: Column;
  colIndex: number;
}

export default function ColumnComponent({ column, colIndex }: ColumnProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 min-w-[250px] flex flex-col">
      <h3 className="font-bold text-lg mb-4 border-b pb-2">{column.title}</h3>
      <div className="flex flex-col gap-2">
        {column.tasks.map((task, taskIndex) => (
          <SortableItem
            key={`${colIndex}-${taskIndex}`}
            id={`${colIndex}-${taskIndex}`}
            task={task}
          />
        ))}
      </div>
    </div>
  );
}
