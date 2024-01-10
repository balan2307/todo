import React from "react";
import { useState } from "react";
import Input from "./Input";

function TaskForm({handleSubmit,setFormStatus}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    


  return (
    <div
      className="flex flex-col border rounded-md border-[#e6e6e6]
p-1 gap-1"
    >
      <form onSubmit={(e) =>handleSubmit(e,{title,description,date})}>
        <Input
          type="text"
          setInput={setTitle}
          value={title}
          styles="border-none focus:outline-none w-[100%]"
          placeholder="Task name"
        ></Input>

        <Input
          type="text"
          setInput={setDescription}
          styles="border-none focus:outline-none w-[100%]"
          placeholder="description"
          value={description}
        ></Input>

        <Input
          type="date"
          setInput={setDate}
          value={date}
          styles="w-36 border-none "
        ></Input>

        <div className="flex w-[100%] justify-end gap-2">
          <button
            className="border w-16 bg-purple-50 rounded-md py-1 text-sm"
            onClick={() => setFormStatus((prev) => !prev)}
          >
            Cancel
          </button>
          <button
            className="border py-1 w-20 bg-[#dc4c3e] text-white text-sm
       rounded-md"
          >
            Add task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
