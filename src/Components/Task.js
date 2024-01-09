import React from "react";

import { faCircle} from "@fortawesome/free-regular-svg-icons";
import { faCircle as faCircleDark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Task({ info }) {
  const { title, description, date } = info;

  const [ completionStatus, setCompletionStatus ] = useState(false);


  return (
    <div className="mb-2 p-2 flex gap-4">
      <div className="pt-1">
        {!completionStatus ? (
          <FontAwesomeIcon
            icon={faCircle}
            className="cursor-pointer"
            onClick={()=>setCompletionStatus(true)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleDark}

            className="cursor-pointer text-green-700"
           
          />
        )}
      </div>
      <div>
        <p className="text-lg">{title}</p>
        <p className="text-md text-gray-500">{description}</p>
        {/* <p className="text-sm">{date}</p> */}
        <hr className="mt-2 w-[100%]"></hr>
      </div>
    </div>
  );
}

export default Task;
