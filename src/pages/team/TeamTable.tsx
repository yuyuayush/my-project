"use client";

import React, { useState } from "react";
import { type TeamForm } from "./TeamModal";
import { IconList } from "@tabler/icons-react";

interface TeamWithProgress extends TeamForm {
  progress: "Complete" | "In Progress" | "Pending";
}

// Generate random color for letter avatars
const randomColor = () => {
  const colors = [
    "bg-red-400", "bg-green-400", "bg-blue-400", "bg-yellow-400",
    "bg-purple-400", "bg-pink-400", "bg-indigo-400", "bg-orange-400",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Dummy Data Generator
const generateDummyTeams = (count: number): TeamWithProgress[] => {
  const teamNames = [
    "Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Theta", "Omega",
    "Sigma", "Lambda", "Kappa", "Phoenix", "Titan", "Vortex", "Nova", "Orion",
    "Quantum", "Helix", "Apex", "Lunar",
  ];

  const leadNames = [
    "John Doe", "Jane Smith", "Michael Brown", "Sarah Connor", "David Lee",
    "Emma Watson", "Chris Evans", "Olivia Wilde", "Robert Downey", "Natalie Portman",
  ];

  const memberNames = [
    "Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Helen",
    "Ian", "Jack", "Kelly", "Liam", "Mia", "Noah", "Olivia", "Paul", "Quinn", "Ryan",
  ];

  const progressStatuses: TeamWithProgress["progress"][] = [
    "Complete",
    "In Progress",
    "Pending",
  ];

  return Array.from({ length: count }).map((_, i) => {
    const members = Array.from({ length: Math.floor(Math.random() * 5) + 2 }).map(
      () => memberNames[Math.floor(Math.random() * memberNames.length)]
    );

    const progress =
      progressStatuses[Math.floor(Math.random() * progressStatuses.length)];

    return {
      teamName: `${teamNames[i % teamNames.length]} Team`,
      leadName: leadNames[i % leadNames.length],
      members,
      progress,
    };
  });
};

// Table Component
interface TeamTableProps {
  teams: TeamWithProgress[];
  onEdit: (index: number, team: TeamWithProgress) => void;
  onDelete: (index: number) => void;
}

const ITEMS_PER_PAGE = 5;

export const TeamTable: React.FC<TeamTableProps> = ({ teams, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState<TeamWithProgress | null>(null);

  const totalPages = Math.ceil(teams.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTeams = teams.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      {/* Dropdown to select team */}
      <div className="mb-4 flex items-center gap-4">
        <select
          className="border border-gray-400 rounded px-3 py-2 focus:outline-none"
          value={selectedTeam?.teamName || ""}
          onChange={(e) => {
            const team = teams.find((t) => t.teamName === e.target.value) || null;
            setSelectedTeam(team);
          }}
        >
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team.teamName} value={team.teamName}>
              {team.teamName}
            </option>
          ))}
        </select>

        {/* Show leader name when a team is selected */}
        {selectedTeam && (
          <div className="text-gray-800 font-medium">
            Team Leader: {selectedTeam.leadName}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-xs font-semibold">
              <th className="px-5 py-3">Team</th>
              <th className="px-5 py-3">Lead</th>
              <th className="px-5 py-3">Members</th>
              <th className="px-5 py-3">Progress</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTeams.map((team, idx) => {
              const teamLetter = team.teamName.charAt(0).toUpperCase();
              return (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  {/* Team */}
                  <td className="px-5 py-4 flex items-center gap-3">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${randomColor()}`}
                    >
                      {teamLetter}
                    </div>
                    <span className="text-gray-900 font-medium">{team.teamName}</span>
                  </td>

                  {/* Lead */}
                  <td className="px-5 py-4 text-gray-900 font-medium">
                    {team.leadName}
                  </td>

                  {/* Members */}
                  <td className="px-5 py-4 flex flex-col gap-1">
                    <span className="text-gray-900 text-sm">{team.members.join(", ")}</span>

                  </td>

                  {/* Progress */}
                  <td className="px-5 py-4">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${team.progress === "Complete"
                        ? "text-green-900 bg-green-200"
                        : team.progress === "In Progress"
                          ? "text-yellow-900 bg-yellow-200"
                          : "text-red-900 bg-red-200"
                        }`}
                    >
                      {team.progress}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 relative">
                    <ActionDropdown
                      onEdit={() => onEdit(startIndex + idx, team)}
                      onDelete={() => onDelete(startIndex + idx)}
                    />
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-2">
        <span className="text-sm text-gray-900">
          Showing {startIndex + 1} to {Math.min(endIndex, teams.length)} of {teams.length} Entries
        </span>
        <div className="inline-flex">
          <button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-l text-gray-800 text-sm font-semibold"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-r text-gray-800 text-sm font-semibold"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Export dummy teams
export const dummyTeams = generateDummyTeams(20);

const ActionDropdown: React.FC<{
  onEdit: () => void;
  onDelete: () => void;
}> = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex justify-center w-full px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
      >
        <IconList />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
          >
            Edit
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
