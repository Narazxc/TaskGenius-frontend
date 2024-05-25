import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { countTasksByStatus } from "../../utils/helpers";
import { useTasks } from "../tasks/useTasks";

const startDataLight = [
  {
    status: "To do", // name key
    value: 0, // data key
    // color: "#ef4444",
    // color: "#f7b7a3",
    color: "#ea5f89",
  },
  {
    status: "In progress",
    value: 0,
    // color: "#f97316",
    color: "#9b3192",
  },
  {
    status: "On Hold",
    value: 0,
    // color: "#eab308",
    color: "#57167E",
  },
  {
    status: "Completed",
    value: 0,
    // color: "#84cc16",
    color: "#2B0B3F",
  },
];

function TaskStatusPieChart({ tasks, isLoading }) {
  if (isLoading) return <p>Loading...</p>;

  const updatedData = startDataLight.map((item) => {
    if (tasks.length === 0) return startDataLight;

    const count = countTasksByStatus(tasks, item.status.toLowerCase()); // Access full data
    return { ...item, value: count }; // Spread operator for immutability
  });

  return (
    <>
      <h2 className="ml-4 mt-2 text-xl font-[600]">Task status summary</h2>
      {tasks.length === 0 ? (
        <div className="flex h-[80%] w-full items-center justify-center italic text-gray-400">
          <p>No summary available</p>
        </div>
      ) : (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={updatedData} dataKey="value" nameKey="status" cx="30%">
                {updatedData.map((entry) => (
                  <Cell
                    fill={entry.color}
                    stroke={entry.color}
                    key={entry.status}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                verticalAlign="middle"
                align="right"
                width="35%"
                layout="vertical"
                iconSize={15}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}

export default TaskStatusPieChart;
