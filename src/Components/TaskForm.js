import React from "react";
import { useState } from "react";
import Input from "./Input";

function TaskForm({ handleSubmit, setFormStatus, task, editFormStatus }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [date, setDate] = useState(task ? task.date : "");

  return (
    <div
      className="p-2 flex flex-col border rounded-md border-[#e6e6e6]
 gap-1 bg-[#e9e9e9]"
    >
      <form
        onSubmit={(e) => {
          handleSubmit(e, { ...task, title, description, date });
          setFormStatus((prev) => !prev);
        }}
      >
        <Input
          type="text"
          setInput={setTitle}
          value={title}
          styles="border-none focus:outline-none w-[100%] bg-[#e9e9e9]"
          placeholder="Task name"
        ></Input>

        <Input
          type="text"
          setInput={setDescription}
          styles="border-none focus:outline-none w-[100%] bg-[#e9e9e9] text-[#a19494]"
          placeholder="description"
          value={description}
        ></Input>

        <Input
          type="date"
          setInput={setDate}
          value={date}
          styles="w-36 border-none bg-[#e9e9e9] "
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
            {editFormStatus ? "Edit task" : "Add task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
