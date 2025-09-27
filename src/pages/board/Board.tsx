"use client";
import React, { useState, useEffect } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import ColumnComponent from "./ColumnComponent";

// ----------------- Types -----------------
export interface Task {
  id: string;
  title: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Team {
  teamName: string;
  leadName: string;
  members: string[];
}

// ----------------- Dummy Teams -----------------
const dummyTeams: Team[] = [
  {
    teamName: "Omega Team",
    leadName: "Sarah Connor",
    members: ["Alice", "Bob", "Charlie", "David", "Eva"],
  },
  {
    teamName: "Alpha Team",
    leadName: "John Doe",
    members: ["Tom", "Jerry", "Spike"],
  },
  {
    teamName: "Beta Team",
    leadName: "Jane Smith",
    members: ["Anna", "Elsa", "Olaf", "Kristoff"],
  },
];

// ----------------- Generate Columns -----------------
const generateColumns = (team: Team): Column[] => [
  {
    id: "backlog",
    title: "Backlog",
    tasks: [
      { id: uuidv4(), title: `Plan project for ${team.teamName}` },
      { id: uuidv4(), title: "Define requirements" },
      { id: uuidv4(), title: "Create wireframes" },
    ],
  },
  {
    id: "todo",
    title: "To Do",
    tasks: team.members.map((member, i) => ({
      id: uuidv4(),
      title: `Task ${i + 1} assigned to ${member}`,
    })),
  },
  {
    id: "inprogress",
    title: "In Progress",
    tasks: [
      { id: uuidv4(), title: "Implement login feature" },
      { id: uuidv4(), title: "Setup database schema" },
      { id: uuidv4(), title: "Build API endpoints" },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      { id: uuidv4(), title: "Code review for login feature" },
      { id: uuidv4(), title: "UI review for dashboard" },
    ],
  },
  {
    id: "qa",
    title: "QA",
    tasks: [
      { id: uuidv4(), title: "Test dashboard responsiveness" },
      { id: uuidv4(), title: "Test API integration" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: uuidv4(), title: "Setup project repo" },
      { id: uuidv4(), title: "Install Tailwind CSS" },
      { id: uuidv4(), title: "Configure ESLint & Prettier" },
    ],
  },
];

// ----------------- Board Component -----------------
export default function BoardSelector() {
  const [selectedTeam, setSelectedTeam] = useState<Team>(dummyTeams[0]);
  const [columns, setColumns] = useState<Column[]>(generateColumns(selectedTeam));
  const [taskInput, setTaskInput] = useState("");

  const sensors = useSensors(useSensor(PointerSensor));

  // Update board when team changes
  useEffect(() => {
    setColumns(generateColumns(selectedTeam));
  }, [selectedTeam]);

  const handleDragEnd = (event: DragEndEvent) => {
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
    newColumns[0].tasks.push(newTask); // Add to backlog
    setColumns(newColumns);
    setTaskInput("");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col">
      {/* --- Team Selector --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold">{selectedTeam.teamName} - Board</h2>
        <select
                    className="border rounded px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedTeam.teamName}
          onChange={(e) => {
            const team = dummyTeams.find(t => t.teamName === e.target.value);
            if (team) setSelectedTeam(team);
          }}
        >
          {dummyTeams.map((team) => (
            <option key={team.teamName} value={team.teamName}>
              {team.teamName} ({team.leadName})
            </option>
          ))}
        </select>
      </div>

      {/* --- Add Task Input --- */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          className="border px-3 py-2 rounded flex-1 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="New task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition shadow"
        >
          Add Task
        </button>
      </div>

      {/* --- Board Columns --- */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((col, colIndex) => (
            <SortableContext
              key={col.id}
              items={col.tasks.map((_, taskIndex) => `${colIndex}-${taskIndex}`)}
              strategy={verticalListSortingStrategy}
            >
              <ColumnComponent column={col} colIndex={colIndex} />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

