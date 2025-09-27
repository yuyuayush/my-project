"use client";
import React, { useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { SortableTask } from "./SortableTask";

export interface Task {
  id: string;
  title: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface TeamBoardProps {
  teamName: string;
}

const initialColumns: Column[] = [
  { id: "todo", title: "To Do", tasks: [] },
  { id: "inprogress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
];

export const TeamBoard: React.FC<TeamBoardProps> = ({ teamName }) => {
  const [columns, setColumns] = useState<Column>(initialColumns.map(col => ({ ...col, tasks: [
    { id: uuidv4(), title: `Sample task 1 for ${teamName}` },
    { id: uuidv4(), title: `Sample task 2 for ${teamName}` },
  ]})));

  const [taskInput, setTaskInput] = useState("");

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const [sourceColIndex, sourceTaskIndex] = active.id.toString().split("-").map(Number);
    const [destColIndex, destTaskIndex] = over.id.toString().split("-").map(Number);

    if (sourceColIndex === destColIndex) {
      const updatedTasks = Array.from(columns[sourceColIndex].tasks);
      arrayMove(updatedTasks, sourceTaskIndex, destTaskIndex);
      const newColumns = [...columns];
      newColumns[sourceColIndex].tasks = updatedTasks;
      setColumns(newColumns);
    } else {
      const sourceTasks = [...columns[sourceColIndex].tasks];
      const destTasks = [...columns[destColIndex].tasks];
      const [moved] = sourceTasks.splice(sourceTaskIndex, 1);
      destTasks.splice(destTaskIndex, 0, moved);
      const newColumns = [...columns];
      newColumns[sourceColIndex].tasks = sourceTasks;
      newColumns[destColIndex].tasks = destTasks;
      setColumns(newColumns);
    }
  };

  const handleAddTask = () => {
    if (!taskInput) return;
    const newTask: Task = { id: uuidv4(), title: taskInput };
    const newColumns = [...columns];
    newColumns[0].tasks.push(newTask); // Add to To Do
    setColumns(newColumns);
    setTaskInput("");
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-bold">{teamName} - Tasks</h2>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded"
          placeholder="New task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto">
          {columns.map((col, colIndex) => (
            <SortableContext
              key={col.id}
              items={col.tasks.map((_, taskIndex) => `${colIndex}-${taskIndex}`)}
              strategy={verticalListSortingStrategy}
            >
              <div className="bg-white rounded-lg shadow p-4 min-w-[220px] flex flex-col">
                <h3 className="font-semibold text-md mb-2">{col.title}</h3>
                <div className="flex flex-col gap-2">
                  {col.tasks.map((task, taskIndex) => (
                    <SortableTask key={`${colIndex}-${taskIndex}`} id={`${colIndex}-${taskIndex}`} task={task} />
                  ))}
                </div>
              </div>
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
};
