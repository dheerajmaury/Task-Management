import React from "react";
import Action from "./Action";
import "./Style.css";

const Layout = ({ level, getTasksByPriority, filteredTasks, setSelectedTask, selectedTask, handleEditTask, handleChangePriority, handleDeleteTask, handleCompleteTask }) => {
  return (
    <div className="bg-red-100 p-4 rounded border border-red-400">
      <h2 className="text-lg font-primary font-semibold mb-2">{level} Priority</h2>
      {getTasksByPriority().filter((task) => {
        if (filteredTasks === 'completed') return task?.isCompleted;
        if (filteredTasks === 'pending') return !task?.isCompleted;
        return true;
      }).map((task, index) => (
        <div key={index} className="bg-white p-2 rounded mb-2">
          <p className="text-base cursor-pointer font-secondary w-100" onClick={() => setSelectedTask(task)} style={{ display: 'flex', justifyContent: "space-between" }}>
            <h5>{task.text}</h5>
            <p>{task.dueDate}</p>
          </p>
          <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <p>{task.description}</p>
            <div>
              <input
                type="checkbox"
                checked={task?.isCompleted}
                onChange={() => { handleCompleteTask(!task.isCompleted); setSelectedTask(task); }}
              /> Completed
            </div>
          </div>
          {selectedTask === task && (
            <Action
              priority={level}
              handleEditTask={() => handleEditTask(task)}
              handleChangePriority={handleChangePriority}
              handleDeleteTask={handleDeleteTask}
              selectedTask={selectedTask}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Layout;
