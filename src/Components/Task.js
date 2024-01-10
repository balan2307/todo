import React from "react";

import { faCircle} from "@fortawesome/free-regular-svg-icons";
import { faCircle as faCircleDark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AuthContext } from "../Store/AuthProvider";
import { useContext } from "react";
import { updateTask } from "../utils/initDb";

function Task({ info ,tasks}) {
  const { title, description, date ,id ,completionStatus } = info;

  const auth=useContext(AuthContext)
 
  const [taskStatus, setCompletionStatus ] = useState(completionStatus ? true : false);


  console.log("Task ",info)
  function handleCompletion(status){

    info.completionStatus=status;

    console.log("mark as complete ",info)
    setCompletionStatus(status)
    




   

    let updatedTasks = tasks.map((task) => {

      if (task.id == id) {
        console.log("macthed ",info)
        return info;
        
      }
      else {
        console.log("task")
        return task
      }
    })


    console.log("allTasks ",updatedTasks)


    updateTask(auth.loggedInUser,updatedTasks)

    // console.log("tasks ",updatedTasks)
  }

  return (
    <div className="mb-2 p-2 flex gap-4">
      {console.log("status ",taskStatus)}
      <div className="pt-1">
        {!taskStatus ? (
          <FontAwesomeIcon
            icon={faCircle}
            className="cursor-pointer"
            onClick={()=>handleCompletion(true)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleDark}

            className="cursor-pointer text-green-700"
            onClick={()=>handleCompletion(false)}
           
          />
        )}
      </div>
      <div>
        <p className={`text-lg  ${taskStatus ? 'line-through' : ''}` }>{title}</p>
        <p className="text-md text-gray-500">{description}</p>
        {/* <p className="text-sm">{date}</p> */}
        <hr className="mt-2 w-[100%]"></hr>
      </div>
    </div>
  );
}

export default Task;
