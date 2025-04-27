import React from 'react';
import { FiPlus } from "react-icons/fi";

const TaskCalendar = ({ selectedDate, setSelectedDate, tasks, setShowModal, setNewTask }) => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Function to handle date click and open modal with pre-filled date
  const handleDateClick = (dateString) => {
    setSelectedDate(dateString);
    // Pre-fill the new task with the selected date
    setNewTask(prevTask => ({
      ...prevTask,
      date: dateString
    }));
    // Open the modal
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg justify-center items-center gap-10">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mt-4">Task Calendar</h3>
        <button className="cursor-pointer" onClick={() => setShowModal(true)}>
          <FiPlus />
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">
            {new Date().toLocaleString("default", { month: "long" })}{" "}
            {new Date().getFullYear()}
          </span>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {[...Array(daysInMonth).keys()].map((day) => {
            const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
              day + 1
            ).padStart(2, "0")}`;
            
            // Check if there are tasks for this date
            const hasTasks = tasks.some(task => task.date === dateString);
            
            return (
              <button
                key={day}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedDate === dateString
                    ? "bg-blue-500 text-white"
                    : hasTasks 
                      ? "bg-blue-100 hover:bg-blue-200" 
                      : "hover:bg-gray-200"
                }`}
                onClick={() => handleDateClick(dateString)}
                title={hasTasks ? "View tasks for this date" : "Add task for this date"}
              >
                {day + 1}
                {hasTasks && (
                  <span className="absolute bottom-0 w-1 h-1 bg-blue-500 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-lg font-semibold">
          Tasks for {new Date(selectedDate).toLocaleDateString()}
        </h3>
        <button
          onClick={() => setSelectedDate(null)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Clear
        </button>
      </div>
      <div>
        <div className="bg-white p-4 rounded-lg shadow mt-4">
          {tasks.filter((task) => task.date === selectedDate).length ? (
            tasks
              .filter((task) => task.date === selectedDate)
              .map((task) => (
                <div
                  key={task.id}
                  className="p-3 mb-2 shadow-xl rounded flex justify-between items-start"
                >
                  <div>
                    <h4 className="font-semibold">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex gap-2 mt-1">
                      {task.category && (
                        <span className="px-2 py-1 text-xs bg-gray-200 rounded">
                          {task.category}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(task.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      task.priority === "High"
                        ? "bg-red-600"
                        : task.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  ></span>
                </div>
              ))
          ) : (
            <p className="text-gray-500">No tasks for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar; 