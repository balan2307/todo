import React from "react";

import { faCircle, faTrashCan ,faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import {
  faCircle as faCircleDark,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AuthContext } from "../Store/AuthProvider";
import { useContext } from "react";
import { updateTask } from "../utils/initDb";
import TaskForm from "./TaskForm";
import { getAllByAltText } from "@testing-library/react";

function Task({ info, tasks, updateTasks }) {
  const { title, description, date, id, completionStatus } = info;

  const [editFormStatus, setEditFormStatus] = useState(false);

  const auth = useContext(AuthContext);

  const [taskStatus, setCompletionStatus] = useState(
    completionStatus ? true : false
  );

  function handleCompletion(status) {
    info.completionStatus = status;

    setCompletionStatus(status);

    let updatedTasks = tasks.map((task) => {
      if (task.id == id) {
        task.completionStatus = status;
        return task;
      } else {
        return task;
      }
    });

    updateTask(auth.loggedInUser, updatedTasks);
  }

   function deleteTask(){

    tasks=tasks.filter((task)=>task.id!=id)
    updateTasks(tasks)
    updateTask(auth.loggedInUser, tasks);

    

   }

  function editTask(e, updatedTask) {
    e.preventDefault();

    let updatedTasks = tasks.map((task) => {
      if (task.id == id) {
        return updatedTask;
      } else {
        return task;
      }
    });

    updateTasks([...updatedTasks]);

    updateTask(auth.loggedInUser, updatedTasks);
  }

  return (
    <div className="mb-2 p-4 bg-[#e9e9e9] rounded-md ">
      {!editFormStatus && (
        <div className="flex gap-4">
          <div className="pt-1">
            {!taskStatus ? (
              <FontAwesomeIcon
                icon={faCircle}
                className="cursor-pointer"
                onClick={() => handleCompletion(true)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="cursor-pointer text-green-700"
                onClick={() => handleCompletion(false)}
              />
            )}
          </div>
          <div className="w-[100%] flex justify-between">
            <div>
              <p className={`text-md  ${taskStatus ? "line-through" : ""}`}>
                {title}
              </p>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            {/* <p className="text-sm">{date}</p> */}

            {!editFormStatus && (
              <div className="flex gap-4">
                <FontAwesomeIcon
                  icon={faPencil}
                  onClick={() => setEditFormStatus(true)}
                />

                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => deleteTask()}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {editFormStatus && (
        <TaskForm
          task={info}
          editFormStatus={editFormStatus}
          setFormStatus={setEditFormStatus}
          handleSubmit={editTask}
        ></TaskForm>
      )}

      {/* <hr className="w-[100%] mt-2"></hr> */}
    </div>
  );
}

export default Task;
