import React from 'react';
import { useState } from 'react'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { PieChart , Pie , Cell, Tooltip,Legend} from 'recharts';
import TodoPie from './TodoPie';
import TodoCalendar from './TodoCalendar';

const Todo2 = () => {
    const [showModal ,setShowModal] = useState(false);
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [Addnewtasks ,setAddnewtasks] = useState({
        title:"",
        description:"",
        date:"",
        priority:"low",
        category:"",
        status:"Active",
    });
    const [Simpletasks ,setSimpletasks] = useState(
        [
            {
                title: "Complete project proposal",
                description:"Finalize the project proposal document and send it to the client for review.",
                date: "2025-03-22",
                priority: "High",
                category: "Work",
                status: "Active", // 'Active' or 'Completed'
              },
              {
                title: "Go grocery shopping",
                description: "Buy fruits, vegetables, and other essentials for the week.",
                date: "2025-03-22",
                priority: "Medium",
                category: "Shopping",
                status: "Active",
              },
              {
                title: "Morning jog",
                description: "Run for 30 minutes in the park.",
                date: "2025-03-22",
                priority: "Low",
                category: "Health",
                status: "Active",
              },
              {
                title: "Morning jog",
                description: "Run for 30 minutes in the park.",
                date: "2025-03-22",
                priority: "Medium",
                category: "Health",
                status: "Active",
              },
        ]
    )
    const TaskskoAdd =()=>{
        if(!Addnewtasks.title.trim()|| !Addnewtasks.category.trim()) return;
        setAddnewtasks([...Simpletasks , Addnewtasks]);
        setAddnewtasks({
            title:"",
            description:"",
            date:"",
            priority:"low",
            category:"",
            status:"Active",
        });
        setShowModal(false);
    }
      const toggleStatus = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].status =
          updatedTasks[index].status === "Active" ? "Completed" : "Active";
        setTasks(updatedTasks);
      };
  return (
    <div className='flex h-screen bg-gray-100'>
        <aside className='w-64 bg-white flex flex-col'>
            <div className='p-4'>
                <h1 className='text-2xl font-bold'>Tasks Manager</h1>
                <span className='text-sm text-gray-600'>Todo User</span>
            </div>
            {/* views */}
            <div className='p-4'>
                <h2 className='text-xl text-gray-800 uppercase mb-2'>Views</h2>
                <ul className='space-y-2'>
                    <li className='flex items-center cursor-pointer '>All Tasks</li>
                    <li className='flex items-center cursor-pointer '>Complete</li>
                    <li className='flex items-center cursor-pointer '>Active</li>
                </ul>
            </div>
            {/* catagroy */}
            <div className='p-4'>
                <h2 className='text-xl text-gray-800 uppercase mb-2'>Catagories</h2>
                <ul className='space-y-2'>
                    <li className='flex items-center cursor-pointer '>Work</li>
                    <li className='flex items-center cursor-pointer '>Personal</li>
                    <li className='flex items-center cursor-pointer '>Shopping</li>
                    <li className='flex items-center cursor-pointer '>Health</li>
                </ul>
            </div>
        </aside>

        {/* main */}
        <main className='flex-1 p-6 ml-16 overflow-auto'>
            {/* top bar  */}
            <div className='flex flex-col md:flex-row md:justify-between items-center mb-6 space-y-4 md:space-y-0'> 
                <h2 className='text-3xl font-bold'>All Tasks</h2>
                <div className='flex gap-2 items-start space-y-2 '>
                    {/* searchbar */}
                    <div className='relative'>
                        <input type=" text"placeholder='Search Tasks' className='pl-5 pr-4 py-2 border rounded focus:outline-none focus:ring-1'/>
                    </div>
                    {/* Add tasks btn  */}
                    <button className="bg-gray-200 text-black p-4 py-2 rounded cursor-pointer hover:bg-gray-300">List</button>
                    <button className="bg-gray-200 text-black p-4 py-2 rounded cursor-pointer hover:bg-gray-300">Calendar</button>
                    <button className="bg-gray-200 text-black p-4 py-2 rounded cursor-pointer hover:bg-gray-300">Stats</button>
                    <button onClick={()=>setShowModal(true)} className='inline-flex item-center cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow-2xl hover:bg-blue-600'>Add Tasks</button>
                </div>
            </div>
       
        {showModal &&(
            <div className='fixed inset-0 bg-gray-10 bg-white/80  flex items-center justify-center z-50'>
                <div className=' p-6 rounded-lg shadow-lg w-96 bg-white '>
                    <h3 className='text-lg font-semibold'>Add New Tasks</h3>
                    <input type="text" placeholder='Enter Your Tasks' className="w-full p-2 border rounded mb-2" />
                    <input type="text" placeholder='Enter tasks Description' className="w-full p-2 border rounded mb-2" />
                    <label> Date</label>
                    <input type="date" className="w-full p-2 border rounded mb-2"  />
                    <label htmlFor="" className="text-sm text-gray-600">Priority</label>
                    <select name="" id="" className="w-full p-2 border rounded mb-2">
                        <option value="low">low</option>
                        <option value="Medium">Medium</option>
                        <option value="High"> High </option>
                    </select>
                    <label htmlFor="" className="text-sm text-gray-600">Category</label>
                    <select name="" id="" className="w-full p-2 border rounded mb-2">
                        <option value="">Select Category</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Health">Health</option>
                    </select>
                    
                    <label htmlFor="" className="text-sm text-gray-600"> Status</label>
                    <select name="" id="" className="w-full p-2 border rounded mb-4">
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <div className='gap-2 flex '>
                    <button className="bg-gray-400 hover:bg-gray-500 cursor-pointer text-white px-4 py-2 rounded" onClick={()=>setShowModal(false)}>cencel</button>
                    <button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded"onClick={TaskskoAdd} >Add Tasks</button>
                    </div>
                </div>
            </div>
         )}
         {
          <div className='bg-white p-4 rounded shadow'>
            <h2 className='text-2xl font-bold mb-4'>Tasks List</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow'>
                {Simpletasks.map((task, index) => (
                    <div key={index} className={`bg-white p-4 rounded shadow ${task.status === "Completed" ? "opacity-50" : ""}`}>
                        <h3 className='text-xl font-semibold'>{task.title}</h3>
                        <p>{task.description}</p>
                        <p className='text-sm text-gray-500'>{task.date}</p>
                        <p className={`text-sm font-semibold ${task.priority === "High" ? "text-red-500" : task.priority === "Medium" ? "text-yellow-500" : "text-green-500"}`}>{task.priority}</p>
                        <p className='text-sm text-gray-500'>{task.category}</p>
                        <button onClick={() => toggleStatus(index)} className='flex items-center mt-2'>
                            {task.status === "Active" ? (
                                <FaCheckCircle className='text-green-500' />
                            ) : (
                                <FaRegCircle className='text-gray-500' />
                            )}
                            <span className='ml-2'>{task.status}</span>
                        </button>
                    </div>
                ))}
            </div>
          </div>
         }
         {
            <div className='bg-white p-4 rounded shadow mt-6'>
                <div>
                    <TodoPie/>
                </div>
            </div>
         }
         {
            <div>
                <div>
                    <TodoCalendar/>
                </div>
            </div>
         }
         </main>
    </div>
  )
}

export default Todo2