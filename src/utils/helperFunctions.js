import { v4 as uuidv4 } from "uuid";
import { updateTask } from "./initDb";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";


export const formatDate = (date) => {
  const year = date.split("-")[0];
  const day = date.split("-")[2];
  let month = date.split("-")[1];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  month = parseInt(month);

  month = months[month - 1];
  // console.log("month ",month)

  return `${day} ${month} ,${year}`;
  
};

export const searchTasks = (tasks, query, currentDate) => {
  query = query.toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title.toLowerCase().includes(query);
    const descriptionMatch = task.description.toLowerCase().includes(query);

    // const dateMatch = task.date == currentDate;

    return titleMatch || descriptionMatch;
  });

  // return sortTasks(filteredTasks)
  return filteredTasks;
};

export const getFilteredTasks = (allTodos, targetDate) => {
  targetDate = new Date(targetDate);

  const tasks = allTodos.filter((task) => {
    const taskDate = new Date(task.date);
    return (
      taskDate.toISOString().split("T")[0] ===
      targetDate.toISOString().split("T")[0]
    );
  });

  // console.log("sort ", sortTasks(tasks));

  // return sortTasks(tasks);
  return tasks;
};

export const generateUniqueId = () => {
  return uuidv4();
};

export const sortTasks = (tasks) => {
  let s = 0;
  let e = tasks.length - 1;

  while (s < e) {
    if (tasks[s].completionStatus) {
      [tasks[s], tasks[e]] = [tasks[e], tasks[s]];
      e--;
    } else s++;
  }

  return tasks;
};





