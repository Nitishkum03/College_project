import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const TodoCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(22);
  const [currentMonth, setCurrentMonth] = useState(2);
  const [currentYear, setCurrentYear] = useState(2025);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const tasks = {
    "2025-03-22": [
      {
        id: 1,
        title: "Complete project proposal",
        description: "Finalize the project proposal document and send it to the client for review.",
        tags: ["Work", "High"],
        color: "green",
      },
      {
        id: 2,
        title: "Go grocery shopping",
        description: "Buy fruits, vegetables, and other essentials for the week.",
        tags: ["Shopping", "Medium"],
        color: "green",
      },
      {
        id: 3,
        title: "Morning jog",
        description: "Run for 30 minutes in the park.",
        tags: ["Exercise", "Low"],
        color: "blue",
      },
    ],
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };

  const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;

  return (
    <div className="p-6 bg-gray-100 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Calendar</h2>
      </div>
      <div className="flex gap-6">
        <div className="bg-white p-4 rounded-lg shadow w-1/3">
          <h3 className="text-lg font-semibold mb-3">Task Calendar</h3>
          <div className="flex justify-between items-center mb-2">
            <button onClick={handlePrevMonth}>
              <IoIosArrowBack size={20} />
            </button>
            <span className="font-semibold">{new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}</span>
            <button onClick={handleNextMonth}>
              <IoIosArrowForward size={20} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {[...Array(daysInMonth).keys()].map((day) => (
              <button key={day} className={`w-10 h-10 rounded-full ${selectedDate === day + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`} onClick={() => setSelectedDate(day + 1)}>
                {day + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow w-2/3">
          <h3 className="text-lg font-semibold mb-3">Tasks for {formattedDate}</h3>
          {tasks[formattedDate]?.length ? (
            tasks[formattedDate].map((task) => (
              <div key={task.id} className="p-3 mb-2 border rounded flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="flex gap-2 mt-1">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-200 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={`w-3 h-3 rounded-full bg-${task.color}-500`}></span>
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

export default TodoCalendar;
