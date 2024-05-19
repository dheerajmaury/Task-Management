import React from "react";
import "./Style.css";

const Action = ({ handleEditTask, handleDeleteTask, priority }) => {
  return (
    <div className="mt-2 space-x-2">
      <button className="btn btn-secondary" onClick={handleEditTask}>Edit</button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          if (window.confirm(`Are you sure you want to delete this ${priority} priority task?`)) {
            handleDeleteTask();
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Action;
