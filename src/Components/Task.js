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


  // console.log("Task ",info.id)
  function handleCompletion(status){

   
    // const updatedInfo = { ...info, completionStatus: status };
    info.completionStatus = status;
    setCompletionStatus(status);


    // for(let i=0.;i<tasks.length;i++){

    //   if(tasks[i].id==id) tasks[i].completionStatus=status;

    // }
    const updatedTasks = tasks.map((task) =>{
      if(task.id === id){
        task.completionStatus = status;
        return task;
      }else{
        return task;
      }
    } );

    console.log("allTasks ", updatedTasks);

    updateTask(auth.loggedInUser, tasks);

    // console.log("tasks ",updatedTasks)
  }

  return (
    <div className="mb-2 p-2 flex gap-4">
     
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
