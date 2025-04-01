import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TodoPie = () => {
  const [filter, setFilter] = useState("category");

  const data = {
    category: [
      { name: "Work", value: 33, color: "#3b82f6" },
      { name: "Shopping", value: 33, color: "#f97316" },
      { name: "Health", value: 33, color: "#a855f7" },
    ],
    priority: [
      { name: "High", value: 40, color: "#ef4444" },
      { name: "Medium", value: 35, color: "#facc15" },
      { name: "Low", value: 25, color: "#22c55e" },
    ],
    status: [
      { name: "Completed", value: 60, color: "#10b981" },
      { name: "Pending", value: 40, color: "#f59e0b" },
    ],
  };

  return (
    
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Task Distribution</h3>
        <div className="flex gap-4 mb-4">
          <button onClick={() => setFilter("category")} className={`px-4 py-2 rounded cursor-pointer ${filter === "category" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            By Category
          </button>
          <button onClick={() => setFilter("priority")} className={`px-4 py-2 cursor-pointer rounded ${filter === "priority" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            By Priority
          </button>
          <button onClick={() => setFilter("status")} className={`px-4 py-2 cursor-pointer rounded ${filter === "status" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            By Status
          </button>
        </div>
        <div className="flex justify-center">
          <PieChart width={300} height={300}>
            <Pie
              data={data[filter]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data[filter].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
  );
};

export default TodoPie;
