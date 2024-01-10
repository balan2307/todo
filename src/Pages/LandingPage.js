import { AuthContext } from "../Store/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Input from "../Components/Input";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import Task from "../Components/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addTodos, getAllTodos } from "../utils/initDb";
import TaskForm from "../Components/TaskForm";

const generateUniqueId = () => {
  return uuidv4();
};

function searchTasks(tasks, query) {
  const lowercasedQuery = query.toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title.toLowerCase().includes(lowercasedQuery);
    const descriptionMatch = task.description
      .toLowerCase()
      .includes(lowercasedQuery);

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
    console.log("fetch");
    fetchTodos();
  }, []);

  useEffect(() => {
    setFilteredTasks(searchTasks(allTodos, searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    let date = new Date();
    date = date.toISOString().split("T")[0];

    console.log("date ", date, new Date(date));

    setCurrentDate(date);
  }, []);

  useEffect(() => {
    setFilteredTasks(getFilteredTasks(currentDate));
  }, [allTodos.length, currentDate]);

  function addTodo(e,task) {
    e.preventDefault();
    // console.log("todo ", title, description, date);
    // console.log("user ", Cookies.get("loggedInUser"));

    const newTask = { ...task,id: generateUniqueId()};
    setAllTodos([...allTodos, newTask]);
    addTodos(auth.loggedInUser, newTask);

    setTitle("");
    setDate("");
    setDescription("");
    // fetchTodos();
  }

  return (
    <div>
      <Navbar></Navbar>

      <div className="p-4 w-[80%] md:w-[60%] mx-auto">
        <p className="font-semibold text-2xl">Today</p>

        <div className="flex flex-col mt-4">
          <div>
            <Input
              type="text"
              setInput={setSearchQuery}
              value={searchQuery}
              styles="border-none focus:outline-none w-[100%]"
              placeholder="Search by title , description"
            ></Input>
          </div>

          <div className="flex ml-2">
            <p className="mt-[5px] font-semibold"> Search by date</p>
            <Input
              type="date"
              setInput={setCurrentDate}
              value={currentDate}
              styles="w-36 border-none w-[100%]"
            ></Input>
          </div>
        </div>
        <div className="mt-4">
          {filterTasks?.map((task) => {
            return <Task info={task} key={task.id} tasks={allTodos}></Task>;
          })}
          {!showForm && (
            <div className="flex gap-2">
              <FontAwesomeIcon icon={faPlus} className="pt-1 cursor-pointer"></FontAwesomeIcon>

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
      
      <TaskForm handleSubmit={addTodo}></TaskForm>
          )}
        </div>
      </div>
    </div>
  );
}
