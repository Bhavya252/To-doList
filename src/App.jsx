import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaCheck, FaMoon, FaSun } from "react-icons/fa";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} p-4`}>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
        </button>
        <h1 className={`text-3xl font-bold mb-4 text-center ${darkMode ? "text-gray-900" : "text-gray-900"}`}>To-Do List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 ${darkMode ? "bg-gray-200 text-gray-900" : "bg-gray-100 text-gray-900"}`}
            placeholder="Add a new task..."
          />
          <button
            onClick={addTask}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <FaPlus />
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between p-3 rounded-md bg-gray-200 dark:bg-gray-700"
            >
              <span
                className={`flex-1 text-lg font-medium ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"}`}
              >
                {task.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(index)}
                  className={`p-2 rounded-md ${task.completed ? "bg-gray-500 text-white" : "bg-green-500 text-white hover:bg-green-600"}`}
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

