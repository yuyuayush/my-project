"use client";
import React, { useEffect, useState } from "react";
import { BarChart, LineChart, StackedBarChart } from "./DashboardCharts";
import type { TeamForm } from "../team/TeamModal";
import { PieChart } from "./PieChart";

export const dummyChartData: TeamForm[] = [
  { teamName: "Alpha Team", leadName: "John Doe", members: ["Alice", "Bob", "Charlie", "David", "Eve"] },
  { teamName: "Beta Team", leadName: "Jane Smith", members: ["Frank", "Grace", "Heidi", "Ivan", "Judy", "Karl", "Leo", "Mallory"] },
  { teamName: "Gamma Team", leadName: "Michael Brown", members: ["Nina", "Oscar", "Peggy"] },
  { teamName: "Delta Team", leadName: "Sara Lee", members: ["Quentin", "Rita", "Sam", "Trudy", "Uma", "Victor", "Wendy"] },
  { teamName: "Epsilon Team", leadName: "Tom Clark", members: ["Xander", "Yvonne", "Zack", "Amy"] },
];

// For stacked bar chart (tasks vs completed)


// For line chart (tasks completed per week)


// Dummy data
const dummyTeams: TeamForm[] = [
  { teamName: "Alpha Team", leadName: "John Doe", members: 5 },
  { teamName: "Beta Team", leadName: "Jane Smith", members: 3 },
  { teamName: "Gamma Team", leadName: "Michael Brown", members: 4 },
];

export default function Dashboard() {
  const [teams, setTeams] = useState<TeamForm[]>([]);

  useEffect(() => {
    const savedTeams = localStorage.getItem("teams");
    if (savedTeams) setTeams(JSON.parse(savedTeams));
    else setTeams(dummyTeams);
  }, []);

  // Dummy data generator for charts


  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-2xl font-bold">Team Lead Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChart />
        <StackedBarChart />
        <PieChart />
        {/* <BarChart /> */}
      </div>
    </div>
  );
}
