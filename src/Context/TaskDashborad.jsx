import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import "./Style.css";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState('');
  const [formInputs, setFormInputs] = useState({
    textInput: "",
    description: "",
    dueDate: "",
    selectedPriority: ""
  });
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleTaskSubmit = () => {
    const { textInput, description, dueDate, selectedPriority } = formInputs;
    if (!textInput.trim() || !selectedPriority) return;

    if (selectedTask) {
      const updatedTasks = tasks.map(task =>
        task === selectedTask
          ? { ...task, text: textInput, description, dueDate, priority: selectedPriority }
          : task
      );
      setTasks(updatedTasks);
    } else {
      const newTask = { text: textInput, dueDate, description, priority: selectedPriority, isCompleted: false };
      setTasks([...tasks, newTask]);
    }

    setFormInputs({ textInput: "", description: "", dueDate: "", selectedPriority: "" });
    setSelectedTask(null);
  };

  const handleEditTask = (task) => {
    setFormInputs({
      textInput: task.text,
      description: task.description,
      dueDate: task.dueDate,
      selectedPriority: task.priority
    });
    setSelectedTask(task);
  };

  const handleChangePriority = (newPriority) => {
    const updatedTasks = tasks.map(task =>
      task === selectedTask ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    setTasks(tasks.filter(task => task !== selectedTask));
    setSelectedTask(null);
  };

  const handleCompleteTask = (newStatus) => {
    const updatedTasks = tasks.map(task =>
      task === selectedTask ? { ...task, isCompleted: newStatus } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  return (
    <div className="p-8">
      <div className="grid gap-4 font-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {['textInput', 'dueDate'].map((field, idx) => (
            <div key={idx}>
              <label className="block text-gray-700">
                Enter {field === 'textInput' ? 'Task Subject' : 'Due Date'}
              </label>
              <input
                type={field === 'textInput' ? 'text' : 'date'}
                name={field}
                value={formInputs[field]}
                onChange={handleInputChange}
                className={`w-full border rounded p-2 input${idx + 1}`}
                placeholder={`Enter ${field === 'textInput' ? 'task' : 'Due Date'}`}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {['description', 'selectedPriority'].map((field, idx) => (
            <div key={idx}>
              <label className="block text-gray-700">
                Enter {field === 'description' ? 'Description' : 'Priority'}
              </label>
              {field === 'description' ? (
                <input
                  type="text"
                  name={field}
                  value={formInputs[field]}
                  onChange={handleInputChange}
                  className={`w-full border rounded p-2 input${idx + 3}`}
                  placeholder="Enter Description"
                />
              ) : (
                <select
                  name={field}
                  value={formInputs[field]}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 selectDropDown"
                >
                  <option value="" disabled>Select Priority</option>
                  {['High', 'Medium', 'Low'].map((priority) => (
                    <option key={priority} value={priority}>
                      {priority} Priority
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={handleTaskSubmit} className="btn btn-secondary btnAdd">
            {selectedTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        {['Completed', 'Pending', 'All'].map((filter, idx) => (
          <button
            key={idx}
            onClick={() => setFilteredTasks(filter.toLowerCase())}
            className={`btn btn-secondary btn${idx + 1}`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="mt-8 space-y-4 text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['High', 'Medium', 'Low'].map((level) => (
            <Layout
              key={level}
              getTasksByPriority={() => tasks.filter(task => task.priority === level)}
              setSelectedTask={setSelectedTask}
              selectedTask={selectedTask}
              handleEditTask={handleEditTask}
              handleChangePriority={handleChangePriority}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
              level={level}
              filteredTasks={filteredTasks}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
