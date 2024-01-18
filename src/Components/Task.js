import React from "react";

import {
  faCircle,
  faTrashCan,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCircle as faCircleDark,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AuthContext } from "../Store/AuthProvider";
import { useContext } from "react";
import { updateTask } from "../utils/initDb";
import { formatDate } from "../utils/helperFunctions";
import TaskForm from "./TaskForm";

function Task({ info, tasks, updateTasks }) {
  const { title, description, date, id, completionStatus } = info;

  const [editFormStatus, setEditFormStatus] = useState(false);

  const auth = useContext(AuthContext);

  const [taskStatus, setCompletionStatus] = useState(
    completionStatus ? true : false
  );

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

    auth.displayToast("success", "Task edited!");
  }

  function deleteTask() {
    tasks = tasks.filter((task) => task.id != id);
    updateTasks(tasks);
    updateTask(auth.loggedInUser, tasks);
    auth.displayToast("success", "Task deleted!");
  }

  function handleCompletion(status) {
    // info.completionStatus = status;

    setCompletionStatus(status);

    let updatedTasks = tasks.map((task) => {
      if (task.id == id) {
        task.completionStatus = status;
        return task;
      } else {
        return task;
      }
    });

    // updateTasks(updatedTasks);

    updateTask(auth.loggedInUser, updatedTasks);
  }

  return (
    <div
      className={`mb-2  ${
        editFormStatus ? "p-2" : "p-4"
      } bg-[#e9e9e9] rounded-md `}
    >
      {!editFormStatus && (
        <div className="flex gap-4">
          <div className="pt-1">
            {!taskStatus ? (
              <FontAwesomeIcon
                icon={faCircle}
                className="cursor-pointer"
                onClick={() =>
                  handleCompletion(true)
                }
              />
            ) : (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="cursor-pointer  text-green-700"
                onClick={() =>
                  handleCompletion(
                    false
                  )
                }
              />
            )}
          </div>
          <div className="w-[100%] flex justify-between">
            <div>
              <p className={`text-md  ${taskStatus ? "line-through" : ""}`}>
                {title}
              </p>
              <p
                className={`text-sm ${
                  taskStatus ? "line-through" : ""
                } text-gray-500`}
              >
                {description}
              </p>

              <p className="text-sm">{formatDate(date)}</p>
            </div>

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
