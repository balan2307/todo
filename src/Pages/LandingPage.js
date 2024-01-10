import { AuthContext } from "../Store/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Input from "../Components/Input";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import Task from "../Components/Task";

import { addTodos, getAllTodos } from "../utils/initDb";

const generateUniqueId = () => {
  return uuidv4();
};

function searchTasks(tasks, query) {
  const lowercasedQuery = query.toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title.toLowerCase().includes(lowercasedQuery);
    const descriptionMatch = task.description.toLowerCase().includes(lowercasedQuery);

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
  const [searchQuery, setSearchQuery] = useState("")

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
    // console.log("fetch");
    fetchTodos();
  }, []);


  useEffect(() => {

    setFilteredTasks(searchTasks(allTodos, searchQuery))



  }, [searchQuery])

  useEffect(() => {
    let date = new Date();
    date = date.toISOString().split("T")[0];

    // console.log("date ", date, new Date(date));

    setCurrentDate(date);
  }, []);

  useEffect(() => {
    setFilteredTasks(getFilteredTasks(currentDate));
  }, [allTodos.length, currentDate]);

 

  

  function addTodo(e) {
    e.preventDefault();
    // console.log("todo ", title, description, date);
    // console.log("user ", Cookies.get("loggedInUser"));

    const newTask = { id: generateUniqueId(), title, description, date };
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

      <div className=" h-[100vh] p-4  w-[80%] mx-auto">
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
            <p
              className="text-gray-500 font-semibold hover:text-orange-500
          cursor-pointer"
              onClick={() => setFormStatus((prev) => !prev)}
            >
              Add task
            </p>
          )}

          {showForm && (
            <div
              className="flex flex-col border rounded-md border-gray-400
         p-1 gap-1"
            >
              <form onSubmit={(e) => addTodo(e)}>
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
                    className="border w-16 bg-purple-50 rounded-md"
                    onClick={() => setFormStatus((prev) => !prev)}
                  >
                    Cancel
                  </button>
                  <button
                    className="border w-20 bg-orange-400 text-white
                 rounded-md"
                  >
                    Add task
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

     
    </div>
  );
}
