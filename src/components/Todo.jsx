import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from './Sidebar';
import HeaderBar from './HeaderBar';
import TaskList from './TaskList';
import TaskCalendar from './TaskCalendar';
import TaskDistributionChart from './TaskDistributionChart';
import TaskModal from './TaskModal';

export default function TaskMaster() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("list"); // "list", "calendar", "chart"

  const now = new Date();

  const loggedInUser = localStorage.getItem("loggedInUser");
  useEffect(() => {
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setIsAuthenticated(false);
    } else {
      setUser(null);
      setIsAuthenticated(true);
    }
  }, [loggedInUser]);

  // Count overdue tasks
  const overdueCount = tasks.filter(
    (task) => new Date(task.date) < now && task.status !== "Completed"
  ).length;

  // Prepare task data grouped by category
  const categories = ["Work", "Personal", "Shopping", "Health"];
  const categoryData = categories.map((cat) => ({
    name: cat,
    value: tasks.filter((task) => task.category === cat).length,
  }));

  // Add overdue slice
  const pieData = [...categoryData, { name: "Overdue", value: overdueCount }];

  // Define colors (same order)
  const COLORS = ["#3b82f6", "#10b981", "#f97316", "#a855f7", "#ef4444"];

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    priority: "Low",
    category: "",
    status: "Active",
  });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTasknew = () => {
    if (!newTask.title.trim() || !newTask.category.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }
    const newTaskWithId = { ...newTask, id: tasks.length + 1 };
    setTasks([...tasks, newTaskWithId]);
    setNewTask({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      priority: "Low",
      category: "",
      status: "Active",
    });
    setShowModal(false);
    toast.success("Task added Successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    toast.success("Logged out successfully!");
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

  const deletetask = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    toast.success("Task deleted successfully!");
  };

  // Function to change the current view
  const changeView = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Sidebar 
        filter={filter}
        setFilter={setFilter}
        handleLogout={handleLogout}
      />

      <main className="flex-1 p-6 ml-16 overflow-auto">
        <HeaderBar
          filter={filter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowModal={setShowModal}
          currentView={currentView}
          changeView={changeView}
        />

        {currentView === "list" && (
          <TaskList
            filteredTasks={filteredTasks}
            toggleStatus={toggleStatus}
            deletetask={deletetask}
            getPriorityColor={getPriorityColor}
          />
        )}

        {currentView === "calendar" && (
          <TaskCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            tasks={tasks}
            setShowModal={setShowModal}
            setNewTask={setNewTask}
          />
        )}

        {currentView === "chart" && (
          <TaskDistributionChart
            pieData={pieData}
            COLORS={COLORS}
          />
        )}

        <TaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          newTask={newTask}
          setNewTask={setNewTask}
          addTasknew={addTasknew}
        />
      </main>
    </div>
  );
}
