"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { TeamModal, type TeamForm } from "./TeamModal";
import { dummyTeams, TeamTable } from "./TeamTable";
import { useRouter } from "@tanstack/react-router";

// Dummy data


export function TeamDashboard() {
  const router = useRouter();
  const [teams, setTeams] = useState<TeamForm[]>(dummyTeams);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<{ index: number; data: TeamForm } | null>(null);

  // Load teams from localStorage
  useEffect(() => {
    const savedTeams = localStorage.getItem("teams");
    if (savedTeams) setTeams(JSON.parse(savedTeams));
    else setTeams(dummyTeams);
  }, []);

  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  const handleAddTeam = (team: TeamForm) => {
    setTeams(prev => [...prev, team]);
    toast.success("Team added successfully!");
  };

  const handleEditTeam = (team: TeamForm) => {
    if (editingTeam) {
      const newTeams = [...teams];
      newTeams[editingTeam.index] = team;
      setTeams(newTeams);
      toast.success("Team updated successfully!");
      setEditingTeam(null);
    }
  };

  const handleDeleteTeam = (index: number) => {
    const newTeams = [...teams];
    newTeams.splice(index, 1);
    setTeams(newTeams);
    toast.success("Team deleted successfully!");
  };

  const handleSelectTeam = (team: TeamForm) => {
    // Navigate to BoardPage with teamName
    router.navigate({ to: `/board/${encodeURIComponent(team.teamName)}` });
  };

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Lead Management</h1>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          onClick={() => setModalOpen(true)}
        >
          Add Team
        </button>
      </div>

      <TeamTable
        teams={dummyTeams}
        onEdit={(index, team) => {
          setEditingTeam({ index, data: team });
          setModalOpen(true);
        }}
        onDelete={handleDeleteTeam}
        onSelect={handleSelectTeam} // <-- add this prop
      />

      {modalOpen && (
        <TeamModal
          initialData={editingTeam?.data}
          onClose={() => {
            setModalOpen(false);
            setEditingTeam(null);
          }}
          onSave={team => (editingTeam ? handleEditTeam(team) : handleAddTeam(team))}
        />
      )}
    </div>
  );
}
