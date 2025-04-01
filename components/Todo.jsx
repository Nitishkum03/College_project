import React, { useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiCalendar
} from "react-icons/fi";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import TodoCalendar from "./TodoCalendar";
import TodoPie from "./TodoPie";

export default function TaskMaster() {
  // Sample data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project proposal",
      description:"Finalize the project proposal document and send it to the client for review.",
      date: "2025-03-22",
      priority: "High",
      category: "Work",
      status: "Active",
    },
    {
      id: 2,
      title: "Go grocery shopping",
      description: "Buy fruits, vegetables, and other essentials for the week.",
      date: "2025-03-22",
      priority: "Medium",
      category: "Shopping",
      status: "Active",
    },
    {
      id: 3,
      title: "Morning jog",
      description: "Run for 30 minutes in the park.",
      date: "2025-03-22",
      priority: "Low",
      category: "Health",
      status: "Completed",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState("All");

  // New task input
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    priority: "Low",
    category: "",
    status: "Active",
  });


  const addTasknew = () => {
    if (!newTask.title.trim() || !newTask.category.trim()) return;
    setTasks([...tasks, newTask]);
    setNewTask({
      title: "",
      description: "",
      date: "",
      priority: "Low",
      category: "",
      status: "Active",
    });
    setShowModal(false);
  };


  const toggleStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status =
      updatedTasks[index].status === "Active" ? "Completed" : "Active";
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks

    .filter((task) => {
      if (filter === "All") return true;
      if (filter === "Active" || filter === "Completed") {
        return task.status === filter;
      }

      return task.category === filter;
    })

    .filter((task) => {
      const term = searchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
      );
    });
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500 border-red-300";
      case "Medium":
        return "text-yellow-500 border-yellow-300";
      case "Low":
      default:
        return "text-blue-500 border-blue-300";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
        <aside className="w-64 bg-white  flex flex-col">
          <div className="p-4 ">
            <h1 className="text-xl font-bold">Tasks </h1>
            <span className="text-sm text-gray-500">Todo User</span>
          </div>
          <div className="p-4 ">
            <h2 className="text-xs text-gray-500 uppercase mb-2">Views</h2>
            <ul className="space-y-1">
              <li onClick={() => setFilter("All")}className={`flex items-center cursor-pointer ${ filter === "All"? "text-blue-500 font-semibold": "text-gray-700" }`}>
                 All Tasks
              </li>
              <li onClick={() => setFilter("Active")}className={`flex items-center cursor-pointer ${filter === "Active"? "text-blue-500 font-semibold": "text-gray-700"}`}>
                 Active
              </li>
              <li onClick={() => setFilter("Completed")} className={`flex items-center cursor-pointer ${filter === "Completed"? "text-blue-500 font-semibold": "text-gray-700"}`}>
               Completed
              </li>
            </ul>
          </div>
          <div className="p-4">
            <h2 className="text-xs text-gray-500 uppercase mb-2">Categories</h2>
            <ul className="space-y-1">
              {["Work", "Personal", "Shopping", "Health"].map((cat) => (
                <li
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`cursor-pointer ${
                    filter === cat ? "text-blue-500 font-semibold" : "text-gray-700"
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      <main className="flex-1 p-6 ml-16 overflow-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-semibold">
            {filter === "All" ? "All Tasks" : `${filter} Tasks`}
          </h2>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
            <div className="relative">
              <FiSearch className="absolute top-3 left-3 text-gray-400" />
              <input type="text" placeholder="Search tasks..." className="pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            {/* Add Task button */}
            <button onClick={() => setShowModal(true)} className="inline-flex items-center cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            >
              <FiPlus className="mr-1" />
              Add Task
            </button>
          </div>
        </div>

        {/* Modal for Adding a Task */}
        {showModal && (
          <div className="fixed inset-0  bg-white/80 flex items-center justify-center z-50">
            <div className=" p-6 rounded-lg shadow-lg  bg-white  w-96">
              <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
              {/* Title */}
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              />
              <label className="text-sm text-gray-600">Date</label>
              <input type="date" value={newTask.date} onChange={(e) =>
                  setNewTask({ ...newTask, date: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              />
              {/* Priority */}
              <label className="text-sm text-gray-600">Priority</label>
              <select value={newTask.priority} onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {/* Category */}
              <label className="text-sm text-gray-600">Category</label>
              <select
                value={newTask.category}
                onChange={(e) =>
                  setNewTask({ ...newTask, category: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              >
                <option value="">Select Category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
              </select>
              {/* Status */}
              <label className="text-sm text-gray-600">Status</label>
              <select
                value={newTask.status}
                onChange={(e) =>
                  setNewTask({ ...newTask, status: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
              {/* Action buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button onClick={addTasknew} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task, index) => {
            const priorityColor = getPriorityColor(task.priority);
            return (
              <div
                key={index}
                className={`bg-white rounded shadow p-4 border-l-4 ${priorityColor.split(" ")[1]}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{task.title}</h3>
                  <span className={`text-xs font-semibold ${priorityColor.split(" ")[0]} border border-gray-200 px-2 py-0.5 rounded-full`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    {task.date
                      ? new Date(task.date).toLocaleDateString()
                      : "No date"}
                  </span>
                  <span>{task.category}</span>
                </div>
                <div className="flex items-center mt-3">
                  {task.status === "Completed" ? (
                    <FaCheckCircle
                      className="text-green-500 mr-2 cursor-pointer"
                      onClick={() => toggleStatus(index)}
                    />
                  ) : (
                    <FaRegCircle
                      className="text-gray-400 mr-2 cursor-pointer"
                      onClick={() => toggleStatus(index)}
                    />
                  )}
                  <span
                    className={`${task.status === "Completed"? "text-green-600": "text-gray-600"}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {
            tasks.length === 0 ? (
              <p className="text-gray-500 text-center mt-4">No tasks available.</p>
            ) : (
              <TodoCalendar tasks={tasks} />
            )
          }
          </div>
        <div>
          <TodoPie/>
        </div>
        
      </main>
    </div>
  );
}
