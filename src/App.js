import logo from './logo.svg';
import './App.css';
import Auth from './Pages/Auth';
import { AuthContext } from './Store/AuthProvider';
import { useContext } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';


const router=createBrowserRouter([

  {
    path:"/auth",
    element:<Auth></Auth>

  }
]
  )

function App() {

  // const auth=useContext(AuthContext)

  // console.log("auth ",auth.isLoggedIn
  // )
  return (
   <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
