import { AuthContext } from '../Store/AuthProvider'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Input from '../Components/Input';
import Cookies from 'js-cookie';

import { addTodos, getAllTodos } from '../utils/initDb';

export default function LandingPage() {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [allTodos,setAllTodos]=useState("")

  const navigate = useNavigate()



  async function fetchTodos() {

    const todos = await getAllTodos(Cookies.get("loggedInUser"));
    setAllTodos(todos)

    console.log("all todos", todos)


  }

  useEffect(() => {

    fetchTodos()

  }, [])





  const auth = useContext(AuthContext)


  function logoutUser() {

    auth.logout();
    navigate("/auth")
  }


  function addTodo(e) {

    e.preventDefault();
    console.log("todo ", title, description, date)
    console.log("user ", Cookies.get("loggedInUser"))

    addTodos(Cookies.get("loggedInUser"), { title, description, date })
    fetchTodos()


  }




  return (
    <div >

      <Navbar></Navbar>




      <div className=' h-[100vh] p-4 '>

        <form className='flex border flex-col gap-4 p-10 w-[30%]'
          onSubmit={(e) => addTodo(e)}>

          <Input type="text" label="title" setInput={setTitle} value={title}></Input>

          <Input type="textarea" label="description" setInput={setDescription} value={description}></Input>

          <Input type="date" label="date" setInput={setDate} value={date}></Input>

          <button >Add todo</button>
        </form>
      </div>

      {/* <button onClick={logoutUser} >Logout</button> */}
    </div>
  );
}
