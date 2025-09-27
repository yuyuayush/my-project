"use client";
import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FFF"];

interface PieData {
  teamName: string;
  members: number;
}

interface PieChartProps {
  data?: PieData[]; // optional, use default if not provided
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  // Default dummy data
  const chartData: PieData[] = data ?? [
    { teamName: "Alpha Team", members: 5 },
    { teamName: "Beta Team", members: 8 },
    { teamName: "Gamma Team", members: 3 },
    { teamName: "Delta Team", members: 7 },
    { teamName: "Epsilon Team", members: 4 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-bold mb-4">Team Distribution Pie Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RePieChart>
          <Pie
            data={chartData}
            dataKey="members"
            nameKey="teamName"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};
