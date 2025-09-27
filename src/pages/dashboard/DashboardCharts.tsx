"use client";
import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart as ReLineChart,
  Line,
  CartesianGrid,
} from "recharts";
import type { TeamForm } from "../team/TeamModal";

// Colors for Pie Chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FFF"];

interface ChartProps {
  teams: TeamForm[];
}

// ---------------- Bar Chart ----------------
export const BarChart: React.FC<ChartProps> = ({ teams }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="font-bold mb-4">Team Members Bar Chart</h3>
    <ResponsiveContainer width="100%" height={300}>
      <ReBarChart data={teams}>
        <XAxis dataKey="teamName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="members" fill="#6366F1" />
      </ReBarChart>
    </ResponsiveContainer>
  </div>
);

// ---------------- Pie Chart ----------------
export const PieChart: React.FC<ChartProps> = ({ teams }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="font-bold mb-4">Team Distribution Pie Chart</h3>
    <ResponsiveContainer width="100%" height={300}>
      <RePieChart>
        <Pie
          data={teams}
          dataKey="members"
          nameKey="teamName"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {teams?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </ResponsiveContainer>
  </div>
);

// ---------------- Line Chart ----------------
export const LineChart: React.FC = () => {
  const data = [
    { week: "Week 1", completed: 12 },
    { week: "Week 2", completed: 18 },
    { week: "Week 3", completed: 9 },
    { week: "Week 4", completed: 15 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-bold mb-4">Tasks Completed Per Week</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="completed" stroke="#FF8042" strokeWidth={2} />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

// ---------------- Stacked Bar Chart ----------------
export const StackedBarChart: React.FC = () => {
  const data = [
    { team: "Alpha Team", tasks: 12, completed: 8 },
    { team: "Beta Team", tasks: 10, completed: 5 },
    { team: "Gamma Team", tasks: 15, completed: 12 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-bold mb-4">Team Workload</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ReBarChart data={data}>
          <XAxis dataKey="team" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tasks" stackId="a" fill="#0088FE" />
          <Bar dataKey="completed" stackId="a" fill="#00C49F" />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};
