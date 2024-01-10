import React from "react";

import { faCircle } from "@fortawesome/free-regular-svg-icons";
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

function Task({ info, tasks }) {
  const { title, description, date, id, completionStatus } = info;
  const [editFormStatus,setEditFormStatus]=useState(false)

  const auth = useContext(AuthContext);

  const [taskStatus, setCompletionStatus] = useState(
    completionStatus ? true : false
  );

  console.log("Task ", info);
  function handleCompletion(status) {
    info.completionStatus = status;

    console.log("mark as complete ", info);
    setCompletionStatus(status);

    let updatedTasks = tasks.map((task) => {
      if (task.id == id) {
        console.log("macthed ", info);

        task.completionStatus = status;
        return task;
      } else {
        console.log("task");
        return task;
      }
    });

    console.log("allTasks ", updatedTasks);

    updateTask(auth.loggedInUser, updatedTasks);

    // console.log("tasks ",updatedTasks)
  }

  function showEditForm(){

  }

  return (
    <div className="mb-2 p-2 ">
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
             icon={faCircleDark}
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

        {!editFormStatus &&  <FontAwesomeIcon icon={faPencil} onClick={()=>setEditFormStatus(true)} />}
      
       </div>
     </div>

   )}

{editFormStatus && <TaskForm></TaskForm>}

      {/* <hr className="w-[100%] mt-2"></hr> */}
    </div>
  );
}

export default Task;
