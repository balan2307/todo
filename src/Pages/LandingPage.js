import { AuthContext } from "../Store/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Input from "../Components/Input";
import { v4 as uuidv4 } from "uuid";
import Task from "../Components/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { addTodos, getAllTodos } from "../utils/initDb";
import TaskForm from "../Components/TaskForm";

const generateUniqueId = () => {
  return uuidv4();
};

function searchTasks(tasks, query) {
  query = query.toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title.toLowerCase().includes(query);
    const descriptionMatch = task.description.toLowerCase().includes(query);

    return titleMatch || descriptionMatch;
  });

  return filteredTasks;
}

export default function LandingPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [filterTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentDate, setCurrentDate] = useState("");

  const [showForm, setFormStatus] = useState(false);

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  async function fetchTodos() {
    const todos = await getAllTodos(auth.loggedInUser);
    setAllTodos(todos);
  }

  function getFilteredTasks(targetDate) {
    targetDate = new Date(targetDate);

    const tasks = allTodos.filter((task) => {
      const taskDate = new Date(task.date);
      return (
        taskDate.toISOString().split("T")[0] ===
        targetDate.toISOString().split("T")[0]
      );
    });

    return tasks;
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() == "") return;

    setFilteredTasks(searchTasks(allTodos, searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    let date = new Date();
    date = date.toISOString().split("T")[0];

    // console.log("date ", date, new Date(date));

    setCurrentDate(date);
  }, []);

  useEffect(() => {
    setFilteredTasks(getFilteredTasks(currentDate));
  }, [allTodos, currentDate]);

  function addTodo(e, task) {
    e.preventDefault();

    const newTask = {
      ...task,
      id: generateUniqueId(),
      completionStatus: false,
    };
    setAllTodos([...allTodos, newTask]);
    addTodos(auth.loggedInUser, newTask);

    auth.displayToast("success", "Task added sucessfully!");

    setTitle("");
    setDate("");
    setDescription("");

    // fetchTodos();
  }

  return (
    <div>
      <Navbar></Navbar>

      <div className="p-4 w-[80%] md:w-[60%] mx-auto">
        <p className="font-semibold text-2xl pl-2">Tasks</p>

        <div className="flex flex-col mt-4 ">
          <div className="flex  w-[100%]">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="pl-2 pt-2" />

            <Input
              type="text"
              setInput={setSearchQuery}
              value={searchQuery}
              styles="focus:outline-none w-[100%] border-none"
              placeholder={`Search by title ,description`}
            ></Input>
          </div>

          <div className="flex ml-2 mt-2">
            <p className="mt-[5px] w-[50%] sm:w-[40%] md:w-[20%] font-semibold">
              Search by date
            </p>
            <Input
              type="date"
              setInput={setCurrentDate}
              value={currentDate}
              styles="w-36 border-none "
            ></Input>
          </div>
        </div>
        <div className="mt-4">
          {filterTasks?.length != 0 ? (
            filterTasks?.map((task) => {
              return (
                <Task
                  info={task}
                  key={task.id}
                  tasks={allTodos}
                  updateTasks={setAllTodos}
                ></Task>
              );
            })
          ) : (
            <p className="pl-2 mb-2">No tasks available</p>
          )}
          {!showForm && (
            <div className="flex gap-2 pl-2">
              <FontAwesomeIcon
                icon={faPlus}
                className="pt-1 cursor-pointer"
              ></FontAwesomeIcon>

              <p
                className="text-gray-500 font-semibold hover:text-orange-500
          cursor-pointer"
                onClick={() => setFormStatus((prev) => !prev)}
              >
                Add task
              </p>
            </div>
          )}

          {showForm && (
            <TaskForm
              handleSubmit={addTodo}
              setFormStatus={setFormStatus}
            ></TaskForm>
          )}
        </div>
      </div>
    </div>
  );
}
