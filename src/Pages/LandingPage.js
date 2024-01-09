import { AuthContext } from '../Store/AuthProvider'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';


export default function LandingPage() {

    const navigate=useNavigate()
    console.log("landing page");




    const auth=useContext(AuthContext)


    function logoutUser(){

        auth.logout();
        navigate("/auth")
    }

  
    return (
      <div>
        <p>Landing page</p>

        <button onClick={logoutUser} >Logout</button>
      </div>
    );
  }
  